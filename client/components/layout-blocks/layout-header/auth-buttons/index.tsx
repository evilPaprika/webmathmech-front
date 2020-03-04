import React, { useCallback, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';

import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from '../../../../apollo/queries';
import AuthModal from '../../../auth-modal';


export const AuthButtons = () => {
    const [openAuthModal, setOpen] = useState(false);
    const { data: { isLoggedIn }, client } = useQuery<any>(GET_IS_LOGGED_IN);
    const { data, refetch } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'no-cache' });
    refetch(); // TODO вызывать только при логине/регистрации

    const openModal = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const closeModal = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });
    }, [client]);

    return (
        <>
            <AuthModal open={openAuthModal} close={closeModal} />
            {isLoggedIn
                ? <Button color="primary" onClick={signOut}>Выйти {data?.getCurrentUser.login}</Button>
                : <Button onClick={openModal} color="inherit">Войти</Button>}
        </>
    );
};
