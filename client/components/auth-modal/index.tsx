import React, { memo, useCallback, useState } from 'react';
import { Button, Modal } from '@material-ui/core';

import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { AuthMethods } from '../../types';
import LabeledInput from '../common/labeled-input';
import LayoutGroup from '../common/layout-group';
import { useStyles } from './styles';
import { USER_SIGNIN, USER_SIGNUP } from '../../apollo/mutations';


interface Props {
    open: boolean;
    loginMethod: AuthMethods;
    close(): void;
}

const AuthModal = ({ open, loginMethod, close }: Props) => {
    const styles = useStyles();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const isSignUpMethod = loginMethod === AuthMethods.SignUp;

    const client: ApolloClient<any> = useApolloClient();
    const [userAuth, { loading, error }] = useMutation<any>(
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
    }, [isSignUpMethod, login, password]);

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <Modal
            closeAfterTransition
            open={open}
            onClose={close}
            className={styles.modal}
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
                {loading && <div> Обработка </div>}
                {error && <div className={styles.error}>Произошла ошибка, проверте введеные данные</div>}
            </form>
        </Modal>
    );
};

export default memo(AuthModal);
