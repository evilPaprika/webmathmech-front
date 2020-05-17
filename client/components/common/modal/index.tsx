import React, { memo } from 'react';
import { Box, Container, IconButton, Modal as MaterialUIModal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './styles';


interface Props {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    close(): void;
}

export const Modal = memo(({ isOpen, close, title, children }: Props) => {
    const styles = useStyles();

    return (
        <MaterialUIModal
            className={styles.modal}
            open={isOpen}
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
                <Box px={3} pb={3}>
                    {children}
                </Box>
            </Container>
        </MaterialUIModal>
    );
});

export default Modal;
