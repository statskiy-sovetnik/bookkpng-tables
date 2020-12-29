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

export {getCookieValue, removeCookie};