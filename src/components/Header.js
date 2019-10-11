import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title} = this.props;
        return (
            <div className={`c-header`}>
                <div className={'header__inner'}>
                    <h2>{title}</h2>
                    
                    <i className='header__info u-icon icon--info-circled'></i>
                </div>
            </div>
        )
    }
}

export default Header;