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

    decode(data) {
        const parser = new DOMParser();
        let decodedString = parser.parseFromString(`<!doctype html><body>${window.atob(data)}`, 'text/html').body.textContent;
        decodedString = this.decodeSpecialCharacters(decodedString);
        return decodedString;
    }

    decodeSpecialCharacters(decodedString) {
        decodedString = decodedString.split('Ã«').join('ë');
        decodedString = decodedString.split('Ã©').join('é');
        decodedString = decodedString.split('Ã¨').join('è');
        decodedString = decodedString.split(`Ã `).join('à');
        decodedString = decodedString.split('Ã¡').join('á');
        decodedString = decodedString.split('Ã¤').join('ä');
        decodedString = decodedString.split('Ã¹').join('ù');
        decodedString = decodedString.split('Ãº').join('ú');
        decodedString = decodedString.split('Ã¼').join('ü');
        decodedString = decodedString.split('Ã¶').join('ö');
        decodedString = decodedString.split('Â©').join('©');
        decodedString = decodedString.split('Â®').join('®');
        decodedString = decodedString.split('Ã').join('À');
        decodedString = decodedString.split('Ã').join('Á');
        decodedString = decodedString.split('Ã').join('Ä');
        decodedString = decodedString.split('Ã').join('È');
        decodedString = decodedString.split('Ã').join('É');
        decodedString = decodedString.split('Ã').join('Ë');
        decodedString = decodedString.split('Ã').join('Ö');
        decodedString = decodedString.split('Ä').join('ć');
        decodedString = decodedString.split('Ä').join('Ć');
        decodedString = decodedString.split('Ã').join('Ù');
        decodedString = decodedString.split('Ã').join('Ú');
        decodedString = decodedString.split('Ã').join('Ü');
        decodedString = decodedString.split('â¬Ü').join('‘');
        decodedString = decodedString.split('â¬"').join('’');
        decodedString = decodedString.split('â').join('’');
        decodedString = decodedString.split('â').join('‘');

        return decodedString;
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
            if(this.articleExists(articleArray, response.data[0].primary_key)){
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
            response.data.forEach((event, index) =>{
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
            if(this.state.articleCount / 5 > this.state.totalTests) {
                this.setState({ 
                    articleCount: 5
                }, () =>{
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
        const currentCard = document.getElementById(this.state.articles[0].primary_key);
        if (button) currentCard.style[answer] = '-200vw';
        let title = this.state.articles[0].title;
        if(title === '') title = this.state.articles[0]['og-title'];

        // Setup popup
        this.setState({
            infoScreenTitle: `${title}`,
            infoScreenDate: this.state.articles[0].timestamp,
            infoScreenSource: this.state.articles[0].url,
            infoScreenBody: this.state.articles[0].description,
            articleCount: this.state.articleCount += 1
        }, () => {
            if(!this.state.articles[0].welcome) {
                this.toggleInfoScreen(true);
            }

            if (button) {
                currentCard.addEventListener('transitionend', () => this.nextArticle(this.state.articles[0], answer))
            } else {
                this.nextArticle(this.state.articles[0], answer);
            }

            if(this.state.articleCount % 5 === 0){
                this.fetchTestArticle();
            } else {
                this.fetchArticle();
            }
        });
    }

    nextArticle(article, postAnswer) {
        let oldArray = this.state.articles;

        const answer = (postAnswer === 'nee') ? 0 : 1;

        if(article.clickbait && postAnswer !== article.clickbait) {
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
        if(data) {
            if([...data].length === 13) data = parseInt(data);
            return moment(data).format('DD-MM-YYYY');
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
                            return (
                                <SwipeCard
                                    disabled={disabled}
                                    title={this.decode(item.title)}
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
                        title={this.decode(this.state.infoScreenTitle)}
                        date={this.stampToDate(this.state.infoScreenDate)}
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