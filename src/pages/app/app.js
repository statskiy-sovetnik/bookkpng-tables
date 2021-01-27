import React from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

/*___ Blocks________________*/
import Menu from '../../blocks/menu/menu'
import {JOURNAL_AREA_W as JournalArea,
        INCOMES_AREA_W as IncomesArea,
        EXPENSES_AREA_W as ExpensesArea,
} from '../../blocks/table-area/table-area'
import {getCookieValue, isEmptyObj} from "../../common";

/*___ Libs _________________*/
import parse from 'date-fns/parse';
import format from 'date-fns/format';

class App extends React.Component {
    constructor(props) {
        super(props);

        //Берешь имя пользователя из куки:

        const user_name = getCookieValue('user');
        const user_key = getCookieValue('key');
        this.props.changeUserName(user_name);
        this.props.changeUserKey(user_key);

        let raw_mat_data = {};
        let raw_mat_usage = [];
        let raw_mat_usage_for_journal = [];
        let journal_rows_data = {};

        this.updateRawMatDataFromDb('/src/php/get_raw_mat_data.php', user_key).then(
            rawMatData => {
                Object.assign(raw_mat_data, rawMatData);

                //Обновляем raw_mat_usage и raw_mat_usage_for_journal
                return this.updateRawMatUsageFromDb('/src/php/get_raw_mat_usage.php', user_key);
            }
        ).then(
            //Обновляем journal_rows _______________

            all_raw_mat_usage => {
                raw_mat_usage = all_raw_mat_usage.raw_mat_usage;
                raw_mat_usage_for_journal = all_raw_mat_usage.raw_mat_usage_for_journal;

                return this.updateJournalRowsFromDb('/src/php/get_journal_rows.php', user_key,
                    raw_mat_usage_for_journal, raw_mat_data);
            }
        ).then(
            //Обновляем incomes _______________

            journal_rows_upd => {
                Object.assign(journal_rows_data, journal_rows_upd);
                return this.updateIncomesRowsFromDb('/src/php/get_incomes_rows.php', user_key, raw_mat_usage,
                    raw_mat_data, journal_rows_data);
            }
        ).then(
            incomes_rows_upd => {
                // Обновляем данные о расходах _____________________

                return this.updateExpensesDataFromDb('/src/php/get_expenses_data.php', user_key);
            }
        ).then(
            expenses_data_from_db => {
                //всё
            }
        );
    }

    updateRawMatDataFromDb(source, user_key) {
        let fetch_body = new FormData();
        let raw_mat_data = {};

        fetch_body.set('key', user_key);

        return fetch(source, {
            method: 'POST',
            body: fetch_body,
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к серверу');
                    return;
                }
                if(response.status === 500) {
                    alert('Ошибка запроса mysql');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная серверная ошибка');
                    return;
                }

                //return response.text();
                return response.json();
            },
            error => {
                console.log('Fetch error: ', error);
                alert('Неизвестная ошибка');
            }
        ).then(
            body => {
                filterRawMatDataFromDb(body);
                raw_mat_data = body;

                this.props.loadRawMatData(raw_mat_data);
                return raw_mat_data;
            }
        );

        function filterRawMatDataFromDb(raw_mat_data) { //Изменяет некоторые строковые значения на числовые,
            for(let id in raw_mat_data) {
                raw_mat_data[id].price = +raw_mat_data[id].price;
            }
        }
    }

    updateJournalRowsFromDb(source, user_key, raw_mat_usage_for_journal, raw_mat_data) {
        let fetchBody = new FormData();
        fetchBody.append('key', user_key);

        return fetch(source, {
            method: 'POST',
            body: fetchBody,
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к серверу');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная серверная ошибка');
                    return;
                }

                return response.json();
                //return response.text();
            },
            error => {
                console.log('Fetch error: ', error);
                alert('Неизвестная ошибка при обработке запроса');
            }
        ).then(
            body => {
                console.log(body);
                const journal_rows_upd = getUpdatedJournalRows(body, raw_mat_usage_for_journal, raw_mat_data);
                this.props.loadDataBaseJournal(journal_rows_upd);

                return journal_rows_upd;
            }
        );

        function getUpdatedJournalRows(rows_data, raw_mat_usage_for_journal, raw_mat_data) {
            let rows_updated = {};

            if(isEmptyObj(raw_mat_data) || isEmptyObj(rows_data)) {
                return {};
            }

            for(let id in rows_data) {
                //Находим данные нужного сырья

                const raw_mat_id = rows_data[id].raw_mat_id;
                let cur_row_raw_mat_data = {};
                Object.assign(cur_row_raw_mat_data, raw_mat_data[raw_mat_id]);
                const raw_mat_price = cur_row_raw_mat_data.price;
                const row_total_amount = rows_data[id].amount;

                //Устанавливаем amount_data (имеем только amount)
                rows_data[id].amount_data = {
                    amount_total: +row_total_amount,
                    amount_used: [],
                }
                delete rows_data[id].amount;

                let cur_sum = rows_data[id].amount_data.amount_total * raw_mat_price;
                let cur_expenses_total = 0;
                let cur_raw_mat_used = [];
                let cur_raw_mat_used_total = 0;

                rows_data[id].expenses.forEach((expense, i) => {
                    expense.amount = +expense.amount;  //преобразуем в число (из бд приходит строка)
                    cur_expenses_total += expense.amount;
                });

                //Устанавливаем amount_used для текущей строки
                raw_mat_usage_for_journal.forEach((raw_mat_obj) => {
                    const cur_journal_id = +raw_mat_obj.journal_id;
                    if(cur_journal_id !== +id) {
                        return;
                    }

                    cur_raw_mat_used_total = raw_mat_obj.raw_mat_used_total;
                    cur_raw_mat_used = raw_mat_obj.raw_mat_used_by.slice()
                });

                const db_date_str = rows_data[id].date;
                const db_date = parse(db_date_str, 'yyyy-MM-dd', +new Date());
                const date_formated_str = format(db_date, 'dd/MM/yyyy');

                rows_updated[id] = {
                    ...rows_data[id],
                    sum: cur_sum,
                    date: date_formated_str,
                    name: cur_row_raw_mat_data.name,
                    provider_name: cur_row_raw_mat_data.provider_name,
                    price: raw_mat_price,
                    total: cur_sum + cur_expenses_total,
                    cost_price: (cur_sum + cur_expenses_total) / rows_data[id].amount_data.amount_total,
                    amount_data: {
                        amount_total: rows_data[id].amount_data.amount_total,
                        amount_used_total: cur_raw_mat_used_total,
                        amount_used: cur_raw_mat_used,
                    }
                }
            }
            return rows_updated;
        }
    }

    updateIncomesRowsFromDb(source, user_key, raw_mat_usage, raw_mat_data, journal_rows) {
        let fetchBody = new FormData();
        fetchBody.append('key', user_key);

        return fetch(source, {
            method: 'POST',
            body: fetchBody,
        }).then(
            response => {
                if(response.status === 520) {
                    alert('Ошибка при подключении к серверу');
                    return;
                }
                if(response.status !== 200) {
                    alert('Неизвестная серверная ошибка');
                    console.log('not 200 response status in upd incomes rows');
                    return;
                }

                return response.json();
            },
            error => {
                console.log('Fetch error: ', error);
                alert('Неизвестная ошибка при обработке запроса');
            }
        ).then(
            body => {
                const incomes_rows_upd = getUpdatedIncomesRows(body, journal_rows, raw_mat_usage, raw_mat_data);
                this.props.loadDataBaseIncomes(incomes_rows_upd);
                return incomes_rows_upd;
            }
        );

        function getUpdatedIncomesRows(rows_data, journal_rows_data, raw_mat_usage) {
            let rows_updated = {};

            for(let id in rows_data) {
                const cur_amount = rows_data[id].amount || 0;
                let cur_sum = cur_amount * rows_data[id].price || 0;
                let cur_expenses_total = 0;
                let cur_amount_of_raw = 0;
                let cur_sum_of_raw = 0;

                //Считаем прочие расходы (всего)
                if(rows_data[id].expenses) {
                    rows_data[id].expenses.forEach((expense, i) => {
                        expense.amount = +expense.amount;
                        cur_expenses_total += expense.amount;
                    });
                }

                //Задать amount_of_raw, sum_of_raw
                raw_mat_usage.forEach((raw_mat_obj) => {
                    if(raw_mat_obj.incomes_id != id) {
                        return;
                    }

                    cur_amount_of_raw = raw_mat_obj.raw_mat_used_total || 0;

                    //Считаем, сколько всего потрачено на сырьё (sum_of_raw)
                    raw_mat_obj.raw_mat_used.forEach((value_obj) => {
                        //Находим id сырья, имея id ряда в Журнале
                        const cur_raw_mat_id = journal_rows_data[value_obj.journal_id].raw_mat_id;
                        //const cur_raw_mat_price = raw_mat_data[cur_raw_mat_id].price;
                        const journal_row_cost_price = +journal_rows_data[value_obj.journal_id].cost_price;

                        cur_sum_of_raw += journal_row_cost_price * +value_obj.used;
                    });
                });

                const blockage_perc = (cur_amount_of_raw - cur_amount) / cur_amount_of_raw * 100;
                const date_db_str = rows_data[id].date || "";
                const date_db = parse(date_db_str, 'yyyy-MM-dd', new Date());
                const formated_date_str = format(date_db, 'dd/MM/yyyy');

                rows_updated[id] = {
                    ...rows_data[id],
                    sum: cur_sum,
                    date: formated_date_str,
                    amount_of_raw: cur_amount_of_raw,
                    sum_of_raw: cur_sum_of_raw,
                    cost_price: (cur_expenses_total + cur_sum_of_raw) / cur_amount,
                    blockage_perc: blockage_perc,
                    expenses_total: cur_sum_of_raw + cur_expenses_total,
                    revenue: cur_sum - cur_expenses_total - cur_sum_of_raw,
                    profitability: (cur_sum - cur_expenses_total - cur_sum_of_raw) / cur_sum * 100,
                }
            }

            return rows_updated;
        }
    }

    updateRawMatUsageFromDb(source, user_key) {
        let fetchBody = new FormData();
        fetchBody.append('key', user_key);

        return fetch(source, {
            method: 'POST',
            body: fetchBody,
        }).then(
            response => {
                if(response.status === 500) {
                    alert('Ошибка mysql-запроса');
                    return;
                }
                if(response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if(response.status !== 200) {
                    console.log('In update raw mat usage');
                    alert('Неизвестная ошибка при обработке запроса');
                    return response.text();
                }

                return response.json();
            },
            error => {
                console.log("Fetch error: ", error);
                alert('Неизвестная ошибка при обработке запроса');
            }
        ).then(
            body => {
                body = isEmptyObj(body) ? [] : body;

                const raw_mat_usage_upd = getUpdatedRawMatUsage(body);
                const raw_mat_usage_for_journal = reformRawMatUsageForJournal(raw_mat_usage_upd);
                this.props.loadRawMatUsage(raw_mat_usage_upd);
                this.props.loadRawMatUsageForJournal(raw_mat_usage_for_journal);

                return {
                    raw_mat_usage: raw_mat_usage_upd,
                    raw_mat_usage_for_journal: raw_mat_usage_for_journal,
                };
            }
        );

        function getUpdatedRawMatUsage(raw_mat_usage) {
            //здесь просто считает общее кол-во сырья и добавляет в каждый объект массива
            let raw_mat_usage_upd = raw_mat_usage.slice();

            if(isEmptyObj(raw_mat_usage)) {
                return [];
            }

            raw_mat_usage_upd.forEach((raw_mat_usage_obj) => {
                let cur_used_total = 0;

                raw_mat_usage_obj.raw_mat_used.forEach((raw_obj) => {
                    raw_obj.used = +raw_obj.used;
                    cur_used_total += raw_obj.used;
                });

                raw_mat_usage_obj.raw_mat_used_total = cur_used_total;
            });

            return raw_mat_usage_upd;
        }

        function reformRawMatUsageForJournal(raw_mat_usage) {
            let raw_mat_usage_reformed = [];
            let journal_ids_used = [];

            if(isEmptyObj(raw_mat_usage)) {
                return [];
            }

            raw_mat_usage.forEach((incomes_obj) => {
                const incomes_id = incomes_obj.incomes_id;
                const raw_mat_used = incomes_obj.raw_mat_used;

                raw_mat_used.forEach((raw_mat_obj) => {
                    if(journal_ids_used.indexOf(raw_mat_obj.journal_id) === -1) {
                        journal_ids_used.push(raw_mat_obj.journal_id);
                        raw_mat_usage_reformed.push({
                            journal_id: raw_mat_obj.journal_id,
                            raw_mat_used_total: 0,
                            raw_mat_used_by: [],
                        })
                    }
                    journal_ids_used.push(raw_mat_obj.journal_id);

                    //Добавим используемое сырьё

                    raw_mat_usage_reformed.forEach((obj) => {
                        if(obj.journal_id === raw_mat_obj.journal_id) {

                            obj.raw_mat_used_by.push({
                                incomes_id: incomes_id,
                                used: raw_mat_obj.used,
                            });

                            obj.raw_mat_used_total += raw_mat_obj.used;
                        }
                    });
                });
            });

            return raw_mat_usage_reformed;
        }
    }

    updateExpensesDataFromDb(source, user_key) {
        let fetchBody = new FormData();
        fetchBody.append('key', user_key);

        return fetch(source, {
            method: 'POST',
            body: fetchBody,
        }).then(
            response => {
                if (response.status === 500) {
                    alert('Ошибка mysql-запроса');
                    return;
                }
                if (response.status === 520) {
                    alert('Ошибка при подключении к базе данных');
                    return;
                }
                if (response.status !== 200) {
                    console.log('In update expenses data');
                    alert('Неизвестная ошибка при обработке запроса');
                    return response.text();
                }

                return response.json();
            },
            error => {
                console.log('Fetch error in upd expenses data: ', error);
                alert('Неизвестная серверная ошибка');
            }
        ).then(
            body => {
                this.props.loadExpensesData(body);
                return body;
            }
        );
    }

    render() {
        const journal_sort_names = ['Наименованию', 'Дате', 'Поставщику', 'Кол-ву', 'Цене', 'Сумме', 'Расходам'];
        const incomes_sort_names = ['Наименованию', 'Дате', 'Покупателю', 'Кол-ву', 'Цене', 'Сумме', 'Расходам всего'];

        return(
            <div>
                <Menu/>
                <JournalArea data={'journal'}
                             sort_names={journal_sort_names}
                             updateRawMatDataFromDb = {this.updateRawMatDataFromDb.bind(this)}
                             updateRawMatUsageFromDb = {this.updateRawMatUsageFromDb.bind(this)}
                             updateJournalRowsFromDb = {this.updateJournalRowsFromDb.bind(this)}
                             updateIncomesRowsFromDb = {this.updateIncomesRowsFromDb.bind(this)}
                />
                <IncomesArea data={'incomes'}
                             sort_names={incomes_sort_names}
                             updateJournalRowsFromDb = {this.updateJournalRowsFromDb.bind(this)}
                             updateRawMatUsageFromDb = {this.updateRawMatUsageFromDb.bind(this)}
                             updateIncomesRowsFromDb = {this.updateIncomesRowsFromDb.bind(this)}
                />
                <ExpensesArea
                    updateExpensesDataFromDb = {this.updateExpensesDataFromDb.bind(this)}
                    updateJournalRowsFromDb = {this.updateJournalRowsFromDb.bind(this)}
                    updateIncomesRowsFromDb = {this.updateIncomesRowsFromDb.bind(this)}
                    data={'expenses'}
                />
            </div>
        )
    }
}

const APP_W = connect(mapStateToProps('App'), mapDispatchToProps('App'))(App);
export default APP_W;