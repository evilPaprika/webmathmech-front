import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Box, Typography } from '@material-ui/core';

import { USER_SIGNIN, USER_SIGNUP } from 'apollo/mutations';
import { AuthMethods } from 'client/types';
import { AsyncButton, ContainerBox, LabeledInput, Modal, SnackbarErrorText } from 'components/common';

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
    const { enqueueSnackbar } = useSnackbar();

    const [authState, setAuthState] = useState<ModalState>(DEFAULT_STATE);
    const { name, surname, login, password, loginMethod } = authState;

    const isSignUpMethod = loginMethod === AuthMethods.SignUp;

    const onClose = () => {
        setAuthState(DEFAULT_STATE);

        close();
    };

    const client = useApolloClient();

    const [userAuth, { loading }] = useMutation(
        isSignUpMethod ? USER_SIGNUP : USER_SIGNIN,
        {
            onCompleted(response) {
                const { token }: { token: string } = isSignUpMethod ? response.userSignUp : response.userSignIn;
                localStorage.setItem('token', token);
                client.writeData({ data: { isLoggedIn: true } });

                refetch();
                onClose();
            },
            onError: (error: ApolloError) => {
                const title = 'Произошла ошибка. Проверьте введенные данные';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            }
        }
    );

    const submit = useCallback(() => {
        const variables = isSignUpMethod
            ? { login, password, name, surname }
            : { login, password };

        userAuth({ variables });
    }, [userAuth, login, password, name, surname]);

    const onEnterPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.charCode === 13) {
            submit();
        }
    }, [submit]);

    const changeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAuthState((prevState) => ({ ...prevState, name: event.target.value }));
    }, []);

    const changeSurname = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAuthState((prevState) => ({ ...prevState, surname: event.target.value }));
    }, []);

    const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAuthState((prevState) => ({ ...prevState, login: event.target.value }));
    }, []);

    const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setAuthState((prevState) => ({ ...prevState, password: event.target.value }));
    }, []);

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
            width="400px"
        >
            {isSignUpMethod && (
                <ContainerBox display="flex">
                    <Box mr="5px">
                        <LabeledInput
                            value={name}
                            label="Имя"
                            size="small"
                            onChange={changeName}
                        />
                    </Box>
                    <Box ml="5px">
                        <LabeledInput
                            value={surname}
                            label="Фамилия"
                            size="small"
                            onChange={changeSurname}
                        />
                    </Box>
                </ContainerBox>
            )}
            <ContainerBox>
                <LabeledInput
                    value={login}
                    label="Логин"
                    size="small"
                    helperText="Логин должен быть длиной от 4 до 16 символов"
                    onChange={changeLogin}
                />
                <LabeledInput
                    value={password}
                    type="password"
                    label="Пароль"
                    size="small"
                    helperText="Пароль должен быть длиной от 8 до 64 символов"
                    onChange={changePassword}
                    onKeyPress={onEnterPress}
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
