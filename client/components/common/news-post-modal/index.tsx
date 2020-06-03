import { useMutation, useQuery } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { CREATE_NEWS_POST, FILE_UPLOAD, PATCH_NEWS_POST } from '_apollo/mutations';
import { FIND_NEWS_POST, GET_NEWS_POSTS_CURSOR } from '_apollo/queries';
import { NewsPost, NewsPostData, NewsPostsCursorData } from '_client/types';
import AsyncButton from '_components/common/async-button';
import ContainerBox from '_components/common/container-box';
import LabeledInput from '_components/common/labeled-input';
import LoadingWrapper from '_components/common/loading-wrapper';
import Modal from '_components/common/modal';
import { SnackbarErrorText } from '_components/common/snackbar-error-text';


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
                if (isCreate) {
                    const newsPostData = dataProxy.readQuery<NewsPostsCursorData>({ query: GET_NEWS_POSTS_CURSOR });
                    if (newsPostData) {
                        dataProxy.writeQuery({
                            query: GET_NEWS_POSTS_CURSOR,
                            data: {
                                getNewsPostsCursor: [
                                    mutationResult.data.createNewsPost,
                                    ...newsPostData.getNewsPostsCursor
                                ]
                            }
                        });
                    }
                } else {
                    dataProxy.writeQuery({
                        query: FIND_NEWS_POST,
                        data: {
                            findNewsPost: mutationResult.data.patchNewsPost
                        },
                        variables: { id: mutationResult.data.patchNewsPost.id }
                    });
                }
            },
            onError: (error: ApolloError) => {
                const title = `Произошла ошибка при ${isCreate ? 'создании' : 'обновлении'} новости`;

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            },
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

    const onEnterPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.charCode === 13) {
            submit();
        }
    }, [submit]);

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
                        onKeyPress={onEnterPress}
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
