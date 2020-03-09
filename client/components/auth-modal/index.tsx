import React, { memo, useCallback, useState } from 'react';
import { Box, Button, Container, IconButton, Modal, Typography } from '@material-ui/core';
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

    const onClose = () => {
        setLogin('');
        setPassword('');

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

                onClose();
            }
        }
    );

    const submit = useCallback(() => {
        userAuth({ variables: { login, password } });
    }, [userAuth, login, password]);

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const changeLoginMethod = useCallback(() => {
        setLoginMethod(isSignUpMethod ? AuthMethods.SignIn : AuthMethods.SignUp);
    }, [isSignUpMethod]);

    return (
        <Modal
            className={styles.modal}
            open={open}
            disableScrollLock
            onClose={onClose}
        >
            <Box className={styles.modalWrapper}>
                <Box className={styles.close}>
                    <IconButton onClick={onClose}>×</IconButton>
                </Box>
                <Box className={styles.formWrapper}>
                    <Container className={styles.modalForm} disableGutters>
                        <LayoutGroup>
                            <Container component="h2" className={styles.formHeader} disableGutters>
                                {isSignUpMethod ? 'Регистрация' : 'Вход'}
                            </Container>
                        </LayoutGroup>
                        <LayoutGroup margin="medium">
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
                        </LayoutGroup>
                        <LayoutGroup>
                            <Button size="large" fullWidth variant="outlined" color="secondary" onClick={submit}>
                                {isSignUpMethod ? 'Зарегистрироваться' : 'Войти'}
                            </Button>
                            {loading && <div>Обработка</div>}
                            {error && <div className={styles.error}>Произошла ошибка, проверьте введенные данные</div>}
                        </LayoutGroup>
                        <LayoutGroup>
                            {isSignUpMethod ? 'Уже зарегистрировались?' : 'Еще нет аккаунта?'}{' '}
                            <Typography
                                className={styles.textPointer}
                                component="span"
                                onClick={changeLoginMethod}
                                color="secondary"
                            >
                                {isSignUpMethod ? 'Войдите в аккаунт' : 'Зарегистрируйтесь'}
                            </Typography>
                        </LayoutGroup>
                    </Container>
                </Box>
            </Box>
        </Modal>
    );
};

export default memo(AuthModal);
