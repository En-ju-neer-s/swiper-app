import React from 'react';
const COOKIE_NAME = 'swiperAccount';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date();
        if(!this.getCookie(COOKIE_NAME)) this.setCookie('Mark Vonkje');
        const user = this.getCookie(COOKIE_NAME).split('|');
        console.log(user);
    }

    createAccount(username){
        let usercode = `${username.split(' ').join('')}`;
        usercode = `${usercode.substring(0, 10)}${this.date.getTime()}`;

        return `${username}|${usercode}`;
    }

    setCookie(username) {
        const nextYear = this.date.getFullYear() + 1;
        document.cookie = `${COOKIE_NAME}=${this.createAccount(username)}; expires=Thu, 31 Dec ${nextYear} 12:00:00 UTC`;
    }

    getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    render() {

        return (
            <div className="s-login">
                
            </div>
        )
    }
}

export default Login;