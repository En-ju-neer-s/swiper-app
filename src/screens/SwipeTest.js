import React from 'react';
import SwipeDeck from '../components/SwipeDeck';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';
import Header from '../components/Header';

function SwipeTest() {
    return (
        <div className='s-swipe-test'>
            <Header title='Vind je dit clickbait?' />
            <SwipeDeck>
                <SwipeCard disabled />
                <SwipeCard />
            </SwipeDeck>
            <div className='swipe-test__buttons'>
                <Button color='red' large={true} icon='cancel' />
                <Button color='green' large={true} icon='ok' />
            </div>
        </div>
    );
}

export default SwipeTest;