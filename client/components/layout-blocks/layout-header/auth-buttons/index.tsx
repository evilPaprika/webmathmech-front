import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Container, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from 'apollo/queries';
import { ROUTES } from 'client/consts';
import { useModal } from 'client/hooks';
import AuthModal from 'client/components/modals/auth-modal';
import { useStyles } from './styles';


export const AuthButtons = () => {
    const styles = useStyles();

    const [isOpenedAuthModal, openAuthModal, closeAuthModal] = useModal();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { data: { isLoggedIn }, client } = useQuery<any>(GET_IS_LOGGED_IN);
    const { data, refetch } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'no-cache' });
    const { login, avatar } = data?.getCurrentUser || {};

    const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });

        refetch();
    }, [client]);

    return (
        <Container className={styles.authButtons__wrapper} maxWidth={false} disableGutters>
            <AuthModal isOpened={isOpenedAuthModal} close={closeAuthModal} refetch={refetch} />
            {isLoggedIn ? (
                <>
                    <Button aria-controls="user-menu" color="inherit" onClick={openMenu}>
                        <Typography className={styles.authButtons__login}>
                            {login}
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
                        <MenuItem component={Link} to={ROUTES.PERSONAL_PAGE}>
                            Мой профиль
                        </MenuItem>
                        <MenuItem onClick={signOut}>Выйти</MenuItem>
                    </Menu>
                </>
            ) : <Button color="inherit" onClick={openAuthModal}>Войти</Button>}
        </Container>
    );
};
