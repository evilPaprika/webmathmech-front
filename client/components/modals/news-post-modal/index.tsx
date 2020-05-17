import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { CREATE_NEWS_POST, FILE_UPLOAD, PATCH_NEWS_POST } from 'apollo/mutations';
import { FIND_NEWS_POST } from 'apollo/queries';
import { NewsPost, NewsPostData } from 'client/types';
import { AsyncButton, ContainerBox, LabeledInput, LoadingWrapper, Modal, SnackbarErrorText } from 'components/common';


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
    description: '',
    pictureURL: '',
};

const applyDefaultState = (item?: NewsPost) => ({
    description: item?.description ?? DEFAULT_STATE.description,
    pictureURL: item?.pictureURL ?? DEFAULT_STATE.pictureURL,
});

export const NewsPostModal = memo(({ isOpen, close, newsPostId: id }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, loading: findLoading } = useQuery<NewsPostData>(
        FIND_NEWS_POST,
        { variables: { id } }
    );

    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);
    const { description, pictureURL } = modalState;
    const isCreate = !id;

    useEffect(() => {
        setModalState(applyDefaultState(data?.findNewsPost));
    }, [id, data]);

    const onCloseModal = useCallback(() => {
        setModalState(DEFAULT_STATE);

        close();
    }, []);

    const [mutateNewsPost, { loading }] = useMutation(
        isCreate ? CREATE_NEWS_POST : PATCH_NEWS_POST,
        {
            onCompleted() {
                enqueueSnackbar(
                    `Новость успешно ${isCreate ? 'создана' : 'обновлена'}!`,
                    { variant: 'success' }
                );
                onCloseModal();
            },
            update: (dataProxy, mutationResult) => {
                dataProxy.writeQuery({
                    query: FIND_NEWS_POST,
                    data: {
                        findNewsPost: mutationResult.data.patchNewsPost
                    },
                    variables: { id: mutationResult.data.patchNewsPost.id }
                });
            },
            onError: (error: ApolloError) => {
                const title = `Произошла ошибка при ${isCreate ? 'создании' : 'обновлении'} новости`;

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
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
        const variables = {
            description: description.trim(),
            pictureURL: pictureURL?.trim() || null,
            id: !isCreate ? id : null
        };
        mutateNewsPost({ variables });
    }, [mutateNewsPost, modalState, id]);

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
        <Modal title={title} isOpen={isOpen} close={onCloseModal}>
            <LoadingWrapper loading={findLoading}>
                <ContainerBox>
                    <LabeledInput
                        value={description}
                        label="Описание"
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
                </ContainerBox>
                <input
                    type="file"
                    required
                    onChange={onFileChange}
                />
            </LoadingWrapper>
        </Modal>
    );
});
