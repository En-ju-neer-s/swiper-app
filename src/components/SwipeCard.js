import React from 'react';

import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import arrow from '../assets/images/arrow-black.svg';

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

    function buttonClick(answer) {
        if (answer === 'yes') {
            controls.start({
                x: '1000px',
                transition: { duration: 0.6 },
            });
            setTimeout(() => {
                props.swipeRight();
            }, 600);
        } else {
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
        "#FFD747",
        "#FFFFFF",
        "#26BFBF"
    ]);
    const rotate = useTransform(x, xInput, [-45, 0, 45]);

    const widthJa = useTransform(x, xInput, ["0%", "50%", "100%"]);
    const widthNee = useTransform(x, xInput, ["100%", "50%", "0%"]);

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
            <div className="swipe-card__heading">
                <h1>{props.title}</h1>
            </div>
            <div className="swipe-card__buttons">
                <motion.div
                    style={{ width: widthNee }}
                    className="swipe-card__button swipe-card__button--nee"
                    onClick={() => { buttonClick('no') }}>
                    <span>Nee</span>
                </motion.div>
                <motion.div
                    style={{ width: widthJa }}
                    className="swipe-card__button swipe-card__button--ja"
                    onClick={() => { buttonClick('yes') }}>
                    <span>Ja</span>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default SwipeCard;