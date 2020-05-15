import React, { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_NEWS_POST, FILE_UPLOAD } from 'apollo/mutations';
import { useModal } from 'client/hooks/use-modal';
import { Alert, AsyncButton, ContainerBox, LabeledInput, Modal } from 'components/common';

import { useStyles } from './styles';


interface Props {
    isOpen: boolean;
    close(): void;
}

interface ModalState {
    description: string;
    pictureURL?: string;
}

const DEFAULT_STATE: ModalState = {
    description: ''
};

export const CreateNewsPostModal = memo(({ isOpen, close }: Props) => {
    const styles = useStyles();

    const [isShownAlert, openAlert, closeAlert] = useModal();
    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);
    const { description, pictureURL } = modalState;

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

    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalState({
            ...modalState,
            description: event.target.value
        });
    };

    const changePictureURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            pictureURL: event.target.value
        });
    };

    const submit = useCallback(() => {
        const variables = { description: description.trim(), pictureURL: pictureURL?.trim() || null };
        createNewsPost({ variables });
    }, [createNewsPost, description, pictureURL]);

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
                <ContainerBox>
                    <LabeledInput
                        value={description}
                        label="Текст новости"
                        rowsMax={10}
                        multiline
                        onChange={changeDescription}
                    />
                </ContainerBox>
                <ContainerBox>
                    <LabeledInput
                        value={pictureURL}
                        size="small"
                        label="Ссылка на фото"
                        onChange={changePictureURL}
                    />
                </ContainerBox>
                <ContainerBox gap="large">
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
                </ContainerBox>
                <input
                    type="file"
                    required
                    onChange={onFileChange}
                />
            </Modal>
            {isShownAlert && <Alert onClose={closeAlert} text="Новость успешно создана!" />}
        </>
    );
});
