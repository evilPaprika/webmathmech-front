import React, { memo, useCallback, useState } from 'react';
import { Button, Modal, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LabeledInput from '../common/labeled-input';
import LayoutGroup from '../common/layout-group';

import cssStyles from './AuthModal.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        ...cssStyles.modal
    },
    modalForm: {
        ...cssStyles.modalForm,
        backgroundColor: theme.palette.background.paper,
    },
}));

interface Props {
    open: boolean;
    isNewUser: boolean;
    close(): void;
}

const AuthModal = ({ open, isNewUser, close }: Props) => {
    const styles = useStyles();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    const submit = useCallback(() => {
        if (isNewUser) {
            // TODO sign up
        }
        // TODO sign in
    }, []);

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
            <Box>
                <form className={styles.modalForm}>
                    <LayoutGroup>
                        <h2>{isNewUser ? 'Регистрация' : 'Вход'}</h2>
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
                            {isNewUser ? 'Зарегистрироваться' : 'Войти'}
                        </Button>
                    </LayoutGroup>
                </form>
            </Box>
        </Modal>
    );
};

export default memo(AuthModal);
