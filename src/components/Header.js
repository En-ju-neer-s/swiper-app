import React from 'react';
import InfoScreen from './InfoScreen';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggleClickbaitInfo = this.toggleClickbaitInfo.bind(this);

        this.state = ({
            clickbaitInfo: false,
        });

    }

    componentDidMount() {
        const toggleClickbaitInfo = document.querySelector('[js-toggle-info]');
        toggleClickbaitInfo.addEventListener("click", () => this.toggleClickbaitInfo(true));
    }

    toggleClickbaitInfo(boolean) {
        this.setState(
            {
                clickbaitInfo: boolean
            }, () => {
                if (!boolean) document.documentElement.classList.remove('has--modal');
            });
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <div className={`c-header`}>
                    <div className={'header__inner'}>
                        <h2>{title}</h2>
                        <i className='header__info u-icon icon--info-circled' js-toggle-info=''></i>
                    </div>
                </div>
                {this.state.clickbaitInfo &&
                    <InfoScreen
                        active={false}
                        title='Clickbait title'
                        body='Clickbait Body'
                        toggleInfoScreen={this.toggleClickbaitInfo}
                        buttonIcon={`cancel`}
                        buttonText={`Sluiten`} />
                }
            </div>

        )
    }
}

export default Header;