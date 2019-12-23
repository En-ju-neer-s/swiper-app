import React from 'react';
import * as moment from 'moment';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';
import InfoScreen from '../components/InfoScreen';
import Axios from 'axios';
import { SWIPER_API } from '../constants';
import { getCookie } from '../utilities/Cookie';
import decode from '../utilities/Decode';

let loadTimeout;
const JS_LOADER = '[js-loader]';
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
                this.fetchWelcomeArticles();
                const initialArticles = 4;
                for (let i = 0; i < initialArticles; i++) {
                    this.fetchArticle();
                }
            });
    }

    encode(data) {
        return window.btoa(data);
    }

    articleExists(articleArray, primary_key) {
        return articleArray.some(item => item.primary_key === primary_key);
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
                if (this.articleExists(articleArray, response.data[0].primary_key)) {
                    this.fetchArticle();
                } else {
                    articleArray.push(response.data[0]);
                    this.setState({ articles: articleArray });
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    fetchWelcomeArticles() {
        let articleArray = this.state.articles;

        Axios({
            method: 'GET',
            url: './data/welcome.json',
        })
            .then((response) => {
                response.data.forEach((event, index) => {
                    articleArray.push(response.data[index]);
                    this.setState({ articles: articleArray });
                });
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
                if (this.state.articleCount / 5 > this.state.totalTests) {
                    this.setState({
                        articleCount: 5
                    }, () => {
                        const data = response.data[(this.state.articleCount / 5) - 1];
                        articleArray.push(data);
                        this.setState({
                            articles: articleArray,
                            totalTests: response.data.length
                        });
                    });
                } else {
                    const data = response.data[(this.state.articleCount / 5) - 1];
                    articleArray.push(data);
                    this.setState({
                        articles: articleArray,
                        totalTests: response.data.length
                    });
                }

            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    updateArticles(button, answer) {
        // If function was triggered by buttons
        // close Modal
        this.toggleInfoScreen(false);
        clearTimeout(loadTimeout);

        const article = this.state.articles[0];
        const currentCard = document.getElementById(article.primary_key);
        if (button) currentCard.style[answer] = '-200vw';

        const title = (article.title || article.title !== "") ? article.title : article['og-title'];

        // Setup popup
        this.setState({
            infoScreenTitle: `${title}`,
            infoScreenDate: article.timestamp,
            infoScreenSource: article.url,
            infoScreenBody: article.description,
            articleCount: this.state.articleCount += 1
        }, () => {
            if (!article.welcome) {
                this.toggleInfoScreen(true);
            }

            if (button) {
                currentCard.addEventListener('transitionend', () => this.nextArticle(article, answer))
            } else {
                this.nextArticle(article, answer);
            }

            if (this.state.articleCount % 5 === 0) {
                this.fetchTestArticle();
            } else {
                for (let i = 0; i < 5; i++) {
                    this.fetchArticle();
                }
            }
        });
    }

    nextArticle(article, postAnswer) {
        let oldArray = this.state.articles;
        const answer = (postAnswer === 'nee') ? 0 : 1;

        if (article.clickbait && postAnswer !== article.clickbait) {
            Axios({
                method: 'PATCH',
                url: SWIPER_API + '/strike/',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    "userId": this.state.userCode,
                }
            });
        } else if (!article.clickbait && !article.welcome) {
            Axios({
                method: 'POST',
                url: SWIPER_API + '/swipe/',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    "userId": this.state.userCode,
                    "primaryKey": article.primary_key,
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

    stampToDate(data) {
        if (data) {
            if ([...data].length === 13) data = parseInt(data);
            return moment(data).format('DD-MM-YYYY');
        }
    }

    countInfoShow(width, loader) {
        loader.style.width = `${width}%`;

        if (width < 100) {
            loadTimeout = setTimeout(() => {
                this.countInfoShow(width + 1, loader);
            }, 100);
        } else {
            this.toggleInfoScreen(false);
        }
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
                            const title = (item.title || item.title !== "") ? item.title : item['og-title'];

                            return (
                                <SwipeCard
                                    disabled={disabled}
                                    title={decode(title)}
                                    welcome={item.welcome}
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
                        title={decode(this.state.infoScreenTitle)}
                        date={this.stampToDate(this.state.infoScreenDate)}
                        source={this.state.infoScreenSource}
                        toggleInfoScreen={this.toggleInfoScreen}
                        countInfoShow={this.countInfoShow}
                        loadTimeout={loadTimeout}
                        buttonIcon={`cancel`}
                        buttonText={`Sluiten`} />
                }
            </div>
        );
    }
}

export default SwipeTest;