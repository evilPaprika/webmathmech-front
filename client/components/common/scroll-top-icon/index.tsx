import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { memo } from 'react';

import { useStyles } from './styles';


export const ScrollTopIcon = memo(() => {
    const styles = useStyles();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Zoom in={trigger}>
            <div onClick={scrollToTop} role="presentation" className={styles.icon}>
                <Fab color="primary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </Zoom>
    );
});

export default ScrollTopIcon;
