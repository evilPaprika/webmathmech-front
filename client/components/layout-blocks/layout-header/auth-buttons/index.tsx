import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Container, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from 'apollo/queries';
import { AuthModal } from 'client/components/modals';
import { MENU_OPTIONS, ROUTES } from 'client/consts';
import { useMenu, useModal } from 'client/hooks';
import { IsLoggedInData, UserData } from 'client/types';
import { useStyles } from './styles';


const MAX_USER_NAME_LENGTH_IN_HEADER = 25;

export const AuthButtons = () => {
    const styles = useStyles();

    const [isOpenAuthModal, openAuthModal, closeAuthModal] = useModal();
    const [anchorEl, openMenu, closeMenu] = useMenu();

    const { data: { isLoggedIn } = {}, client } = useQuery<IsLoggedInData>(GET_IS_LOGGED_IN);
    const { data, refetch, error } = useQuery<UserData>(GET_CURRENT_USER);
    const { avatar, name, surname } = data?.getCurrentUser || {};
    const showSurname = `${name} ${surname}`.length < MAX_USER_NAME_LENGTH_IN_HEADER;

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });

        refetch();
    }, [client]);

    if (error?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
        signOut();
    }

    return (
        <Container className={styles.wrapper} maxWidth={false} disableGutters>
            <AuthModal isOpen={isOpenAuthModal} close={closeAuthModal} refetch={refetch} />
            {isLoggedIn ? (
                <>
                    <Button aria-controls="user-menu" color="inherit" onClick={openMenu}>
                        <Typography className={styles.login}>
                            {name} {showSurname && surname}
                        </Typography>
                        {avatar
                            ? <Avatar alt="avatar" src={avatar} />
                            : <AccountCircle />}
                    </Button>
                    <Menu
                        id="user-menu"
                        className={styles.menu}
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        disableScrollLock
                        onClose={closeMenu}
                        onClick={closeMenu}
                    >
                        {MENU_OPTIONS.map(({ label, value }) => (
                            <MenuItem key={label} component={Link} to={value}>{label}</MenuItem>
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
