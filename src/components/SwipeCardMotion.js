import React from 'react';

import { motion, useMotionValue, useTransform } from "framer-motion";

export const SwipeCard = (props) => {

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
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            style={{ x, backgroundColor, rotate }}
        >
            {props.children}
        </motion.div>
    )
}

export default SwipeCard;