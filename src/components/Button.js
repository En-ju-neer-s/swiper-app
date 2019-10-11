import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { color, large, icon, text, link } = this.props;
        return (
            <a className={`c-button button--${color} ${large ? 'button--large' : 'button--small'} ${icon} ${text ? 'button--with-text' : ''}`} href={link}>
                {text}
                {icon &&
                    <i className={`button__icon u-icon icon--${icon}`}></i>
                }
            </a>
        )
    }
}

export default Button;