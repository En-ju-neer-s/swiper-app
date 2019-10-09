import React, { Component } from 'react';
import SwipeCardMotion from './SwipeCardMotion';
import { motion } from "framer-motion";

class SwipeCard extends Component {
    constructor(props) {
        super(props);
        this.swipeClassifier = this.swipeClassifier.bind(this);
        console.log(this.props);
    }

    swipeClassifier(e, i) {
        if (i.offset.x >= 250) {
            console.log(false);
            this.props.unmountCard();
        } else if (i.offset.x <= -250) {
            console.log(true);
            this.props.unmountCard();
        }
    }

    render() {

        return (
            <SwipeCardMotion>
                <motion.div
                    // drag
                    // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    className="swipe-card"
                    onDrag={(e, i) => {
                        this.swipeClassifier(e, i);
                    }}
                >
                    test 2
                </motion.div>
            </SwipeCardMotion>
        );
    }
}

export default SwipeCard;