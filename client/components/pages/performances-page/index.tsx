import React, { memo } from 'react';
import { Box, Container } from '@material-ui/core';

import { useStyles } from './styles';


const PerformancesPage = () => {
    const styles = useStyles();

    return (
        <Container className={styles.performancesPage}>
            <Box>Страница с выступлениями!!!</Box>
        </Container>
    );
};

export default memo(PerformancesPage);
