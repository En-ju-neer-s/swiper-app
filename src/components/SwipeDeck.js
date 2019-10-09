import React, { Component } from 'react';
import SwipeCard from './SwipeCard'

class SwipeDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderCard: true
        };
        this.toggleCard = this.toggleCard.bind(this);
    }

    toggleCard() {
        this.setState({ renderCard: !this.state.renderCard });
    }

    render() {
        const { renderCard } = this.state;
        console.log('render', renderCard);

        return (
            <div className="swipe-deck">
                {renderCard ?
                    <SwipeCard unmountCard={this.toggleCard}>Test</SwipeCard>
                    :
                    <span onClick={() => {this.toggleCard()}}>removed</span>
                }
            </div>
        );
    }
}

export default SwipeDeck;