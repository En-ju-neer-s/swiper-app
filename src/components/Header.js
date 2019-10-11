import React from 'react';
import InfoScreen from './InfoScreen';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title} = this.props;
        return (
            <div>
                <div className={`c-header`}>
                    <div className={'header__inner'}>
                        <h2>{title}</h2>
                        <i className='header__info u-icon icon--info-circled'></i>
                    </div>
                </div>
                <InfoScreen active={true} title={`Trump geeft Noord-Syrië aan Turkije weg, wat houdt dat in?`} date={`21-21-21`} source={`https://www.google.com`} body={`De relatieve rust in Noord-Syrië lijkt om te slaan in nieuw oorlogsgeweld. Enkele uren na een telefoontje tussen de Amerikaanse president Trump en de Turkse president Erdogan begonnen Amerikaanse troepen zich vanochtend terug te trekken uit het gebied. Het maakt de weg vrij voor een Turkse aanval op de Koerden.`} buttonIcon={`cancel`} buttonText={`Sluiten`} />
            </div>

        )
    }
}

export default Header;