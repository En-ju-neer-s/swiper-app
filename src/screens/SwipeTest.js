import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';

function SwipeTest() {
    return (
        <div className="swipe-test">
            <SwipeDeck>
                <SwipeCard disabled/>
                <SwipeCard />
            </SwipeDeck>
        </div>
    );
}

export default SwipeTest;