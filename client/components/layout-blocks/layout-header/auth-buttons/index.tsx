import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Container, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from 'apollo/queries';
import { AuthModal } from 'client/components/modals';
import { MENU_ITEMS, ROUTES } from 'client/consts';
import { useMenu, useModal } from 'client/hooks';
import { useStyles } from './styles';


const MAX_USER_NAME_LENGTH_IN_HEADER = 25;

export const AuthButtons = () => {
    const styles = useStyles();

    const [isOpenAuthModal, openAuthModal, closeAuthModal] = useModal();
    const [anchorEl, openMenu, closeMenu] = useMenu();

    const { data: { isLoggedIn }, client } = useQuery<any>(GET_IS_LOGGED_IN);
    const { data, refetch, error } = useQuery(GET_CURRENT_USER);
    const { avatar, name, surname } = data?.getCurrentUser || {};

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });

        refetch();
    }, [client]);

    if (error?.graphQLErrors[0].extensions?.code === 'UNAUTHENTICATED') {
        signOut();
    }

    return (
        <Container className={styles.authButtons__wrapper} maxWidth={false} disableGutters>
            <AuthModal isOpen={isOpenAuthModal} close={closeAuthModal} refetch={refetch} />
            {isLoggedIn ? (
                <>
                    <Button aria-controls="user-menu" color="inherit" onClick={openMenu}>
                        <Typography className={styles.authButtons__login}>
                            {name} {(`${name} ${surname}`).length < MAX_USER_NAME_LENGTH_IN_HEADER && surname}
                        </Typography>
                        {avatar
                            ? <Avatar alt="avatar" src={data?.getCurrentUser.avatar} />
                            : <AccountCircle />}
                    </Button>
                    <Menu
                        id="user-menu"
                        className={styles.authButtons__menu}
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        disableScrollLock
                        onClose={closeMenu}
                        onClick={closeMenu}
                    >
                        {MENU_ITEMS.map(({ text, path }) => (
                            <MenuItem key={text} component={Link} to={path}>{text}</MenuItem>
                        ))}
                        <MenuItem component={Link} to={ROUTES.NEWS} onClick={signOut}>
                            Выйти
                        </MenuItem>
                    </Menu>
                </>
            ) : <Button color="inherit" onClick={openAuthModal}>Войти</Button>}
        </Container>
    );
};
