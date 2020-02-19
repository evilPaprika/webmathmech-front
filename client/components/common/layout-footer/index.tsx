import React, { memo } from 'react';
import { Box } from '@material-ui/core';

import { useStyles } from './styles';


const LayoutFooter = () => {
    const styles = useStyles();

    return (
        <Box className={styles.layoutFooter}>
            <Box className={styles.layoutFooter__text}>
                This is footer!
            </Box>
        </Box>
    );
};

export default memo(LayoutFooter);
