export default function mapStateToProps(component) {
    switch (component) {
        case 'JournalArea':
            return function (state) {
                return {
                    myValue: state.myValue,
                    journal: state.journal,
                }
            }
        case 'SortJournal':
            return function (state) {
                return {
                    sortName: state.journal.sortName,
                    sortFromLeast: state.journal.sortFromLeast,
                }
            }
    }
}

