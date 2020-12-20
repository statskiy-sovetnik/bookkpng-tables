export default function mapStateToProps(component) {
    switch (component) {
        //_____ JOURNAL ______________
        case 'JournalArea':
            return function (state) {
                return {
                    journalRows: state.journal.rows,
                    journalColOrder: state.journal.columns_order,
                    journalColNames: state.journal.head_col_names,
                    journalTableWidth: state.journal.table_width,
                    expensesData: state.expenses_data,
                    journalEntriesPack: state.journal.entriesPack,
                    journalEntriesShown: state.journal.entriesShouldBeShown,
                    journalAppliedFromDate: state.journal.appliedFromDate,
                    journalAppliedToDate: state.journal.appliedToDate,
                    journalSortType: state.journal.sortName,
                    journalSortFromLeast: state.journal.sortFromLeast,
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
                    entriesPack: state.journal.entriesPack,
                    entriesShouldBeShown: state.journal.entriesShouldBeShown,
                }
            }
        //______ Journal Table ____________


        //_______AUTHENTIFICATION __________

        case 'Auth':
            return function (state) {
                return {
                    authType: state.auth.type,
                    signInFormValidated: state.auth.signInFormValidated,
                    signUpFormValidated: state.auth.signUpFormValidated,
                    signInCorrect: state.auth.signInCorrect,
                    signUpCorrect: state.auth.signUpCorrect,
                    signInValidation: state.auth.signInValidation,
                    signUpValidation: state.auth.signUpValidation,
                    signInKeyCorrect: state.auth.signInValidation.key,
                    signUpKeyCorrect: state.auth.signUpValidation.key,
                    signInEmailCorrect: state.auth.signInValidation.email,
                    signUpEmailCorrect: state.auth.signUpValidation.email,
                    signInPasswordCorrect: state.auth.signInValidation.password,
                    signUpPasswordCorrect: state.auth.signUpValidation.password,
                    signUpPasswordConfirmCorrect: state.auth.signUpValidation.passwordConfirm,
                    signInPasswordEntered: state.auth.signInPasswordEntered,
                    signUpPasswordEntered: state.auth.signUpPasswordEntered,
                }
            }
    }
}

