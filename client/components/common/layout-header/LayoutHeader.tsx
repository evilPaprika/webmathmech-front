import React, { memo, useState } from 'react';
import { Box, Button, ButtonGroup, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthModal from '../../auth-modal';

const useStyles = makeStyles({
    layoutHeader: {
        height: '60px',

        display: 'flex',

        padding: '10px',

        borderBottom: '1px solid grey'
    },
    authBlock: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttons: {
        height: '40px'
    }
});

const LayoutHeader = () => {
    const styles = useStyles();
    const [openAuthModal, setOpen] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    const openSignUpModal = () => {
        setOpen(true);
        setIsNewUser(true);
    };

    const openSignInModal = () => {
        setOpen(true);
        setIsNewUser(false);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <Container className={styles.layoutHeader}>
            <AuthModal open={openAuthModal} isNewUser={isNewUser} close={closeModal} />
            <Container className={styles.authBlock}>
                <Box>site logo</Box>
                <Box>site tabs</Box>
                <ButtonGroup className={styles.buttons} variant="contained" color="primary">
                    <Button color="primary" onClick={openSignInModal}>Войти</Button>
                    <Button color="primary" onClick={openSignUpModal}>Зарегистрироваться</Button>
                </ButtonGroup>
            </Container>
        </Container>
    );
};

export default memo(LayoutHeader);
