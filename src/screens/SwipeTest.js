import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';
import InfoScreen from '../components/InfoScreen';
import Axios from 'axios';
import { SWIPER_API } from '../constants';
import { getCookie } from '../utilities/Cookie';

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
        if (!getCookie()) return this.props.history.push('/login');
        const userCookie = getCookie().split('|');
        this.setState(
            {
                userCode: userCookie[1],
                articleCount: 4
            }, () => {
                const initialArticles = 4;
                for (let i = 0; i < initialArticles; i++) {
                    this.fetchArticle();
                }
            });
    }

    convertTime(data) {
        // if(data.includes("T")){
        //     return data.split('T')[0];
        // }

        return data;
    }

    encode(data) {
        return window.btoa(data);
    }

    decode(data) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(`<!doctype html><body>${window.atob(data)}`, 'text/html').body.textContent;
        return decodedString;
    }

    fetchArticle() {
        let articleArray = this.state.articles;

        Axios({
            method: 'POST',
            url: SWIPER_API + '/title/',
            headers: { 'Content-Type': 'application/json' },
            data: {
                "id": this.state.userCode
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

    fetchTestArticle() {
        let articleArray = this.state.articles;

        Axios({
            method: 'POST',
            url: SWIPER_API + '/title/',
            headers: { 'Content-Type': 'application/json' },
            data: {
                "id": this.state.userCode
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

    fetchTestArticle() {
        let articleArray = this.state.articles;

        Axios({
            method: 'GET',
            url: './data/test.json',
        })
        .then((response) => {
            // handle success
            const data = response.data[(this.state.articleCount / 5) - 1];
            articleArray.push(data);
            this.setState({ articles: articleArray });
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    updateArticles(button, answer) {
        // If function was triggered by buttons
        const currentCard = document.getElementById(this.state.articles[0].primary_key);
        if (button) currentCard.style[answer] = '-200vw';

        // Setup popup
        this.setState({
            infoScreenTitle: `${this.state.articles[0].title}`,
            infoScreenDate: this.convertTime(this.state.articles[0].timestamp),
            infoScreenSource: this.state.articles[0].url,
            infoScreenBody: this.state.articles[0].description,
            articleCount: this.state.articleCount += 1
        }, () => {
            this.toggleInfoScreen(true);

            const clickbait = this.state.articles[0].clickbait;

            if (button) {
                currentCard.addEventListener('transitionend', () => this.nextArticle(this.state.articles[0].primary_key, answer, clickbait))
            } else {
                this.nextArticle(this.state.articles[0].primary_key, answer, clickbait);
            }

            if(this.state.articleCount % 5 === 0){
                this.fetchTestArticle();
            } else {
                this.fetchArticle();
            }
        });
    }

    nextArticle(primaryKey, postAnswer, clickbait) {
        let oldArray = this.state.articles;

        const answer = (postAnswer === 'nee') ? 0 : 1;

        if(clickbait && postAnswer !== clickbait) {
            Axios({
                method: 'PATCH',
                url: SWIPER_API + '/strike/',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    "userId": this.state.userCode,
                }
            });
        } else if (!clickbait) {
            Axios({
                method: 'POST',
                url: SWIPER_API + '/swipe/',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    "userId": this.state.userCode,
                    "primaryKey": primaryKey,
                    "clickbait": answer
                }
            });
        }
        

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
                                    title={this.decode(item.title)}
                                    key={item.primary_key}
                                    id={item.primary_key}
                                    swipeLeft={() => { this.updateArticles(false, 'nee'); }}
                                    swipeRight={() => { this.updateArticles(false, 'ja'); }}>
                                    {item.id}
                                </SwipeCard>
                            );

                        })
                    }
                </SwipeDeck>
                {this.state.infoScreen &&
                    <InfoScreen
                        active={false}
                        title={this.decode(this.state.infoScreenTitle)}
                        date={this.state.infoScreenDate}
                        source={this.state.infoScreenSource}
                        body={this.decode(this.state.infoScreenBody)}
                        toggleInfoScreen={this.toggleInfoScreen}
                        buttonIcon={`cancel`}
                        buttonText={`Sluiten`} />
                }
            </div>
        );
    }
}

export default SwipeTest;