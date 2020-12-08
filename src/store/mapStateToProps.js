export default function mapStateToProps(component) {
    switch (component) {
        //______ Journal Sort ________________

        case 'SortJournal':
            return function (state) {
                return {
                    sortName: state.journal.sortName,
                    sortFromLeast: state.journal.sortFromLeast,
                }
            }
        case 'SortDirectionJournal':
            return function (state) {
                return {
                    sortFromLeast: state.journal.sortFromLeast,
                }
            }
        //______ Journal Period Filter ______________
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
    }
}

