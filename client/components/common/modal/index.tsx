import React, { memo } from 'react';
import { Box, Container, IconButton, Modal as MaterialUIModal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styles';


interface Props {
    title: string;
    children: React.ReactNode;
    isOpened: boolean;
    close(): void;
}

const Modal = ({ isOpened, close, title, children }: Props) => {
    const styles = useStyles();

    return (
        <MaterialUIModal
            className={styles.modal}
            open={isOpened}
            disableScrollLock
            onClose={close}
        >
            <Container className={styles.modalForm} disableGutters>
                <Box position="relative" color="primary.contrastText" bgcolor="primary.main" mb="40px">
                    <Box p={3}>
                        <Typography variant="h5">
                            {title}
                        </Typography>
                    </Box>
                    <Box position="absolute" top="0" right="0">
                        <IconButton className={styles.close} onClick={close}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                {children}
            </Container>
        </MaterialUIModal>
    );
};

export default memo(Modal);
