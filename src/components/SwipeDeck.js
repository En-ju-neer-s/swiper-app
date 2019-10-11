import React, { Component } from 'react';

class SwipeDeck extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="c-swipe-deck">
                {this.props.children}
            </div>
        );
    }
}

export default SwipeDeck;