import React, { memo } from 'react';
import { Box, Button, Container } from '@material-ui/core';

import { useModal } from 'client/hooks';
import CreateNewsPostModal from '../../modals/create-news-post-modal';
import { useStyles } from './styles';


const AdminPage = () => {
    const styles = useStyles();
    const [isOpenedNewsPostModal, openCreateNewsPostModal, closeCreateNewsPostModal] = useModal();

    return (
        <Container className={styles.adminPage}>
            <Box mb={2}>Админка!!!</Box>
            <Button color="secondary" size="large" variant="outlined" onClick={openCreateNewsPostModal}>
                Создать новость
            </Button>
            <CreateNewsPostModal isOpened={isOpenedNewsPostModal} close={closeCreateNewsPostModal} />
        </Container>
    );
};

export default memo(AdminPage);
