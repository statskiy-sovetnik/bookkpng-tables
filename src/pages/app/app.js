import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

/*___ Blocks________________*/
import Menu from '../../blocks/menu/menu'
import {JOURNAL_AREA_W as JournalArea} from '../../blocks/table-area/table-area'

/*___ Libs _________________*/
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle'

class App extends React.Component {
    componentDidMount() {
        //здесь взять все данные из базы
        //и добавить их в store

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
            }
        }
        const journal_rows_updated = this.getUpdatedJournalRows(journal_rows_data);

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
        this.props.loadExpensesData(expenses_data);
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
                total: cur_sum - cur_expenses_total,
            }
        }

        return rows_updated;
    }

    render() {
        const journal_sort_names = ['Наименованию', 'Дате', 'Поставщику', 'Кол-ву', 'Цене', 'Сумме', 'Расходам'];

        return(
            <div>
                <Menu/>
                <JournalArea data={'journal'} sort_names={journal_sort_names}/>
            </div>
        )
    }
}

const APP_W = connect(mapStateToProps('App'), mapDispatchToProps('App'))(App);
export default APP_W;