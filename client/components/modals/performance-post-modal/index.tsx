import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FormControlLabel, MenuItem, Radio, RadioGroup } from '@material-ui/core';

import { CREATE_PERFORMANCE_POST, FILE_UPLOAD, PATCH_PERFORMANCE_POST } from 'apollo/mutations';
import { FIND_PERFORMANCE_POST } from 'apollo/queries';
import { MEDIA_TABS, PERFORMANCE_STATES_OPTIONS } from 'client/consts';
import { MediaTypes, PerformancePostData, PerformancePostState, PerformancePost } from 'client/types';
import {
    AsyncButton,
    ContainerBox,
    LabeledInput,
    LabeledSelect,
    LoadingWrapper,
    Modal,
    SnackbarErrorText
} from 'components/common';


interface Props {
    isOpen: boolean;
    close(): void;
    performancePostId?: string;
}

interface ModalState {
    description: string;
    pictureURL?: string;
    videoURL?: string;
    state: PerformancePostState;

    media: MediaTypes;
}

const DEFAULT_STATE: ModalState = {
    description: '',
    pictureURL: '',
    videoURL: '',
    state: PerformancePostState.Draft,

    media: MediaTypes.Picture,
};

const applyDefaultState = (item?: PerformancePost): ModalState => (
    item ? {
        description: item.description ?? DEFAULT_STATE.description,
        pictureURL: item.pictureURL ?? DEFAULT_STATE.pictureURL,
        videoURL: item.videoURL ?? DEFAULT_STATE.videoURL,
        state: item.state ?? DEFAULT_STATE.state,
        media: item.videoURL ? MediaTypes.Video : MediaTypes.Picture
    } : DEFAULT_STATE
);

export const PerformancePostModal = memo(({ isOpen, close, performancePostId: id }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, loading: findLoading } = useQuery<PerformancePostData>(
        FIND_PERFORMANCE_POST,
        { variables: { id } }
    );

    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);

    useEffect(() => {
        setModalState(applyDefaultState(data?.findPerformancePost));
    }, [id, data]);

    const isCreate = !id;
    const { description, pictureURL, videoURL, media, state } = modalState;

    const onCloseModal = useCallback(() => {
        setModalState(DEFAULT_STATE);

        close();
    }, []);

    const [mutatePerformancePost, { loading }] = useMutation(
        isCreate ? CREATE_PERFORMANCE_POST : PATCH_PERFORMANCE_POST,
        {
            onCompleted() {
                enqueueSnackbar(
                    `Выступление успешно ${isCreate ? 'создано' : 'обновлено'}!`,
                    { variant: 'success' }
                );
                onCloseModal();
            },
            update: (dataProxy, mutationResult) => {
                dataProxy.writeQuery({
                    query: FIND_PERFORMANCE_POST,
                    data: {
                        findPerformancePost: mutationResult.data.patchPerformancePost
                    },
                    variables: { id: mutationResult.data.patchPerformancePost.id }
                });
            },
            onError(error: ApolloError) {
                const title = `Произошла ошибка при ${isCreate ? 'создании' : 'обновлении'} выступления`;

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

    const changeMediaType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            media: event.target.value as MediaTypes
        });
    };

    const changePictureURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            pictureURL: event.target.value
        });
    };

    const changeVideoURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({
            ...modalState,
            videoURL: event.target.value
        });
    };

    const changePerformanceState = (event: React.ChangeEvent<{
        name?: string;
        value: unknown;
    }>) => {
        setModalState({
            ...modalState,
            state: event.target.value as PerformancePostState
        });
    };

    const submit = useCallback(() => {
        const variables = {
            description: description.trim(),
            pictureURL: (media === MediaTypes.Picture && pictureURL?.trim()) || null,
            videoURL: (media === MediaTypes.Video && videoURL?.trim()) || null,
            state,
            id: !isCreate ? id : null
        };
        mutatePerformancePost({ variables });
    }, [mutatePerformancePost, modalState, id]);

    const onEnterPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.charCode === 13) {
            submit();
        }
    }, []);

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

    const title = isCreate ? 'Создание выступления' : 'Редактирование выступления';

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
                    <LabeledSelect
                        label="Состояние выступления"
                        value={state}
                        fullWidth
                        onChange={changePerformanceState}
                    >
                        {PERFORMANCE_STATES_OPTIONS.map(({ label, value }) => (
                            <MenuItem value={value} key={label}>{label}</MenuItem>
                        ))}
                    </LabeledSelect>
                </ContainerBox>
                <ContainerBox>
                    <RadioGroup value={media} onChange={changeMediaType}>
                        {MEDIA_TABS.map(({ label, value }) => (
                            <FormControlLabel key={label} label={label} value={value} control={<Radio />} />
                        ))}
                    </RadioGroup>
                </ContainerBox>
                {media === MediaTypes.Picture && (
                    <ContainerBox>
                        <LabeledInput
                            value={pictureURL}
                            size="small"
                            label="Ссылка на фото"
                            onChange={changePictureURL}
                        />
                    </ContainerBox>
                )}
                {media === MediaTypes.Video && (
                    <ContainerBox>
                        <LabeledInput
                            value={videoURL}
                            size="small"
                            label="Ссылка на видео"
                            onChange={changeVideoURL}
                            onKeyPress={onEnterPress}
                        />
                    </ContainerBox>
                )}
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
