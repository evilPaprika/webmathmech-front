import { Box, Dialog, DialogContent, DialogProps, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { memo } from 'react';

import { useStyles } from './styles';


interface Props {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    close(): void;
    maxWidth?: DialogProps['maxWidth'];
}

export const Modal = memo(({ isOpen, close, title, children, maxWidth }: Props) => {
    const styles = useStyles();

    return (
        <Dialog
            open={isOpen}
            maxWidth={maxWidth}
            PaperProps={{ className: styles.modalPaper }}
            fullWidth
            scroll="body"
            onClose={close}
        >
            <DialogTitle className={styles.header}>
                <Box py={2}>
                    <Typography variant="h5">
                        {title}
                    </Typography>
                </Box>
                <Box position="absolute" top="0" right="0">
                    <IconButton color="inherit" onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent className={styles.content}>
                <Box mt={5}>
                    {children}
                </Box>
            </DialogContent>
        </Dialog>
    );
});

export default Modal;
