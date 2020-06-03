import { Box, IconButton, Modal as MaterialUIModal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { memo } from 'react';

import { useStyles } from './styles';


interface Props {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    close(): void;
    width?: string;
}

export const Modal = memo(({ isOpen, close, title, children, width = '100%' }: Props) => {
    const styles = useStyles();

    return (
        <MaterialUIModal
            className={styles.modal}
            open={isOpen}
            disableScrollLock
            onClose={close}
        >
            <Box width={width} className={styles.modalForm}>
                <Box position="relative" color="primary.contrastText" bgcolor="primary.main">
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
                <Box pt={5} px={3} pb={3}>
                    {children}
                </Box>
            </Box>
        </MaterialUIModal>
    );
});

export default Modal;
