import React from 'react';
import Button from '../components/Button';
import { getCookie, setCookie } from '../utilities/Cookie';

class Login extends React.Component {
    constructor(props) {
        super(props);

        if (getCookie()) this.props.history.push('/');
    }

    setUsername(){
        const username = document.querySelector('[js-login-input]');
        if(username.value) {
            setCookie(username.value);
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