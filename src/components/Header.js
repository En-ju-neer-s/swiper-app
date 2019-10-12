import React from 'react';
import InfoScreen from './InfoScreen';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <div className={`c-header`}>
                    <div className={'header__inner'}>
                        <h2>{title}</h2>
                        <i className='header__info u-icon icon--info-circled'></i>
                    </div>
                </div>
            </div>

        )
    }
}

export default Header;