import React, { memo, useCallback, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Box, Typography } from '@material-ui/core';

import { USER_SIGNIN, USER_SIGNUP } from 'apollo/mutations';
import { AuthMethods } from 'client/types';
import AsyncButton from 'components/common/async-button';
import LabeledInput from 'components/common/labeled-input';
import Modal from 'components/common/modal';
import { useStyles } from './styles';


interface Props {
    open: boolean;
    close(): void;
    refetch(): void;
}

interface ModalState {
    name?: string;
    surname?: string;
    login: string;
    password: string;
    loginMethod: AuthMethods;
}

const DEFAULT_STATE: ModalState = {
    name: '',
    surname: '',
    login: '',
    password: '',
    loginMethod: AuthMethods.SignIn,
};

const AuthModal = ({ open, close, refetch }: Props) => {
    const styles = useStyles();

    const [authState, setAuthState] = useState<ModalState>(DEFAULT_STATE);
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
            title={isSignUpMethod ? 'Регистрация' : 'Вход'}
            opened={open}
            close={onClose}
        >
            <>
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
                    <AsyncButton
                        isLoading={loading}
                        size="large"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={submit}
                    >
                        {isSignUpMethod ? 'Зарегистрироваться' : 'Войти'}
                    </AsyncButton>
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
            </>
        </Modal>
    );
};

export default memo(AuthModal);
