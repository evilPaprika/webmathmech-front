import React, { memo, useState } from 'react';
import { Box, Button, ButtonGroup, Container } from '@material-ui/core';

import { AuthMethods } from '../../../types';
import AuthModal from '../../auth-modal';
import cssStyles from './index.css';

const LayoutHeader = () => {
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
        <Container className={cssStyles.layoutHeader}>
            <AuthModal open={openAuthModal} loginMethod={loginMethod} close={closeModal} />
            <Container className={cssStyles.layoutHeader__authBlock}>
                <Box>site logo</Box>
                <Box>site tabs</Box>
                <ButtonGroup className={cssStyles.layoutHeader__buttons} variant="contained" color="primary">
                    <Button color="primary" onClick={openSignInModal}>Войти</Button>
                    <Button color="primary" onClick={openSignUpModal}>Зарегистрироваться</Button>
                </ButtonGroup>
            </Container>
        </Container>
    );
};

export default memo(LayoutHeader);
