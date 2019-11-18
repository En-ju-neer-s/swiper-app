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
                        title='Wie zijn wij?'
                        body='Wij van ACED doen onderzoek naar het gebruik van ‘clickbait koppen’ van artikelen die de
                        grote mediaplatforms gebruiken puur om meer clicks te genereren. Wij zouden graag willen weten
                        door middel van een spel welke koppen als clickbait worden ervaren. Hier zal u tijdens dit
                        spel op worden getest. Dit helpt ons om inzicht te krijgen hoe men denkt over de
                        (verleidelijke) koppen van de diverse mediaplatforms. Of u een krantenkop clickbait is, is volledig iemand zijn mening.'
                        toggleInfoScreen={this.toggleClickbaitInfo}
                        buttonIcon={`cancel`}
                        buttonText={`Sluiten`} />
                }
            </div>

        )
    }
}

export default Header;