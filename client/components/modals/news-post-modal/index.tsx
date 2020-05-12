import React, { memo, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { CREATE_NEWS_POST, FILE_UPLOAD, UPDATE_NEWS_POST } from 'apollo/mutations';
import { FIND_NEWS_POST } from 'apollo/queries';
import { useModal } from 'client/hooks/use-modal';
import { NewsPost, NewsPostData } from 'client/types';
import { Alert, AsyncButton, ContainerBox, LabeledInput, Modal } from 'components/common';

import { useStyles } from './styles';


interface Props {
    isOpen: boolean;
    close(): void;
    newsPostId?: string;
}

interface ModalState {
    description: string;
    pictureURL?: string;
}

const DEFAULT_STATE: ModalState = {
    description: ''
};

const postFind = (item?: NewsPost) => item ?? DEFAULT_STATE;

export const NewsPostModal = memo(({ isOpen, close, newsPostId: id }: Props) => {
    const styles = useStyles();

    const { data } = useQuery<NewsPostData>(FIND_NEWS_POST, { variables: { id } });

    const [isShownAlert, openAlert, closeAlert] = useModal();
    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);
    const { description, pictureURL } = modalState;
    const isCreate = !id;

    useEffect(() => {
        setModalState(postFind(data?.findNewsPost));
    });

    const onCloseModal = () => {
        setModalState(DEFAULT_STATE);

        close();
    };

    const [mutateNewsPost, { loading, error }] = useMutation(
        isCreate ? CREATE_NEWS_POST : UPDATE_NEWS_POST,
        {
            onCompleted() {
                onCloseModal();
                openAlert();
            },
            refetchQueries: ['GET_NEWS_POSTS'] // TODO
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
        const variables = {
            description: description.trim(),
            pictureURL: pictureURL?.trim() || null,
            id: !isCreate ? id : null
        };
        mutateNewsPost({ variables });
    }, [mutateNewsPost, description, pictureURL]);

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

    const title = isCreate ? 'Создание новости' : 'Редактирование новости';

    return (
        <>
            <Modal title={title} isOpen={isOpen} close={onCloseModal}>
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
                        {isCreate ? 'Создать' : 'Сохранить изменения'}
                    </AsyncButton>
                    {error && (
                        <div className={styles.error}>
                            Произошла ошибка при {isCreate ? 'создании' : 'обновлении'} новости
                        </div>
                    )}
                </ContainerBox>
                <input
                    type="file"
                    required
                    onChange={onFileChange}
                />
            </Modal>
            {isShownAlert && (
                <Alert onClose={closeAlert} text={`Новость успешно ${isCreate ? 'создана' : 'обновлена'}!`} />
            )}
        </>
    );
});
