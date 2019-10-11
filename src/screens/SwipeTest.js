import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';
// import Axios from 'axios';

class SwipeTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            articles: []
        });

        this.updateArticles = this.updateArticles.bind(this);

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
                { title: 'Lorem ipsum', id: '12h3jk1jj2' },
                { title: 'Lorem ipsum', id: '2241ff121d' },
                { title: 'Lorem ipsum', id: '3j1h23jk1j' },
                { title: 'Lorem ipsum', id: '4212t44423' },
                { title: 'Lorem ipsum', id: '52k3lklk42' }
            ]
        });
    }

    updateArticles() {
        console.log('updateArticles')
        let oldArray = this.state.articles;
        oldArray.shift();
        this.setState({ articles: oldArray })
    }

    render() {
        const { articles } = this.state;
        console.log('articles', articles);

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
                        onClick={() => { this.updateArticles() }} />
                    <Button
                        color='green'
                        large={true}
                        icon='ok'
                        onClick={() => { this.updateArticles() }} />
                </div>
            </div>
        );
    }
}

export default SwipeTest;