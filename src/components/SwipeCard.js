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
                    console.log(true);
                    props.swipeRight();
                }, 600);
            } else if (i.offset.x <= -250) {
                controls.start({
                    x: '-1000px',
                    transition: { duration: 0.6 },
                });
                setTimeout(() => {
                    console.log(false);
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
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            // onDrag={(e, i) => {
            onDragEnd={(e, i) => {
                swipeClassifier(i);
            }}
            animate={controls}
            style={{ x, backgroundColor, rotate }}
        >
            <h1>{props.title}</h1>
            {props.children}
        </motion.div>
    )
}

export default SwipeCard;