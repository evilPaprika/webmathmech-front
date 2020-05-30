import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import { CREATE_PERFORMANCE_POST, FILE_UPLOAD, PATCH_PERFORMANCE_POST } from 'apollo/mutations';
import { FIND_PERFORMANCE_POST, GET_PERFORMANCE_POSTS_CURSOR } from 'apollo/queries';
import { MEDIA_TABS, PERFORMANCE_STATES_OPTIONS } from 'client/consts';
import {
    MediaTypes,
    PerformancePostData,
    PerformancePostState,
    PerformancePost,
    PerformancePostsCursorData
} from 'client/types';
import { mapSpeakerToOption } from 'client/utils';
import { SnackbarErrorText } from 'components/common/snackbar-error-text';
import Modal from 'components/common/modal';
import LoadingWrapper from 'components/common/loading-wrapper';
import ContainerBox from 'components/common/container-box';
import LabeledInput from 'components/common/labeled-input';
import AsyncButton from 'components/common/async-button';
import LabeledSelect from 'components/common/labeled-select';
import { UsersSelect } from './users-select';


interface Props {
    isOpen: boolean;
    close(): void;
    performancePostId?: string;
}

interface ModalState extends Partial<PerformancePost> {
    media: MediaTypes;
    speakerId?: string;
}

const DEFAULT_STATE: ModalState = {
    title: '',
    description: '',
    pictureURL: '',
    videoURL: '',
    state: PerformancePostState.Draft,

    media: MediaTypes.Picture,
};

const applyDefaultState = (item?: PerformancePost): ModalState => (
    item ? {
        title: item.title ?? DEFAULT_STATE.title,
        description: item.description ?? DEFAULT_STATE.description,
        pictureURL: item.pictureURL ?? DEFAULT_STATE.pictureURL,
        videoURL: item.videoURL ?? DEFAULT_STATE.videoURL,
        state: item.state ?? DEFAULT_STATE.state,
        media: item.videoURL ? MediaTypes.Video : MediaTypes.Picture,
        speakerId: item.speaker?.id || DEFAULT_STATE.speakerId,
        speaker: item.speaker
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
    const { title, description, pictureURL, videoURL, media, state, speakerId, speaker } = modalState;

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
                if (isCreate) {
                    const performancePostData = dataProxy.readQuery<PerformancePostsCursorData>(
                        { query: GET_PERFORMANCE_POSTS_CURSOR }
                    );
                    if (performancePostData) {
                        dataProxy.writeQuery({
                            query: GET_PERFORMANCE_POSTS_CURSOR,
                            data: {
                                getPerformancePostsCursor: [
                                    mutationResult.data.createPerformancePost,
                                    ...performancePostData.getPerformancePostsCursor
                                ]
                            }
                        });
                    }
                } else {
                    dataProxy.writeQuery({
                        query: FIND_PERFORMANCE_POST,
                        data: {
                            findPerformancePost: mutationResult.data.patchPerformancePost
                        },
                        variables: { id: mutationResult.data.patchPerformancePost.id }
                    });
                }
            },
            onError(error: ApolloError) {
                const errorTitle = `Произошла ошибка при ${isCreate ? 'создании' : 'обновлении'} выступления`;

                enqueueSnackbar(<SnackbarErrorText title={errorTitle} error={error} />, { variant: 'error' });
            }
        }
    );

    const changeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalState({ ...modalState, title: event.target.value });
    };

    const changeSpeaker = (value: string) => {
        setModalState({ ...modalState, speakerId: value });
    };

    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalState({ ...modalState, description: event.target.value });
    };

    const changeMediaType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({ ...modalState, media: event.target.value as MediaTypes });
    };

    const changePictureURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({ ...modalState, pictureURL: event.target.value });
    };

    const changeVideoURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModalState({ ...modalState, videoURL: event.target.value });
    };

    const changePerformanceState = (value: string) => {
        setModalState({ ...modalState, state: value as PerformancePostState });
    };

    const submit = useCallback(() => {
        const variables = {
            title: title?.trim(),
            description: description?.trim(),
            pictureURL: (media === MediaTypes.Picture && pictureURL?.trim()) || null,
            videoURL: (media === MediaTypes.Video && videoURL?.trim()) || null,
            state,
            speakerId: speakerId || null,
            id: !isCreate ? id : null
        };
        mutatePerformancePost({ variables });
    }, [mutatePerformancePost, modalState, id]);

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

    const modalTitle = isCreate ? 'Создание выступления' : 'Редактирование выступления';

    return (
        <Modal title={modalTitle} isOpen={isOpen} close={onCloseModal}>
            <LoadingWrapper loading={findLoading}>
                <ContainerBox>
                    <LabeledInput
                        value={title}
                        label="Заголовок"
                        size="small"
                        onChange={changeTitle}
                    />
                </ContainerBox>
                <ContainerBox>
                    <UsersSelect
                        value={mapSpeakerToOption(speaker)}
                        isCreateMode={isCreate}
                        label="Спикер"
                        fullWidth
                        onChange={changeSpeaker}
                    />
                </ContainerBox>
                <ContainerBox>
                    <LabeledInput
                        value={description}
                        label="Описание"
                        rowsMax={8}
                        multiline
                        onChange={changeDescription}
                    />
                </ContainerBox>
                <ContainerBox>
                    <LabeledSelect
                        value={PERFORMANCE_STATES_OPTIONS.find((pState) => state === pState.value)}
                        options={PERFORMANCE_STATES_OPTIONS}
                        label="Состояние выступления"
                        fullWidth
                        onChange={changePerformanceState}
                    />
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
                            label="Ссылка на фото"
                            size="small"
                            onChange={changePictureURL}
                        />
                    </ContainerBox>
                )}
                {media === MediaTypes.Video && (
                    <ContainerBox>
                        <LabeledInput
                            value={videoURL}
                            label="Ссылка на видео"
                            size="small"
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
