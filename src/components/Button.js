import React from 'react';
import classNames from 'classnames';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { color, large, icon, text, link, onClick, className } = this.props;
        const buttonClasses = classNames({
            'c-button': true,
            [`button--${color}`]: color,
            'button--large': large,
            'button--small': !large,
            'button--with-text': text,
            [className]: className,
        });
        return (
            <a className={buttonClasses} href={link} onClick={onClick}>
                {text}
                {icon &&
                    <i className={`button__icon u-icon icon--${icon}`}></i>
                }
            </a>
        )
    }
}

export default Button;