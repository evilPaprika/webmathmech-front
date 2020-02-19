import React, { memo, useState } from 'react';
import { Box, Button, ButtonGroup, Container } from '@material-ui/core';

import { AuthMethods } from '../../../types';
import AuthModal from '../../auth-modal';
import { useStyles } from './styles';


const LayoutHeader = () => {
    const styles = useStyles();

    const [openAuthModal, setOpen] = useState(false);
    const [loginMethod, setLoginMethod] = useState(AuthMethods.SignIn);

    const openSignUpModal = () => {
        setOpen(true);
        setLoginMethod(AuthMethods.SignUp);
    };

    const openSignInModal = () => {
        setOpen(true);
        setLoginMethod(AuthMethods.SignIn);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <Container className={styles.layoutHeader} maxWidth={false}>
            <AuthModal open={openAuthModal} loginMethod={loginMethod} close={closeModal} />
            <Box className={styles.layoutHeader__content}>
                <Box>site logo</Box>
                <Box>site tabs</Box>
                <ButtonGroup variant="contained" color="primary">
                    <Button color="primary" onClick={openSignInModal}>Войти</Button>
                    <Button color="primary" onClick={openSignUpModal}>Зарегистрироваться</Button>
                </ButtonGroup>
            </Box>
        </Container>
    );
};

export default memo(LayoutHeader);
