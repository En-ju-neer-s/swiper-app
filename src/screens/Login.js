import React from 'react';
import Button from '../components/Button';
import { getCookie, setCookie } from '../utilities/Cookie';
import Axios from 'axios';
import { SWIPER_API } from '../constants';

class Login extends React.Component {
    constructor(props) {
        super(props);

        if (getCookie()) this.props.history.push('/');
    }

    componentDidMount() {
        this.username = document.querySelector('[js-login-input]');
        this.username.addEventListener('keyup', () => this.replaceEmojis());
        document.addEventListener('mousemove', () => this.replaceEmojis());
        document.addEventListener('click', () => this.replaceEmojis());
        document.addEventListener('touchup', () => this.replaceEmojis());
    }

    replaceEmojis() {
        this.username.value = this.username.value.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, '');
    }

    setUsername(){
        if(this.username.value) {
            setCookie(this.username.value);

            Axios({
                method: 'POST',
                url: SWIPER_API + '/user/',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    "id": setCookie(this.username.value),
                    "username": this.username.value
                }
            });

            this.props.history.push('/');
        }
    }

    render() {

        return (
            <div className='s-login'>
                <div className='login__field'>
                    <span className='login__label'>Gebruikersnaam:</span>
                    <input name='username' placeholder="Type je gebruikersnaam" className='login__input' js-login-input='' />
                </div>
                <Button
                    color='blue'
                    text='Start'
                    className='login__button'
                    icon='right-open'
                    onClick={() => { this.setUsername() }} />
            </div>
        );
    }
}

export default Login;