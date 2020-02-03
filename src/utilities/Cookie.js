const COOKIE_NAME = 'swiperAccount';
const TOTAL_SWIPES = 'totalSwipes';

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

export function setSwipeTotal() {

    const date = new Date();
    const nextYear = date.getFullYear() + 1;

    const value = "; " + document.cookie;
    const parts = value.split("; " + TOTAL_SWIPES + "=");

    let newValue = 0;
    console.log(parts)

    if (parts.length > 1) {
        newValue = parseInt(parts[1]) + 1;
    }
    document.cookie = `${TOTAL_SWIPES}=${newValue}; expires=Thu, 31 Dec ${nextYear} 12:00:00 UTC`;
}

export function getSwipeTotal() {
    const value = "; " + document.cookie;
    const parts = value.split("; " + TOTAL_SWIPES + "=");

    if (parts.length > 1) {
        return parseInt(parts[1]);
    } else {
        return 0;
    }
}

// Remove when redundant!
// export function createAccount(username) {
//     const date = new Date();
//     let usercode = `${username.split(' ').join('')}`;
//     usercode = `${usercode.substring(0, 10)}${date.getTime()}`;

//     return `${username}|${usercode}`;
// }