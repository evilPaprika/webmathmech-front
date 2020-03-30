import React, { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { CREATE_NEWS_POST } from 'apollo/mutations';
import { useModal } from 'client/hooks/use-modal';
import AsyncButton from 'components/common/async-button';
import LabeledInput from 'components/common/labeled-input';
import Modal from 'components/common/modal';
import { useStyles } from './styles';


interface Props {
    isOpened: boolean;
    close(): void;
}

interface ModalState {
    text: string;
    pictureURL?: string;
}

const DEFAULT_STATE: ModalState = {
    text: ''
};

const CreateNewsPostModal = ({ isOpened, close }: Props) => {
    const styles = useStyles();

    const [showAlert, openAlert, closeAlert] = useModal();
    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);
    const { text, pictureURL } = modalState;

    const onCloseModal = () => {
        setModalState(DEFAULT_STATE);

        close();
    };

    const [createNewsPost, { loading, error }] = useMutation(
        CREATE_NEWS_POST,
        {
            onCompleted() {
                onCloseModal();
                openAlert();
            }
        }
    );

    const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalState({
            ...modalState,
            text: event.target.value
        });
    };

    const onChangePictureURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            pictureURL: event.target.value
        });
    };

    const submit = useCallback(() => {
        const variables = { text: text.trim(), pictureURL: pictureURL?.trim() || null };
        createNewsPost({ variables });
    }, [createNewsPost, text, pictureURL]);

    return (
        <>
            <Modal
                title="Создание новости"
                isOpened={isOpened}
                close={onCloseModal}
            >
                <>
                    <Box px="24px" mb="20px">
                        <LabeledInput
                            value={text}
                            label="Текст новости"
                            rowsMax={10}
                            multiline
                            onChange={onChangeText}
                        />
                    </Box>
                    <Box px="24px" mb="20px">
                        <LabeledInput
                            value={pictureURL}
                            size="small"
                            label="Ссылка на фото"
                            onChange={onChangePictureURL}
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
                            Создать
                        </AsyncButton>
                        {error && <div className={styles.error}>Произошла ошибка при создании новости</div>}
                    </Box>
                </>
            </Modal>
            {showAlert && (
                <Alert severity="success" onClose={closeAlert} className={styles.alert}>
                    Новость успешно создана!
                </Alert>
            )}
        </>
    );
};

export default memo(CreateNewsPostModal);
