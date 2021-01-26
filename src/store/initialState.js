const ENTRIES_PACK = 5;

const initialState = {
    auth: {
        userName: 'Имя Пользователя',
        userKey: null,
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
        newEntryModalIsOpen: false,
        sortName: 'Наименованию',
        sortFromLeast: true,
        localFromDate: '',
        localToDate: '',
        appliedFromDate: '',
        appliedToDate: '',
        entriesPack: ENTRIES_PACK,
        entriesShouldBeShown: ENTRIES_PACK,
        //table
        rowsOpened: new Array(ENTRIES_PACK).fill(0),
        rows: { //the keys of this object are id's of rows
            /*0: {
                date: '',
                name: '',
                provider_name: '',
                amount_data: {
                    amount_total: 0,
                    amount_used: [
                        {
                            incomes_id: 0,
                            used: 0,
                        }
                    ]
                },
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
        columns_order: [ 'control', 'date', 'name', 'provider_name', 'amount_data', 'price',
        'sum', 'expenses', 'total', 'cost_price'],
        head_col_names: {
            date: 'Дата',
            name: 'Наименование',
            provider_name: 'Поставщик',
            amount_data: 'Кол-во (кг)',
            price: 'Цена (руб)',
            sum: 'Сумма (руб)',
            expenses: 'Расходы (руб)',
            total: 'Итого с учётом расходов (руб)',
            cost_price: 'Себестоимость (руб)',
            control: 'Управление',
        },
        //table popover
        popoverAddedExpenses: {},
        popoverValidation: {
            isExpensesValid: false,
        },
        table_width: 1600,
    },

    journal_new_entry_modal: {
        form_state: {
            raw_mat_id: null,
            raw_mat_name: '',
            raw_mat_provider_name: '',
            new_raw_mat_inputs_show: false,
            new_raw_mat_price: null,
            raw_mat_date: +new Date(),
            raw_mat_amount: null,
            expenses: {
                //0: 1270.00,
            }
        },
        validation: {
            show_validation: false,
            raw_mat_name: false,
            provider_name: false,
            price: false,
            amount: false,
            expenses: true,
        }
    },

    incomes_new_entry_modal: {
        isOpen: false,
        form_state: {
            date: +new Date(),
            amount: null,
            name: null,
            customer_name: null,
            price: null,
            expenses: {
                //0: 1156.5,
            },
            rowsChecked: [],
            rowsUsageState: {
                //0: 76.5,
            }
        },
        validation: {
            amount: false,
            name: false,
            customer_name: false,
            price: false,
            expenses: true,
            rows_usage: true,
        },
        //Table Area
        sortName: 'Дате',
        sortFromLeast: false,
        columns_order: [ 'select', 'usage', 'date', 'name', 'provider_name', 'amount_data', 'price'],
        head_col_names: {
            date: 'Дата',
            usage: 'Использ-ть сырья (кг)',
            name: 'Наименование',
            provider_name: 'Поставщик',
            amount_data: 'Кол-во (кг)',
            price: 'Цена (руб)',
            select: 'Выбрать',
        },
        table_width: 920,
        entriesPack: ENTRIES_PACK,
        entriesShouldBeShown: ENTRIES_PACK,
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
        columns_order: ['control', 'date', 'name', 'customer_name', 'amount', 'amount_of_raw', 'blockage_perc',
        'price', 'sum', 'cost_price', 'sum_of_raw', 'expenses', 'expenses_total', 'revenue', 'profitability'],
        head_col_names: {
            date: 'Дата',
            name: 'Наименование',
            customer_name: 'Покупатель',
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
        //table popover
        popoverAddedExpenses: {},
        popoverValidation: {
            isExpensesValid: false,
        },
        table_width: 2200,
    },

    incomes_new_raw_mat_modal: {
        modalIsOpen: false,
        targetRow: null,
        rowsChecked: [],
        rowsUsageState: {
            //0: 559.4,
        },
        //control-section
        sortNames: ['Дате', 'Наименованию', 'Поставщику', 'Кол-ву', 'Цене'],
        sortType: 'Дате',
        sortFromLeast: false,
        entriesPack: ENTRIES_PACK,
        entriesShouldBeShown: ENTRIES_PACK,
        //table
        columns_order: [ 'select', 'usage', 'date', 'name', 'provider_name', 'amount_data', 'price'],
        head_col_names: {
            date: 'Дата',
            usage: 'Использ-ть сырья (кг)',
            name: 'Наименование',
            provider_name: 'Поставщик',
            amount_data: 'Кол-во (кг)',
            price: 'Цена (руб)',
            select: 'Выбрать',
        },
        tableWidth: 920,
        validation: {
            isRowsUsageValid: false,
            isRowChecked: false,
        }
    },

    raw_mat_usage: [
    /*{
        incomes_id: 0,
        raw_mat_used_total: 184.00,
        raw_mat_used: [
            {
                journal_id: 0,
                used: 74.00,
            }
        ],
      }
      */
    ],

    //Basically, the same data as above, but reformed for better usage in journal

    raw_mat_usage_for_journal: [
        /*{
        journal_id: 0,
        raw_mat_used_total: 184.00,
        raw_mat_used_by: [
            {
                incomes_id: 0,
                used: 34.00,
            }
        ],
      }
      */
    ],

    expenses_data: {
        /*0: {
            color: '#e06c5d',
            name: 'Транспорт'
        }*/
    },

    raw_mat_data: {
        /*
        0: {
            name: 'Название сырья',
            provider_name: 'Имя поставщика',
            price: 74.00,
        }
        * */
    },

    expenses: {
        colsOrder: ['color', 'name', 'sum', 'control'],
        colsNames: {
            color: 'Цвет',
            name: 'Наименование',
            sum: 'Сумма',
            control: 'Управление',
        },
        entriesShowLimit: 8,
        tableWidth: 600,
    }
}

export default initialState;