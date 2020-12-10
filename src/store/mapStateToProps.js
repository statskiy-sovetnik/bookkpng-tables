export default function mapStateToProps(component) {
    switch (component) {
        //_____ JOURNAL ______________
        case 'JournalArea':
            return function (state) {
                return {
                    journalRows: state.journal.rows,
                    journalColOrder: state.journal.columns_order,
                    journalColNames: state.journal.head_col_names,
                    journalColWidths: state.journal.col_widths,
                }
            }
        //______ Journal Sort ________________

        case 'SortJournal':
            return function (state) {
                return {
                    sortName: state.journal.sortName,
                }
            }
        case 'SortDirectionJournal':
            return function (state) {
                return {
                    sortFromLeast: state.journal.sortFromLeast,
                }
            }
        //______ Journal Period Filter ______________
        case 'JournalPeriodSort':
            return function (state) {
                return {
                    localFromDate: state.journal.localFromDate,
                    localToDate: state.journal.localToDate,
                }
            }
        case 'PrependInputFromJournal':
            return function (state) {
                return {
                    localFromDate: state.journal.localFromDate,
                }
            }

        case 'PrependInputToJournal':
            return function (state) {
                return {
                    localToDate: state.journal.localToDate,
                }
            }
        //______ Journal Entry Length Switch ____________

        case 'EntrySwitchLengthSectionJournal':
            return function (state) {
                return {
                    showEntries: state.journal.showEntries,
                }
            }
        //______ Journal Table ____________


    }
}

