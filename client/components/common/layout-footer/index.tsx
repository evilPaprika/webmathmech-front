import React, { memo } from 'react';
import { Box } from '@material-ui/core';

import cssStyles from './index.css';

const LayoutFooter = () => {
    return (
        <Box className={cssStyles.layoutFooter}>
            <Box className={cssStyles.layoutFooter__text}>
                This is footer!
            </Box>
        </Box>
    );
};

export default memo(LayoutFooter);
