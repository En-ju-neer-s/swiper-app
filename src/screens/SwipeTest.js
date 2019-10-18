import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';
import InfoScreen from '../components/InfoScreen';
import Axios from 'axios';
import { SWIPER_API } from '../constants';
import { getCookie, setCookie } from '../utilities/Cookie';

class SwipeTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            articles: [],
            userCode: '',
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
        this.fetchArticle();

        if (!getCookie()) return this.props.history.push('/login');
        const userCookie = getCookie().split('|');
        this.setState({ userCode: userCookie[1] });

        //Initialize first five articles
        const initialArticles = 5;
        for (let i = 0; i < (initialArticles - 1); i++) {
            this.fetchArticle();
        }
    }

    fetchArticle() {
        let articleArray = this.state.articles;

        Axios({
            method: 'POST',
            url: SWIPER_API + '/title/',
            headers: { 'Content-Type': 'application/json' },
            data: {
                "id": "kjkjlka2e232"
            }
        })
            .then((response) => {
                // handle success
                articleArray.push(response.data[0]);
                this.setState({ articles: articleArray });
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    updateArticles(button, direction) {
        // If function was triggered by buttons
        const currentCard = document.querySelector('#' + this.state.articles[0].id);
        if (button) currentCard.style[direction] = '-200vw';

        // Setup popup
        this.setState({
            infoScreenTitle: this.state.articles[0].title,
            infoScreenDate: this.state.articles[0].timestamp,
            infoScreenSource: this.state.articles[0].url,
            infoScreenBody: this.state.articles[0].description
        }, () => {
            this.toggleInfoScreen(true);
            if (button) {
                currentCard.addEventListener('transitionend', () => this.nextArticle(this.state.articles[0].primary_key, direction))
            } else {
                this.nextArticle(this.state.articles[0].primary_key, direction);
            }
        });

        // Add article to array
        this.fetchArticle();
    }

    nextArticle(primaryKey, postDirection) {
        let oldArray = this.state.articles;

        const direction = (postDirection === 'left') ? 0 : 1;

        Axios({
            method: 'POST',
            url: SWIPER_API + '/swipe/',
            headers: { 'Content-Type': 'application/json' },
            data: {
                "userId": this.state.userCode,
                "primaryKey": primaryKey,
                "clickbait": direction
            }
        });

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
                                    key={item.primary_key}
                                    id={item.primary_key}
                                    swipeLeft={() => { this.updateArticles(false, 'left'); }}
                                    swipeRight={() => { this.updateArticles(false, 'right'); }}>
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
                        onClick={() => { this.updateArticles(true, 'left') }} />
                    <Button
                        color='green'
                        large={true}
                        icon='ok'
                        onClick={() => { this.updateArticles(true, 'right') }} />
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