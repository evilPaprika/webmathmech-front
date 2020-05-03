import React, { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';

import { CREATE_NEWS_POST, FILE_UPLOAD } from 'apollo/mutations';
import { useModal } from 'client/hooks/use-modal';
import { Alert, AsyncButton, LabeledInput, Modal } from 'components/common';

import { useStyles } from './styles';


interface Props {
    isOpen: boolean;
    close(): void;
}

interface ModalState {
    text: string;
    pictureURL?: string;
}

const DEFAULT_STATE: ModalState = {
    text: ''
};

export const CreateNewsPostModal = memo(({ isOpen, close }: Props) => {
    const styles = useStyles();

    const [isShownAlert, openAlert, closeAlert] = useModal();
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

    const changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalState({
            ...modalState,
            text: event.target.value
        });
    };

    const changePictureURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            pictureURL: event.target.value
        });
    };

    const submit = useCallback(() => {
        const variables = { text: text.trim(), pictureURL: pictureURL?.trim() || null };
        createNewsPost({ variables });
    }, [createNewsPost, text, pictureURL]);

    // fileupload draft
    const [fileUpload] = useMutation(
        FILE_UPLOAD,
        {
            onCompleted(response) {
                // eslint-disable-next-line no-console
                console.log(`file uploaded to ${response.fileUpload}`);
            }
        }
    );

    // fileupload draft
    const onFileChange = ({
        target: { validity, files },
    }: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = files || [];

        if (validity.valid) {
            fileUpload({ variables: { file } });
        }
    };


    return (
        <>
            <Modal title="Создание новости" isOpen={isOpen} close={onCloseModal}>
                <>
                    <Box px="24px" mb="20px">
                        <LabeledInput
                            value={text}
                            label="Текст новости"
                            rowsMax={10}
                            multiline
                            onChange={changeText}
                        />
                    </Box>
                    <Box px="24px" mb="20px">
                        <LabeledInput
                            value={pictureURL}
                            size="small"
                            label="Ссылка на фото"
                            onChange={changePictureURL}
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
                    <input
                        type="file"
                        required
                        onChange={onFileChange}
                    />
                </>
            </Modal>
            {isShownAlert && <Alert onClose={closeAlert} text="Новость успешно создана!" />}
        </>
    );
});
