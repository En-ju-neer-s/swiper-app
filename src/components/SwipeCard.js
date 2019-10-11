import React from 'react';

import { motion, useMotionValue, useTransform } from "framer-motion";

export const SwipeCard = (props) => {

    function swipeClassifier(e, i) {
        if (i.offset.x >= 250) {
            console.log(false);
            // props.unmountCard();
        } else if (i.offset.x <= -250) {
            console.log(true);
            // props.unmountCard();
        }
    }

    const x = useMotionValue(0);
    const xInput = [-200, 0, 200];
    const backgroundColor = useTransform(x, xInput, [
        "#FFDCDC",
        "#FFFFFF",
        "#E6F4DC"
    ]);
    const rotate = useTransform(x, xInput, [-45, 0, 45]);

    // const card =
    console.log('disabled?', props.disabled)
    return (
        <motion.div
            drag={props.disabled}
            className="c-swipe-card"
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDrag={(e, i) => {
                swipeClassifier(e, i);
            }}
            style={{ x, backgroundColor, rotate }}
        >
            {props.children}
        </motion.div>
    )
}

export default SwipeCard;