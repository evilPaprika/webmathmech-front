import React, { memo } from 'react';
import { Box, Button, Container } from '@material-ui/core';

import { useModal } from 'client/hooks';
import { CreateNewsPostModal } from '../../modals';
import { useStyles } from './styles';


const AdminPage = () => {
    const styles = useStyles();
    const [isOpenNewsPostModal, openCreateNewsPostModal, closeCreateNewsPostModal] = useModal();

    return (
        <Container className={styles.adminPage}>
            <Box mb={2}>Админка!!!</Box>
            <Button color="secondary" size="large" variant="outlined" onClick={openCreateNewsPostModal}>
                Создать новость
            </Button>
            <CreateNewsPostModal isOpen={isOpenNewsPostModal} close={closeCreateNewsPostModal} />
        </Container>
    );
};

export default memo(AdminPage);
