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

export {getCookieValue};