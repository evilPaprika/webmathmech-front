import React, { memo, useCallback, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Box, Button, Container, IconButton, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { USER_SIGNIN, USER_SIGNUP } from '../../apollo/mutations';
import { AuthMethods } from '../../types';
import LabeledInput from '../common/labeled-input';
import { useStyles } from './styles';


interface Props {
    open: boolean;
    close(): void;
    refetch(): void;
}

interface AuthState {
    name?: string;
    surname?: string;
    login: string;
    password: string;
    loginMethod: AuthMethods;
}

const DEFAULT_STATE: AuthState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    loginMethod: AuthMethods.SignIn,
};

const AuthModal = ({ open, close, refetch }: Props) => {
    const styles = useStyles();

    const [authState, setAuthState] = useState<AuthState>(DEFAULT_STATE);
    const { name, surname, login, password, loginMethod } = authState;

    const isSignUpMethod = loginMethod === AuthMethods.SignUp;

    const onClose = () => {
        setAuthState(DEFAULT_STATE);

        close();
    };

    const client = useApolloClient();

    const [userAuth, { loading, error }] = useMutation(
        isSignUpMethod ? USER_SIGNUP : USER_SIGNIN,
        {
            onCompleted(response) {
                const { token }: { token: string; } = isSignUpMethod ? response.userSignUp : response.userSignIn;
                localStorage.setItem('token', token);
                client.writeData({ data: { isLoggedIn: true } });

                refetch();
                onClose();
            }
        }
    );

    const submit = useCallback(() => {
        const variables = isSignUpMethod
            ? { login, password, name, surname }
            : { login, password };

        userAuth({ variables });
    }, [userAuth, login, password, name, surname]);

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthState({
            ...authState,
            name: event.target.value
        });
    };

    const changeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthState({
            ...authState,
            surname: event.target.value
        });
    };

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthState({
            ...authState,
            login: event.target.value
        });
    };

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthState({
            ...authState,
            password: event.target.value
        });
    };

    const changeLoginMethod = useCallback(() => {
        setAuthState({
            ...authState,
            loginMethod: isSignUpMethod ? AuthMethods.SignIn : AuthMethods.SignUp
        });
    }, [isSignUpMethod]);

    return (
        <Modal
            className={styles.modal}
            open={open}
            disableScrollLock
            onClose={onClose}
        >
            <Container className={styles.modalForm} disableGutters>
                <Box position="relative" color="primary.contrastText" bgcolor="primary.main" mb="40px">
                    <Box p={3}>
                        <Typography variant="h5">
                            {isSignUpMethod ? 'Регистрация' : 'Вход'}
                        </Typography>
                    </Box>
                    <Box position="absolute" top="0" right="0">
                        <IconButton className={styles.close} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                {isSignUpMethod && (
                    <Box px="24px" display="flex">
                        <Box mr="5px">
                            <LabeledInput
                                size="small"
                                label="Имя"
                                value={name}
                                onChange={changeName}
                            />
                        </Box>
                        <Box ml="5px">
                            <LabeledInput
                                size="small"
                                label="Фамилия"
                                value={surname}
                                onChange={changeSurname}
                            />
                        </Box>
                    </Box>
                )}
                <Box px="24px" mb="20px">
                    <LabeledInput
                        size="small"
                        label="Логин"
                        value={login}
                        onChange={changeLogin}
                        helperText="Логин должен быть длиной от 4 до 16 символов"
                    />
                    <LabeledInput
                        size="small"
                        type="password"
                        label="Пароль"
                        value={password}
                        onChange={changePassword}
                        helperText="Пароль должен быть длиной от 8 до 64 символов"
                    />
                </Box>
                <Box px="24px" mb="40px">
                    <Button size="large" fullWidth variant="outlined" color="secondary" onClick={submit}>
                        {isSignUpMethod ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    {loading && <div>Обработка</div>}
                    {error && <div className={styles.error}>Произошла ошибка, проверьте введенные данные</div>}
                </Box>
                <Box px="24px" mb="40px">
                    <Typography component="span">
                        {isSignUpMethod ? 'Уже зарегистрировались?' : 'Еще нет аккаунта?'}{' '}
                    </Typography>
                    <Typography
                        className={styles.textPointer}
                        component="span"
                        onClick={changeLoginMethod}
                        color="secondary"
                    >
                        {isSignUpMethod ? 'Войдите в аккаунт' : 'Зарегистрируйтесь'}
                    </Typography>
                </Box>
            </Container>
        </Modal>
    );
};

export default memo(AuthModal);
