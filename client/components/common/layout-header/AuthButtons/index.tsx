import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AuthMethods } from '../../../../types';
import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from '../../../../apollo/queries';
import AuthModal from '../../../auth-modal';


export const AuthButtons = () => {
    const [openAuthModal, setOpen] = useState(false);
    const [loginMethod, setLoginMethod] = useState(AuthMethods.SignIn);
    const { data: { isLoggedIn }, client } = useQuery<any>(GET_IS_LOGGED_IN);
    const { data, refetch } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'no-cache' });
    refetch(); // TODO вызывать только при логине/регистрации

    const openSignUpModal = () => {
        setLoginMethod(AuthMethods.SignUp);
        setOpen(true);
    };

    const openSignInModal = () => {
        setLoginMethod(AuthMethods.SignIn);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const SignOut = () => {
        localStorage.removeItem('token');
        client.writeData({ data: { isLoggedIn: false } });
    };

    return (
        <>
            <AuthModal open={openAuthModal} loginMethod={loginMethod} close={closeModal} />
            <ButtonGroup variant="contained" color="primary">
                {isLoggedIn
                    ? <Button color="primary" onClick={SignOut}>Выйти {data?.getCurrentUser.login}</Button>
                    : [
                        <Button color="primary" onClick={openSignInModal} key="signin">Войти</Button>,
                        <Button color="primary" onClick={openSignUpModal} key="signup">Зарегистрироваться</Button>
                    ]}
            </ButtonGroup>
        </>
    );
};
