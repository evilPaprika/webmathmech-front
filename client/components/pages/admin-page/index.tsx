import React, { memo } from 'react';
import { Box, Container } from '@material-ui/core';

import { useStyles } from './styles';


const AdminPage = () => {
    const styles = useStyles();

    return (
        <Container className={styles.adminPage}>
            <Box>Админка!!!</Box>
        </Container>
    );
};

export default memo(AdminPage);
