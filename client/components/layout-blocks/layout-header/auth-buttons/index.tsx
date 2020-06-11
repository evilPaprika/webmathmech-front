import { useQuery } from '@apollo/react-hooks';
import { Badge, Button, Container, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { GET_ACTIVE_POLLS, GET_CURRENT_USER, GET_IS_LOGGED_IN } from '_apollo/queries';
import { PERSONAL_TABS, ROUTES } from '_client/consts';
import { useMenu, useModal } from '_client/hooks';
import { GetActivePerformancePostsCountData, IsLoggedInData, User, UserData } from '_client/types';
import { getFullName } from '_client/utils';

import { ActivePollsModal } from './active-polls-modal';
import { AuthModal } from './auth-modal';
import { useStyles } from './styles';


const MAX_USER_NAME_LENGTH_IN_HEADER = 25;

const getUsername = (user: User) => {
    const { name, surname } = user;

    if (!name && !surname) {
        return '';
    }

    const isSurnameShown = getFullName(user).length < MAX_USER_NAME_LENGTH_IN_HEADER;

    return `${name} ${isSurnameShown && surname}`.trim();
};

export const AuthButtons = () => {
    const styles = useStyles();

    const [isOpenAuthModal, openAuthModal, closeAuthModal] = useModal();
    const [anchorEl, openMenu, closeMenu] = useMenu();
    const [isOpenActivePollsModal, openActivePollsModal, closeActivePollsModal] = useModal();

    const { data: { isLoggedIn } = {}, client } = useQuery<IsLoggedInData>(GET_IS_LOGGED_IN);
    const { data, refetch: refetchCurrentUser, error } = useQuery<UserData>(GET_CURRENT_USER);
    const user = data?.getCurrentUser || {} as User;

    const { data: activePollsData, refetch: refetchActivePolls } = useQuery<GetActivePerformancePostsCountData>(
        GET_ACTIVE_POLLS
    );
    const noVotePostsCount = activePollsData?.getActivePerformancePostsCount || 0;

    const onRefetch = () => {
        refetchCurrentUser();
        refetchActivePolls();
    };

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });
        client.writeQuery({
            query: GET_CURRENT_USER,
            data: { getCurrentUser: null }
        });
    }, [client]);

    if (error?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
        signOut();
    }

    return (
        <Container className={styles.wrapper} maxWidth={false} disableGutters>
            <AuthModal isOpen={isOpenAuthModal} close={closeAuthModal} refetch={onRefetch} />
            {isLoggedIn ? (
                <>
                    <Button aria-controls="user-menu" color="inherit" onClick={openMenu}>
                        <Typography className={styles.username}>
                            {getUsername(user)}
                        </Typography>
                        <AccountCircle />
                    </Button>
                    <IconButton color="inherit" onClick={openActivePollsModal}>
                        <Badge badgeContent={noVotePostsCount} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <ActivePollsModal isOpen={isOpenActivePollsModal} close={closeActivePollsModal} />
                    <Menu
                        id="user-menu"
                        className={styles.menu}
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        disableScrollLock
                        onClose={closeMenu}
                        onClick={closeMenu}
                    >
                        {PERSONAL_TABS.map(({ label, value }) => (
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
