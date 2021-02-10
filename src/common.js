function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    let value = null;

    cookies.forEach((cookie_pair) => {
        const pair_name = cookie_pair.split('=')[0].replace(/\s/g, '');
        const pair_value = cookie_pair.split('=')[1];

        if(pair_name === name) {
            value = pair_value;
        }
    });

    return value;
}

function removeCookie(name) {
    const old_date_str = new Date(0).toUTCString();

    if(getCookieValue(name)) {
        document.cookie = name + '=' + ";expires=" + old_date_str;
    }
}

function getIncomesUsageObj(incomes_id, raw_mat_usage) {
    let target_incomes_obj = {};
    raw_mat_usage = raw_mat_usage ? raw_mat_usage : [];
    raw_mat_usage.forEach(incomes_obj => {
        if(+incomes_obj.incomes_id === +incomes_id) {
            Object.assign(target_incomes_obj, incomes_obj);
        }
    })
    return target_incomes_obj;
}

function getExpensesUsageObj(expenses_id, expenses_usage) {
    let target_exp_arr = [];
    expenses_usage = expenses_usage ? expenses_usage : {};
    for(let exp_row_id in expenses_usage) {
        if(+expenses_id === +exp_row_id) {
            target_exp_arr = expenses_usage[exp_row_id].slice();
        }
    }
    return target_exp_arr;
}

function isEmptyObj(obj) {
    return !obj || Object.keys(obj).length === 0;
}

//Validation _________________

function isRawMatNameValid(value) {
    return /^[\w\d\sа-яё]+$/i.test("" + value) &&
            (value + '').length >= 1 &&
            (value + '').length <= 40;
}

function isExpenseNameValid(value) {
    return /^[\w\d\sа-яё]+$/i.test("" + value) &&
        (value + '').length >= 1 &&
        (value + '').length <= 40;
}

function isGoodsNameValid(value) {
    return /^[\w\d\sа-яё]+$/i.test("" + value) &&
        (value + '').length >= 1 &&
        (value + '').length <= 40;
}

function isProviderNameValid(value) {
    return /^[\w\d\sа-яё]+$/i.test("" + value) &&
        (value + '').length >= 1 &&
        (value + '').length <= 50;
}

function isFloat(value) {
    return /^[0-9]*[.]?[0-9]+$/.test('' + value) &&
        +value >= 0 &&
        +value < 2147483646;
}

function setValidation(elem, isValid) {
    if(isValid) {
        elem.classList.add('is-valid');
        elem.classList.remove('is-invalid');
    }
    else {
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
    }
}

/*_______________*/

function convertDateToMysqlDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + formatMonth(date.getMonth()) + "-" + formatDay(date.getDate());  //date to yyyy/MM/dd
}

function formatMonth(month) {
    const new_month = (month + 1) + '';
    return (new_month.length === 1) ? '0' + new_month : new_month;
}

function formatDay(day) {
    let new_day = '' + day;
    return (new_day.length === 1) ? '0' + new_day : new_day;
}

/*_____________*/

const SERVER_ROOT = '..';
const SIGN_IN_SCRIPT_PATH = '/src/php/sign_in.php';
const SIGN_UP_SCRIPT_PATH = '/src/php/sign_up.php';
const ADD_EXPENSE_TYPE_PATH = '/src/php/add_expense_type.php';
const ADD_INCOMES_ENTRY_PATH = '/src/php/add_incomes_entry.php';
const ADD_INCOMES_EXPENSES_PATH = '/src/php/add_incomes_expenses.php';
const ADD_JOURNAL_ENTRY_PATH = '/src/php/add_journal_entry.php';
const ADD_JOURNAL_EXPENSES_PATH = '/src/php/add_journal_expenses.php';
const ADD_RAW_MAT_USAGE_PATH = '/src/php/add_raw_mat_usage.php';
const ADD_EXPENSES_DATA_PATH = '/src/php/add_expenses_data.php';
const GET_INCOMES_ROWS_PATH = '/src/php/get_incomes_rows.php';
const GET_JOURNAL_ROWS_PATH = '/src/php/get_journal_rows.php';
const GET_RAW_MAT_DATA_PATH = '/src/php/get_raw_mat_data.php';
const GET_RAW_MAT_USAGE_PATH = '/src/php/get_raw_mat_usage.php';
const REMOVE_EXPENSE_TYPE_PATH = '/src/php/remove_expense_type.php';
const REMOVE_ROW_PATH = '/src/php/remove_row.php';
const REMOVE_INCOMES_ROW_EXPENSES_PATH = '/src/php/remove_incomes_row_expenses.php';
const ADD_EXPENSES_ROW_PATH = '/src/php/add_expenses_row.php';
const GET_EXPENSES_ROWS_PATH = '/src/php/get_expenses_rows.php';
const GET_EXPENSES_DATA_PATH = '/src/php/get_expenses_data.php';
const REMOVE_EXPENSES_ROW_PATH = '/src/php/remove_expenses_row.php';
const GET_EXPENSES_USAGE_PATH = '/src/php/get_expenses_usage.php';

export {getCookieValue, removeCookie, isRawMatNameValid, isProviderNameValid, convertDateToMysqlDate, isEmptyObj, formatDay,
        isFloat, setValidation, isGoodsNameValid, isExpenseNameValid, getIncomesUsageObj, getExpensesUsageObj,
    SERVER_ROOT, SIGN_IN_SCRIPT_PATH, SIGN_UP_SCRIPT_PATH,
    ADD_EXPENSE_TYPE_PATH, ADD_EXPENSES_DATA_PATH, ADD_INCOMES_ENTRY_PATH, ADD_INCOMES_EXPENSES_PATH, ADD_JOURNAL_ENTRY_PATH,
    ADD_JOURNAL_EXPENSES_PATH, ADD_RAW_MAT_USAGE_PATH, GET_INCOMES_ROWS_PATH, GET_JOURNAL_ROWS_PATH, GET_RAW_MAT_DATA_PATH,
    GET_RAW_MAT_USAGE_PATH, REMOVE_EXPENSE_TYPE_PATH, REMOVE_ROW_PATH, REMOVE_INCOMES_ROW_EXPENSES_PATH, ADD_EXPENSES_ROW_PATH,
    GET_EXPENSES_ROWS_PATH, GET_EXPENSES_DATA_PATH, REMOVE_EXPENSES_ROW_PATH, GET_EXPENSES_USAGE_PATH,
};