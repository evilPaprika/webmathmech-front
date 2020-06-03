import { Box, Button, Container } from '@material-ui/core';
import React, { memo } from 'react';

import { useModal } from '_client/hooks';
import { ContainerBox, NewsPostModal, PerformancePostModal } from '_components/common';


const AdminPage = () => {
    const [isOpenNewsPostModal, openNewsPostModal, closeNewsPostModal] = useModal();
    const [isOpenPerformancePostModal, openPerformancePostModal, closePerformancePostModal] = useModal();

    return (
        <Container>
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

            {isOpenNewsPostModal && <NewsPostModal isOpen={isOpenNewsPostModal} close={closeNewsPostModal} />}
            {isOpenPerformancePostModal && (
                <PerformancePostModal isOpen={isOpenPerformancePostModal} close={closePerformancePostModal} />
            )}
        </Container>
    );
};

export default memo(AdminPage);
