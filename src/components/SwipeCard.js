import React from 'react';

import { motion, useMotionValue, useTransform } from "framer-motion";
import { identifier } from '@babel/types';

export const SwipeCard = () => {
    function swipeClassifier(e, i){
        if (i.offset.x >= 250) {
            console.log(false)
        } else if (i.offset.x <= -250) {
            console.log(true);
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
            drag
            className="c-swipe-card"
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            style={{ x, backgroundColor, rotate }}
            onDrag={(e, i) => {
                swipeClassifier(e,i)
            }}
        >
        </motion.div>
    )
}

export default SwipeCard;