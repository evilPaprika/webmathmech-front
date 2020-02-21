import React, { memo } from 'react';
import { Box, Container } from '@material-ui/core';

import { useStyles } from './styles';
import { AuthButtons } from './AuthButtons';


const LayoutHeader = () => {
    const styles = useStyles();

    return (
        <Container className={styles.layoutHeader} maxWidth={false}>
            <Box className={styles.layoutHeader__content}>
                <Box>site logo</Box>
                <Box>site tabs</Box>
                <AuthButtons />
            </Box>

        </Container>
    );
};

export default memo(LayoutHeader);
