import React from 'react';
import SwipeCard from '../components/SwipeCard';
import Button from '../components/Button';

function SwipeTest() {
    return (
        <div className='s-swipe-test'>
            <SwipeCard />
            <div className='swipe-test__buttons'>
                <Button color='red' large={true} icon='remove' />
                <Button color='green' large={true} icon='check' />
            </div>
        </div>
    );
}

export default SwipeTest;