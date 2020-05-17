import React, { memo } from 'react';
import { Box, Button, Container } from '@material-ui/core';

import { useModal } from 'client/hooks';
import { ContainerBox } from 'components/common';

import { NewsPostModal, PerformancePostModal } from '../../modals';
import { useStyles } from './styles';


const AdminPage = () => {
    const styles = useStyles();
    const [isOpenNewsPostModal, openNewsPostModal, closeNewsPostModal] = useModal();
    const [isOpenPerformancePostModal, openPerformancePostModal, closePerformancePostModal] = useModal();

    return (
        <Container className={styles.adminPage}>
            <Box mb={2}>Админка!!!</Box>
            <ContainerBox>
                <Button color="secondary" size="large" variant="outlined" onClick={openNewsPostModal}>
                    Создать новость
                </Button>
            </ContainerBox>
            <ContainerBox>
                <Button color="secondary" size="large" variant="outlined" onClick={openPerformancePostModal}>
                    Создать пост с выступлением
                </Button>
            </ContainerBox>

            {isOpenNewsPostModal && (
                <NewsPostModal isOpen={isOpenNewsPostModal} close={closeNewsPostModal} />
            )}
            {isOpenPerformancePostModal && (
                <PerformancePostModal isOpen={isOpenPerformancePostModal} close={closePerformancePostModal} />
            )}
        </Container>
    );
};

export default memo(AdminPage);
