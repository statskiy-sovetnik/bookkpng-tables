import React from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

/*___ Blocks________________*/
import Menu from '../../blocks/menu/menu'
import {JOURNAL_AREA_W as JournalArea,
        INCOMES_AREA_W as IncomesArea,
} from '../../blocks/table-area/table-area'
import {getCookieValue} from "../../common";

/*___ Libs _________________*/


class App extends React.Component {
    constructor(props) {
        super(props);

        //Берешь имя пользователя из куки:

        const user_name = getCookieValue('user');
        const user_key = getCookieValue('key');
        this.props.changeUserName(user_name);
        this.props.changeUserKey(user_key);

        //Берёшь из базы данных raw_mat_usage

        let raw_mat_usage = [
            {
                incomes_id: 0,
                raw_mat_used: [
                    {
                        journal_id: 0,
                        used: 74.00,
                    },
                    {
                        journal_id: 1,
                        used: 34.50,
                    }
                ],
            },
            {
                incomes_id: 1,
                raw_mat_used: [
                    {
                        journal_id: 1,
                        used: 88.00,
                    }
                ],
            },
            {
                incomes_id: 2,
                raw_mat_used: [
                    {
                        journal_id: 0,
                        used: 22.00,
                    },
                    {
                        journal_id: 1,
                        used: 37.00,
                    },
                    {
                        journal_id: 2,
                        used: 114.30,
                    }
                ],
            }
        ];
        raw_mat_usage = this.getUpdatedRawMatUsage(raw_mat_usage);
        const raw_mat_usage_for_journal = this.reformRawMatUsageForJournal(raw_mat_usage);

        //Здесь собираешь данные о сырье

        const raw_mat_data = {
            0: {
                name: 'Название сырья среднее',
                provider_name: '"ООО" Мясо России',
                price: 38.5,
            },
            1: {
                name: 'Так я назвал сырьё',
                provider_name: '"ОАО" Китай Голимый',
                price: 184.5
            },
            2: {
                name: 'Другое сырьё',
                provider_name: 'Библиотеки Пермского края',
                price: 67.5,
            }
        }

        //Здесь инициализируешь journal.rows:

        const journal_rows_data = {
            0: {
                date: '27/04/2020',
                raw_mat_id: 0,
                amount_data: {
                    amount_total: 180.00,
                    amount_used: [],
                },
                expenses: [
                    {
                        id: 0,
                        amount: 1680.50
                    },
                    {
                        id: 1,
                        amount: 440.33
                    },
                    {
                        id: 2,
                        amount: 480.00
                    },
                    {
                        id: 3,
                        amount: 5402.00
                    },
                    {
                        id: 4,
                        amount: 111.18
                    },
                    {
                        id: 5,
                        amount: 560.00
                    },
                    {
                        id: 6,
                        amount: 1340.00
                    },
                    {
                        id: 7,
                        amount: 1145.00
                    }
                ]
            },
            1: {
                date: '27/03/2020',
                raw_mat_id: 2,
                amount_data: {
                    amount_total: 54.00,
                    amount_used: [],
                },
                expenses: [
                    {
                        id: 0,
                        amount: 1680.50
                    },
                    {
                        id: 2,
                        amount: 480.00
                    },
                    {
                        id: 4,
                        amount: 111.18
                    },
                    {
                        id: 5,
                        amount: 560.00
                    },
                ]
            },
            2: {
                date: '24/04/2020',
                raw_mat_id: 1,
                amount_data: {
                    amount_total: 245.00,
                    amount_used: [],
                },
                expenses: [
                    {
                        id: 0,
                        amount: 1680.50
                    },
                    {
                        id: 1,
                        amount: 440.33
                    },
                    {
                        id: 2,
                        amount: 480.00
                    },
                    {
                        id: 3,
                        amount: 5402.00
                    },
                    {
                        id: 4,
                        amount: 111.18
                    },
                    {
                        id: 5,
                        amount: 560.00
                    },
                    {
                        id: 6,
                        amount: 1340.00
                    },
                    {
                        id: 7,
                        amount: 1145.00
                    }
                ]
            },
        }
        const journal_rows_updated = this.getUpdatedJournalRows(journal_rows_data, raw_mat_usage_for_journal, raw_mat_data);

        //Инициализируешь incomes.rows

        const incomes_rows_data = {
            0: {
                date: '18/03/2019',
                name: 'Бампер дроблёный',
                customer_name: 'ИП Бурунов Олег',
                amount: 125.70,
                price: 664.50,
                expenses: [
                    {
                        id: 7,
                        amount: 1145.00
                    }
                ],
            },
            1: {
                date: '19/03/2019',
                name: 'Недодроблёнка',
                customer_name: 'Газпром Нефтьть',
                amount: 865.70,
                amount_of_raw: 1350.00,
                price: 83.50,
                expenses: [
                    {
                        id: 7,
                        amount: 1145.00
                    }
                ],
                sum_of_raw: 43050.00,
            },
            2: {
                date: '18/03/2019',
                name: 'Стекло-угле-платик-резина волокно',
                customer_name: 'Самсунг Ентерпрайзез',
                amount: 458.70,
                amount_of_raw: 677.00,
                price: 84.50,
                expenses: [
                    {
                        id: 7,
                        amount: 1145.00
                    }
                ],
                sum_of_raw: 43050.00,
            },
        };
        const incomes_rows_updated = this.getUpdatedIncomesRows(incomes_rows_data, journal_rows_updated, raw_mat_usage,
            raw_mat_data);

        //Здесь собираешь данные о расходах

        const expenses_data = {
            0: {
                color: '#e06c5d',
                name: 'Транспорт',
            },
            1: {
                color: '#826de0',
                name: 'Ритуальные услуги',
            },
            2: {
                color: '#69ade0',
                name: 'Электроэнергия и подписка Netflix',
            },
            3: {
                color: '#43e093',
                name: 'Пиццы с ананасом',
            },
            4: {
                color: '#e09c4b',
                name: 'Лазертаг с персоналом'
            },
            5: {
                color: '#d7e049',
                name: 'Прочие расходы',
            },
            6: {
                color: '#e060b4',
                name: 'Персонал',
            },
            7: {
                color: '#90e049',
                name: 'Mercedes AMG GT S 4-door Coupe',
            },
        }

        //Загрузка:
        this.props.loadDataBaseJournal(journal_rows_updated);
        this.props.loadDataBaseIncomes(incomes_rows_updated);
        this.props.loadExpensesData(expenses_data);
        this.props.loadRawMatUsage(raw_mat_usage);
        this.props.loadRawMatUsageForJournal(raw_mat_usage_for_journal);
        this.props.loadRawMatData(raw_mat_data);
    }

    componentDidMount() {
    }

    getUpdatedJournalRows(rows_data, raw_mat_usage_for_journal, raw_mat_data) {
        let rows_updated = {};

        for(let id in rows_data) {
            //Находим данные нужного сырья

            const raw_mat_id = rows_data[id].raw_mat_id;
            let cur_row_raw_mat_data = {};
            Object.assign(cur_row_raw_mat_data, raw_mat_data[raw_mat_id]);
            const raw_mat_price = cur_row_raw_mat_data.price;

            let cur_sum = rows_data[id].amount_data.amount_total * raw_mat_price;
            let cur_expenses_total = 0;
            let cur_raw_mat_used = [];
            let cur_raw_mat_used_total = 0;

            rows_data[id].expenses.forEach((expense, i) => {
                cur_expenses_total += expense.amount;
            });

            //Устанавливаем amount_used для текущей строки
            raw_mat_usage_for_journal.forEach((raw_mat_obj) => {
                const cur_journal_id = raw_mat_obj.journal_id;
                if(cur_journal_id !== +id) {
                    return;
                }

                cur_raw_mat_used_total = raw_mat_obj.raw_mat_used_total;
                cur_raw_mat_used = raw_mat_obj.raw_mat_used_by.slice()
            });

            rows_updated[id] = {
                ...rows_data[id],
                sum: cur_sum,
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

    getUpdatedIncomesRows(rows_data, journal_rows_data, raw_mat_usage, raw_mat_data) {
        let rows_updated = {};

        for(let id in rows_data) {
            const cur_amount = rows_data[id].amount;
            let cur_sum = cur_amount * rows_data[id].price;
            let cur_expenses_total = 0;
            let cur_amount_of_raw = 0;
            let cur_sum_of_raw = 0;

            //Считаем прочие расходы (всего)
            rows_data[id].expenses.forEach((expense, i) => {
                cur_expenses_total += expense.amount;
            });

            //Задать amount_of_raw, sum_of_raw
            raw_mat_usage.forEach((raw_mat_obj) => {
                if(raw_mat_obj.incomes_id != id) {
                    return;
                }

                cur_amount_of_raw = raw_mat_obj.raw_mat_used_total;

                //Считаем, сколько всего потрачено на сырьё (sum_of_raw)
                raw_mat_obj.raw_mat_used.forEach((value_obj) => {
                    //Находим id сырья, имея id ряда в Журнале
                    const cur_raw_mat_id = journal_rows_data[value_obj.journal_id].raw_mat_id;
                    const cur_raw_mat_price = raw_mat_data[cur_raw_mat_id].price;

                    cur_sum_of_raw += cur_raw_mat_price * value_obj.used;
                });
            });

            const blockage_perc = (cur_amount_of_raw - cur_amount) / cur_amount_of_raw * 100;
            rows_updated[id] = {
                ...rows_data[id],
                sum: cur_sum,
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

    getUpdatedRawMatUsage(raw_mat_usage) {
        //здесь просто считает общее кол-во сырья и добавляет в каждый объект массива
        let raw_mat_usage_upd = raw_mat_usage.slice();

        raw_mat_usage_upd.forEach((raw_mat_usage_obj) => {
            let cur_used_total = 0;

            raw_mat_usage_obj.raw_mat_used.forEach((raw_obj) => {
               cur_used_total += raw_obj.used;
            });

            raw_mat_usage_obj.raw_mat_used_total = cur_used_total;
        });

        return raw_mat_usage_upd;
    }

    reformRawMatUsageForJournal(raw_mat_usage) {
        let raw_mat_usage_reformed = [];
        let journal_ids_used = [];

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

    render() {
        const journal_sort_names = ['Наименованию', 'Дате', 'Поставщику', 'Кол-ву', 'Цене', 'Сумме', 'Расходам'];
        const incomes_sort_names = ['Наименованию', 'Дате', 'Покупателю', 'Кол-ву', 'Цене', 'Сумме', 'Расходам всего'];

        return(
            <div>
                <Menu/>
                <JournalArea data={'journal'} sort_names={journal_sort_names}/>
                <IncomesArea data={'incomes'} sort_names={incomes_sort_names}/>
            </div>
        )
    }
}

const APP_W = connect(mapStateToProps('App'), mapDispatchToProps('App'))(App);
export default APP_W;