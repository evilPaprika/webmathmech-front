import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Avatar, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from '../../../../apollo/queries';
import { ROUTES } from '../../../../consts';
import AuthModal from '../../../auth-modal';
import { useStyles } from './styles';


export const AuthButtons = () => {
    const styles = useStyles();

    const [openAuthModal, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { data: { isLoggedIn }, client } = useQuery<any>(GET_IS_LOGGED_IN);
    const { data, refetch } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'no-cache' });
    const { login, avatar } = data?.getCurrentUser || {};
    refetch(); // TODO вызывать только при логине/регистрации

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });
    }, [client]);

    return (
        <>
            <AuthModal open={openAuthModal} close={closeModal} />
            {isLoggedIn
                ? (
                    <>
                        <Button aria-controls="user-menu" color="inherit" onClick={openMenu}>
                            <Typography className={styles.login}>
                                {login}
                            </Typography>
                            {avatar
                                ? <Avatar alt="avatar" src={data?.getCurrentUser.avatar} />
                                : <AccountCircle />}
                        </Button>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            open={!!anchorEl}
                            onClose={closeMenu}
                            onClick={closeMenu}
                        >
                            <MenuItem component={Link} to={ROUTES.PERSONAL_PAGE}>
                                Мой профиль
                            </MenuItem>
                            <MenuItem onClick={signOut}>Выйти</MenuItem>
                        </Menu>
                    </>
                )
                : <Button color="inherit" onClick={openModal}>Войти</Button>}
        </>
    );
};
