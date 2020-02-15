import React, { memo, useCallback, useState } from 'react';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AuthMethods } from '../../types';
import LabeledInput from '../common/labeled-input';
import LayoutGroup from '../common/layout-group';

import cssStyles from './index.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        ...cssStyles.modal,
    },
    modalForm: {
        ...cssStyles.modalForm,
        backgroundColor: theme.palette.background.paper,
    },
}));

interface Props {
    open: boolean;
    loginMethod: AuthMethods;
    close(): void;
}

const AuthModal = ({ open, loginMethod, close }: Props) => {
    const styles = useStyles();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const isSignUpMethod = loginMethod === AuthMethods.SignUp;

    const submit = useCallback(() => {
        if (isSignUpMethod) {
            // TODO sign up
        } else {
            // TODO sign in
        }
    }, [loginMethod]);

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
            </form>
        </Modal>
    );
};

export default memo(AuthModal);
