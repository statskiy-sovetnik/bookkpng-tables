const SHOW_ENTRIES = 5;

const initialState = {
    journal: {
        sortName: 'Наименованию',
        sortFromLeast: true,
        localFromDate: '',
        localToDate: '',
        appliedFromDate: '',
        appliedToDate: '',
        showEntries: SHOW_ENTRIES,
        rowsOpened: new Array(SHOW_ENTRIES).fill(0),
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
            }*/
        },
        columns_order: ['date', 'name', 'provider_name', 'amount', 'price',
        'sum', 'expenses', 'total'],
        head_col_names: {
            date: 'Дата',
            name: 'Наименование',
            provider_name: 'Поставщик',
            amount: 'Кол-во (кг)',
            price: 'Цена (руб)',
            sum: 'Сумма',
            expenses: 'Расходы',
            total: 'Итого с учётом расходов',
        },
        col_widths: {
            date: 1,
            amount: 1,
            price: 1,
            sum: 1,
            name: 2,
            provider_name: 2,
            expenses: 2,
            total: 2,
        }
    },

    expenses_data: {
        /*0: {
            color: '#e06c5d',
            name: 'Транспорт'
        }*/
    }
}

export default initialState;