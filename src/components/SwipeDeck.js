import React, { Component } from 'react';
import SwipeCard from './SwipeCard'

class SwipeDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderCard: true
        };
        this.removeCard = this.removeCard.bind(this);
    }

    removeCard() {
        this.setState({ renderCard: false });
    }

    render() {
        const { renderCard } = this.state;
        console.log('render', renderCard);

        return (
            <div className="swipe-deck">
                {renderCard ?
                    <SwipeCard unmountCard={this.removeCard}>Test</SwipeCard>
                    :
                    <span>removed</span>
                }
            </div>
        );
    }
}

export default SwipeDeck;