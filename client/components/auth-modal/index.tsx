import React, { memo, useCallback, useState } from 'react';
import { Button, Modal, Typography } from '@material-ui/core';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import { AuthMethods } from '../../types';
import LabeledInput from '../common/labeled-input';
import LayoutGroup from '../common/layout-group';
import { useStyles } from './styles';
import { USER_SIGNIN, USER_SIGNUP } from '../../apollo/mutations';


interface Props {
    open: boolean;
    close(): void;
}

const AuthModal = ({ open, close }: Props) => {
    const styles = useStyles();

    const [loginMethod, setLoginMethod] = useState(AuthMethods.SignIn);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const isSignUpMethod = loginMethod === AuthMethods.SignUp;

    const client = useApolloClient();

    const [userAuth, { loading, error }] = useMutation(
        isSignUpMethod ? USER_SIGNUP : USER_SIGNIN,
        {
            onCompleted(response) {
                const { token } = isSignUpMethod ? response.userSignUp : response.userSignIn;
                localStorage.setItem('token', token as string);
                client.writeData({ data: { isLoggedIn: true } });
            }
        }
    );

    const submit = useCallback(() => {
        userAuth({ variables: { login, password } });
    }, [userAuth, login, password]);

    const changeLogin = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }, [setLogin]);

    const changePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, [setPassword]);

    const changeLoginMethod = useCallback(() => {
        if (isSignUpMethod) {
            setLoginMethod(AuthMethods.SignIn);
        } else {
            setLoginMethod(AuthMethods.SignUp);
        }
    }, [isSignUpMethod]);

    return (
        <Modal
            className={styles.modal}
            closeAfterTransition
            open={open}
            disableScrollLock
            onClose={close}
        >
            <form className={styles.modalForm}>
                <LayoutGroup>
                    <h2>{isSignUpMethod ? 'Регистрация' : 'Вход'}</h2>
                </LayoutGroup>
                <LayoutGroup>
                    <LabeledInput
                        label="Логин"
                        type="text"
                        value={login}
                        placeholder="Введите логин"
                        onChange={changeLogin}
                    />
                    <LabeledInput
                        label="Пароль"
                        type="password"
                        value={password}
                        placeholder="Введите пароль"
                        onChange={changePassword}
                    />
                </LayoutGroup>
                <LayoutGroup>
                    <Button variant="contained" color="primary" onClick={submit}>
                        {isSignUpMethod ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </LayoutGroup>
                <Typography component="div" onClick={changeLoginMethod} color="secondary">
                    {isSignUpMethod ? 'Войти' : 'Зарегистрироваться'}
                </Typography>
                {loading && <div>Обработка</div>}
                {error && <div className={styles.error}>Произошла ошибка, проверьте введенные данные</div>}
            </form>
        </Modal>
    );
};

export default memo(AuthModal);
