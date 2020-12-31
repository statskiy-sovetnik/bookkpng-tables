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
        this.props.changeUserName(user_name);

        //Здесь инициализируешь journal.rows:

        const journal_rows_data = {
            0: {
                date: '27/04/2020',
                name: 'Название сырья среднее',
                provider_name: '\"ООО\" Мясо России',
                amount: 180.00,
                price: 457.50,
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
                date: '27/04/2020',
                name: 'Так я назвал сырьё',
                provider_name: '\"ОАО\" Китай Голимый',
                amount: 54.00,
                price: 184.50,
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
                date: '27/04/2020',
                name: 'Название сырья среднее',
                provider_name: '\"ООО\" Мясо России',
                amount: 180.00,
                price: 457.50,
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
            3: {
                date: '27/04/2020',
                name: 'Название сырья среднее',
                provider_name: '\"ООО\" Мясо России',
                amount: 180.00,
                price: 457.50,
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
            4: {
                date: '27/04/2020',
                name: 'Так я назвал сырьё',
                provider_name: '\"ОАО\" Китай Голимый',
                amount: 54.00,
                price: 184.50,
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
            5: {
                date: '27/08/2004',
                name: 'Совершенно другое сырьё',
                provider_name: '\"ООО\" Lazorbeam',
                amount: 2080.00,
                price: 999.50,
                expenses: [
                    {
                        id: 1,
                        amount: 440.33
                    },
                    {
                        id: 2,
                        amount: 480.00
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
            }
        }
        const journal_rows_updated = this.getUpdatedJournalRows(journal_rows_data);

        //Инициализируешь incomes.rows

        const incomes_rows_data = {
            0: {
                date: '18/03/2019',
                name: 'Бампер дроблёный',
                provider_name: 'ИП Бурунов Олег',
                amount: 125.70,
                amount_of_raw: 180.00,
                price: 664.50,
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
                ],
                sum_of_raw: 43050.00,
            },
            1: {
                date: '19/03/2019',
                name: 'Недодроблёнка',
                provider_name: 'Газпром Нефтьть',
                amount: 865.70,
                amount_of_raw: 1350.00,
                price: 83.50,
                expenses: [
                    {
                        id: 1,
                        amount: 12340.33
                    },
                    {
                        id: 4,
                        amount: 8111.18
                    },
                    {
                        id: 5,
                        amount: 5460.00
                    },
                    {
                        id: 6,
                        amount: 1340.00
                    },
                ],
                sum_of_raw: 43050.00,
            },
            2: {
                date: '19/03/2018',
                name: 'Недодроблёнка',
                provider_name: 'Газпром Нефтьть',
                amount: 865.70,
                amount_of_raw: 1350.00,
                price: 83.50,
                expenses: [
                    {
                        id: 1,
                        amount: 12340.33
                    },
                    {
                        id: 4,
                        amount: 8111.18
                    },
                    {
                        id: 5,
                        amount: 5460.00
                    },
                    {
                        id: 6,
                        amount: 1340.00
                    },
                ],
                sum_of_raw: 43050.00,
            },
            3: {
                date: '18/05/2019',
                name: 'Бампер дроблёный',
                provider_name: 'ИП Бурунов Олег',
                amount: 125.70,
                amount_of_raw: 180.00,
                price: 664.50,
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
                ],
                sum_of_raw: 43050.00,
            },
            4: {
                date: '21/04/2019',
                name: 'Недодроблёнка',
                provider_name: 'Газпром Нефтьть',
                amount: 865.70,
                amount_of_raw: 1350.00,
                price: 83.50,
                expenses: [
                    {
                        id: 1,
                        amount: 12340.33
                    },
                    {
                        id: 4,
                        amount: 8111.18
                    },
                    {
                        id: 5,
                        amount: 5460.00
                    },
                    {
                        id: 6,
                        amount: 1340.00
                    },
                ],
                sum_of_raw: 43050.00,
            },
            5: {
                date: '18/03/2007',
                name: 'Бампер дроблёный',
                provider_name: 'ИП Бурунов Олег',
                amount: 125.70,
                amount_of_raw: 180.00,
                price: 664.50,
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
                ],
                sum_of_raw: 43050.00,
            },
            6: {
                date: '09/02/2019',
                name: 'Недодроблёнка',
                provider_name: 'Газпром Нефтьть',
                amount: 865.70,
                amount_of_raw: 1350.00,
                price: 83.50,
                expenses: [
                    {
                        id: 1,
                        amount: 12340.33
                    },
                    {
                        id: 4,
                        amount: 8111.18
                    },
                    {
                        id: 5,
                        amount: 5460.00
                    },
                    {
                        id: 6,
                        amount: 1340.00
                    },
                ],
                sum_of_raw: 43050.00,
            },
        };
        const incomes_rows_updated = this.getUpdatedIncomesRows(incomes_rows_data);

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
    }

    componentDidMount() {
    }

    getUpdatedJournalRows(rows_data) {
        let rows_updated = {};

        for(let id in rows_data) {
            let cur_sum = rows_data[id].amount * rows_data[id].price;
            let cur_expenses_total = 0;

            rows_data[id].expenses.forEach((expense, i) => {
                cur_expenses_total += expense.amount;
            })

            rows_updated[id] = {
                ...rows_data[id],
                sum: cur_sum,
                total: cur_sum + cur_expenses_total,
                cost_price: (cur_sum + cur_expenses_total) / rows_data[id].amount,
            }
        }

        return rows_updated;
    }

    getUpdatedIncomesRows(rows_data) {
        let rows_updated = {};

        for(let id in rows_data) {
            let cur_sum = rows_data[id].amount * rows_data[id].price;
            let cur_expenses_total = 0;
            const amount_of_raw = rows_data[id].amount_of_raw;
            const blockage_perc = (amount_of_raw - rows_data[id].amount) / amount_of_raw * 100;

            //Считаем прочие расходы (всего)
            rows_data[id].expenses.forEach((expense, i) => {
                cur_expenses_total += expense.amount;
            });

            rows_updated[id] = {
                ...rows_data[id],
                sum: cur_sum,
                cost_price: (cur_expenses_total + rows_data[id].sum_of_raw) / rows_data[id].amount,
                blockage_perc: blockage_perc,
                revenue: cur_sum - cur_expenses_total - rows_data[id].sum_of_raw,
                profitability: (cur_sum - cur_expenses_total - rows_data[id].sum_of_raw) / cur_sum * 100,
            }
        }

        return rows_updated;
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