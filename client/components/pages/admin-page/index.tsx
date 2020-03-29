import React, { memo } from 'react';
import { Box, Button, Container } from '@material-ui/core';

import { useModal } from 'client/hooks/use-modal';
import CreateNewsPostModal from '../../create-news-post-modal';
import { useStyles } from './styles';


const AdminPage = () => {
    const styles = useStyles();
    const [open, openCreateNewsPostModal, closeCreateNewsPostModal] = useModal();

    return (
        <Container className={styles.adminPage}>
            <Box mb={2}>Админка!!!</Box>
            <Button color="secondary" size="large" variant="outlined" onClick={openCreateNewsPostModal}>
                Создать новость
            </Button>
            <CreateNewsPostModal open={open} close={closeCreateNewsPostModal} />
        </Container>
    );
};

export default memo(AdminPage);
