import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';
import InfoScreen from '../components/InfoScreen';
// import Axios from 'axios';

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
        // axios.get('/user?ID=12345')
        //     .then(function (response) {
        //         // handle success
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     });
        this.setState({
            articles: [
                { title: 'Lorem ipsum 1', id: 'hksafhskjd', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Lorem ipsum 2', id: 'kashfkjshdj', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Lorem ipsum 3', id: 'ehwrjkwnkj', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Lorem ipsum 4', id: 'lijaoiwjdlka', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' },
                { title: 'Lorem ipsum 5', id: 'oijnakdjkwa', date: '20-20-2020', source: 'http://www.nu.nl', body: 'Lorem ipsum' }
            ]
        });
    }

    updateArticles(direction) {
        // If function was triggered by buttons
        if(direction) {
            const currentCard = document.querySelector('#' + this.state.articles[0].id);
            if (direction === 'left') {
                currentCard.style.left = '-2000px';
            } else {
                currentCard.style.right = '-2000px';
            }
        }
        
        // Setup popup
        this.setState({
            infoScreenTitle: this.state.articles[0].title,
            infoScreenDate: this.state.articles[0].date,
            infoScreenSource: this.state.articles[0].source,
            infoScreenBody: this.state.articles[0].body
        });
        
        // Wait before shifting array
        setTimeout(() => {
            this.toggleInfoScreen();
            this.nextArticle();
        }, 300);
    }

    nextArticle(){
        let oldArray = this.state.articles;
        oldArray.shift();
        this.setState({ articles: oldArray });
    }

    toggleInfoScreen(){
        console.log('toggle toggleInfoScreen');
        this.setState({infoScreen: !this.state.infoScreen});
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
                <div className='swipe-test__buttons'>
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
                    buttonText={`Sluiten`}  />
                }
            </div>
        );
    }
}

export default SwipeTest;