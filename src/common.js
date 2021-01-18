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

function isEmptyObj(obj) {
    return !obj || Object.keys(obj).length === 0;
}

//Validation _________________

function isRawMatNameValid(value) {
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

export {getCookieValue, removeCookie, isRawMatNameValid, isProviderNameValid, convertDateToMysqlDate, isEmptyObj, formatDay,
        isFloat, setValidation, isGoodsNameValid};