import React from 'react';

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

export const SwipeCard = (props) => {

    const controls = useAnimation();

    function swipeClassifier(i) {
        if (i.offset.x >= 250) {
            controls.start({
                x: '1000px',
                transition: { duration: 0.6 },
            });
            setTimeout(() => {
                props.swipeRight();
            }, 600);
        } else if (i.offset.x <= -250) {
            controls.start({
                x: '-1000px',
                transition: { duration: 0.6 },
            });
            setTimeout(() => {
                props.swipeLeft();
            }, 600);
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

    return (
        <motion.div
            drag={props.disabled}
            className="c-swipe-card"
            id={props.id}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(e, i) => {
                swipeClassifier(i);
            }}
            animate={controls}
            style={{ x, backgroundColor, rotate }}
        >
            <h1 className="swipe-card__heading">{props.title}</h1>
        </motion.div>
    )
}

export default SwipeCard;