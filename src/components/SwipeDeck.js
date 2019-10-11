import React, { Component } from 'react';

class SwipeDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderCard: true
        };
        this.toggleCard = this.toggleCard.bind(this);

        this.state = ({
            cards: []
        });
    }

    componentDidMount() {
        this.setState({
            cards: this.props.children
        })
    }

    toggleCard() {
        this.setState({ renderCard: !this.state.renderCard });
    }

    render() {
        const { renderCard } = this.state;
        console.log('render', renderCard);

        return (
            <div className="c-swipe-deck">
                {this.state.cards}
            </div>
        );
    }
}

export default SwipeDeck;