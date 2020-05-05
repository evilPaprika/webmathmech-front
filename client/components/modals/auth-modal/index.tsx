import React, { memo, useCallback, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Box, Typography } from '@material-ui/core';

import { USER_SIGNIN, USER_SIGNUP } from 'apollo/mutations';
import { AuthMethods } from 'client/types';
import { AsyncButton, ContainerBox, LabeledInput, Modal } from 'components/common';
import { OauthButtons } from './oauth-buttons';
import { useStyles } from './styles';


interface Props {
    isOpen: boolean;
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

export const AuthModal = memo(({ isOpen, close, refetch }: Props) => {
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
                const { token }: { token: string } = isSignUpMethod ? response.userSignUp : response.userSignIn;
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
            isOpen={isOpen}
            close={onClose}
        >
            {isSignUpMethod && (
                <ContainerBox display="flex">
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
                </ContainerBox>
            )}
            <ContainerBox>
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
            </ContainerBox>
            <ContainerBox>
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
            </ContainerBox>
            <Box mb={3}>
                <OauthButtons />
            </Box>
            <Box mb={4}>
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
        </Modal>
    );
});
