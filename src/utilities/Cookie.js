const COOKIE_NAME = 'swiperAccount';

export function getCookie() {
    const value = "; " + document.cookie;
    const parts = value.split("; " + COOKIE_NAME + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export function setCookie(username) {
    const date = new Date();
    const nextYear = date.getFullYear() + 1;
    let usercode = `${username.split(' ').join('')}`;
    usercode = `${usercode.substring(0, 10)}${date.getTime()}`;
    document.cookie = `${COOKIE_NAME}=${username}|${usercode}; expires=Thu, 31 Dec ${nextYear} 12:00:00 UTC`;
    return usercode;
}

// Remove when redundant!
// export function createAccount(username) {
//     const date = new Date();
//     let usercode = `${username.split(' ').join('')}`;
//     usercode = `${usercode.substring(0, 10)}${date.getTime()}`;

//     return `${username}|${usercode}`;
// }