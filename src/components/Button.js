import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <a className={`c-button button--${this.props.color} ${this.props.large ? 'button--large' : 'button--small'} ${this.props.icon} ${this.props.text ? 'button--with-text' : ''}`} href={this.props.link}>
                {this.props.text}
                {this.props.icon &&
                    <div className={`button__icon button__icon--${this.props.icon}`}></div>
                }
            </a>
        )
    }
}

export default Button;