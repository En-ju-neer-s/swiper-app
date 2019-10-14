import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';
import InfoScreen from '../components/InfoScreen';
import Axios from 'axios';
import { SWIPER_API } from '../constants';

class SwipeTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            articles: [],
            infoScreen: false,
            infoScreenTitle: '',
            infoScreenDate: '',
            infoScreenSource: '',
            infoScreenBody: ''
        });

        this.updateArticles = this.updateArticles.bind(this);
        this.nextArticle = this.nextArticle.bind(this);
        this.toggleInfoScreen = this.toggleInfoScreen.bind(this);
    }

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles() {
        Axios.get(SWIPER_API)
            .then(function (response) {
                // handle success
                console.log('response', response);
            })
            .catch(function (error) {
                // handle error
                console.log('error', error);
            });
        this.setState({
            articles: [
                { title: 'Bruilofts­gast bespuugt beveili­gings­be­amb­te nadat peperdure Lamborghi­ni crasht', id: 'hksafhskjd', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Een afscheid zoals Raffie wilde: ‘Voetbal stelt geen reet voor’', id: 'kashfkjshdj', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'NPO 3 scoort pannen van het dak met Stanley H. en Zondag met Lubach', id: 'ehwrjkwnkj', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Angstaanja­gen­de vondst in container langs de A12', id: 'lijaoiwjdlka', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Spanning rond wedstrijd Frank­rijk-Tur­kije: ‘Politieke signalen verboden’', id: 'oijnakdjkwa', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' }
            ]
        });
    }

    updateArticles(direction) {
        // If function was triggered by buttons
        const currentCard = document.querySelector('#' + this.state.articles[0].id);
        if (direction) currentCard.style[direction] = '-200vw';

        // Setup popup
        this.setState({
            infoScreenTitle: this.state.articles[0].title,
            infoScreenDate: this.state.articles[0].date,
            infoScreenSource: this.state.articles[0].source,
            infoScreenBody: this.state.articles[0].body
        }, () => {
            this.toggleInfoScreen(true);
            direction ? currentCard.addEventListener('transitionend', () => this.nextArticle()) : this.nextArticle();
        });
    }

    nextArticle() {
        let oldArray = this.state.articles;
        oldArray.shift();
        this.setState({ articles: oldArray });
    }

    toggleInfoScreen(boolean) {
        this.setState(
            {
                infoScreen: boolean
            }, () => {
                if (!boolean) document.documentElement.classList.remove('has--modal');
            });
    }

    render() {
        const { articles } = this.state;

        return (
            <div className='s-swipe-test'>
                <Header title='Vind je dit clickbait?' />
                <SwipeDeck>
                    {articles.length > 0 &&
                        articles.map((item, index) => {
                            const disabled = (index === articles.length) ? false : true;
                            return (
                                <SwipeCard
                                    disabled={disabled}
                                    title={item.title}
                                    key={item.id}
                                    id={item.id}
                                    swipeLeft={() => { this.updateArticles(); }}
                                    swipeRight={() => { this.updateArticles(); }}>
                                    {item.id}
                                </SwipeCard>
                            );

                        })
                    }
                </SwipeDeck>
                <div className={`swipe-test__buttons ${this.state.articles.length ? '' : 'is--hidden'}`}>
                    <Button
                        color='red'
                        large={true}
                        icon='cancel'
                        onClick={() => { this.updateArticles('left') }} />
                    <Button
                        color='green'
                        large={true}
                        icon='ok'
                        onClick={() => { this.updateArticles('right') }} />
                </div>
                {this.state.infoScreen &&
                    <InfoScreen
                        active={false}
                        title={this.state.infoScreenTitle}
                        date={this.state.infoScreenDate}
                        source={this.state.infoScreenSource}
                        body={this.state.infoScreenBody}
                        toggleInfoScreen={this.toggleInfoScreen}
                        buttonIcon={`cancel`}
                        buttonText={`Sluiten`} />
                }
            </div>
        );
    }
}

export default SwipeTest;