const ENTRIES_PACK = 5;

const initialState = {
    auth: {
        type: 'signin',
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
            sum: 'Сумма',
            expenses: 'Расходы',
            total: 'Итого с учётом расходов',
            cost_price: 'Себестоимость',
            control: 'Управление',
        },
        table_width: 1300,
    },

    expenses_data: {
        /*0: {
            color: '#e06c5d',
            name: 'Транспорт'
        }*/
    }
}

export default initialState;