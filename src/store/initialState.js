const ENTRIES_PACK = 5;

const initialState = {
    auth: {
        userName: 'Имя Пользователя',
        type: 'signin',
        signInPasswordEntered: '',
        signUpPasswordEntered: '',
        signUpValidation: {
            key: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        signInValidation: {
            key: '',
            email: '',
            password: '',
        },
    },

    journal: {
        sortName: 'Наименованию',
        sortFromLeast: true,
        localFromDate: '',
        localToDate: '',
        appliedFromDate: '',
        appliedToDate: '',
        entriesPack: ENTRIES_PACK,
        entriesShouldBeShown: ENTRIES_PACK,
        rowsOpened: new Array(ENTRIES_PACK).fill(0),
        rows: { //the keys of this object are id's of rows
            /*0: {
                date: '',
                name: '',
                provider_name: '',
                amount: 0,
                price: 0,
                sum: 0,
                expenses: [
                    {
                        id: 0,
                        amount: 1680.50
                    },
                ],
                expenses_total: 0,
                total: 0,
                cost_price: 0,
            }*/
        },
        columns_order: [ 'control', 'date', 'name', 'provider_name', 'amount', 'price',
        'sum', 'expenses', 'total', 'cost_price'],
        head_col_names: {
            date: 'Дата',
            name: 'Наименование',
            provider_name: 'Поставщик',
            amount: 'Кол-во (кг)',
            price: 'Цена (руб)',
            sum: 'Сумма (руб)',
            expenses: 'Расходы (руб)',
            total: 'Итого с учётом расходов (руб)',
            cost_price: 'Себестоимость (руб)',
            control: 'Управление',
        },
        table_width: 1370,
    },

    incomes: {
        sortName: 'Наименованию',
        sortFromLeast: true,
        localFromDate: '',
        localToDate: '',
        appliedFromDate: '',
        appliedToDate: '',
        entriesPack: ENTRIES_PACK,
        entriesShouldBeShown: ENTRIES_PACK,
        rowsOpened: new Array(ENTRIES_PACK).fill(0),
        rows: {},
        columns_order: ['control', 'date', 'name', 'provider_name', 'amount', 'amount_of_raw', 'blockage_perc',
        'price', 'sum', 'cost_price', 'sum_of_raw', 'expenses', 'expenses_total', 'revenue', 'profitability'],
        head_col_names: {
            date: 'Дата',
            name: 'Наименование',
            provider_name: 'Покупатель',
            amount: 'Кол-во (кг)',
            amount_of_raw: 'Кол-во сырья (кг)',
            blockage_perc: 'Засор (%)',
            price: 'Цена продажи (руб)',
            sum: 'Сумма продажи (руб)',
            cost_price: 'Себестоимость (руб)',
            sum_of_raw: 'Расходы на сырьё (руб)',
            expenses: 'Прочие расходы (руб)',
            expenses_total: 'Расходов всего (руб)',
            revenue: 'Прибыль (руб)',
            profitability: 'Рентабельность (%)',
            control: 'Управление',
        },
        table_width: 2200,
    },

    expenses_data: {
        /*0: {
            color: '#e06c5d',
            name: 'Транспорт'
        }*/
    }
}

export default initialState;