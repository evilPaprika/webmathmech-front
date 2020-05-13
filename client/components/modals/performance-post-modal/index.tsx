import React, { memo, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FormControlLabel, MenuItem, Radio, RadioGroup } from '@material-ui/core';

import { CREATE_PERFORMANCE_POST, FILE_UPLOAD, PATCH_PERFORMANCE_POST } from 'apollo/mutations';
import { FIND_PERFORMANCE_POST } from 'apollo/queries';
import { MEDIA_TABS, PERFORMANCE_STATES_OPTIONS } from 'client/consts';
import { useModal } from 'client/hooks';
import { MediaTypes, PerformancePostData, PerformancePostState, PerformancePost } from 'client/types';
import { Alert, AsyncButton, ContainerBox, LabeledInput, LabeledSelect, Modal } from 'components/common';

import { useStyles } from './styles';


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
    state: PerformancePostState.Draft,

    media: MediaTypes.Picture,
};


const postFind = (item?: PerformancePost): ModalState => (
    item ? {
        description: item.description,
        pictureURL: item.pictureURL,
        videoURL: item.videoURL,
        state: item.state,
        media: item.videoURL ? MediaTypes.Video : MediaTypes.Picture
    } : DEFAULT_STATE
);

export const PerformancePostModal = memo(({ isOpen, close, performancePostId: id }: Props) => {
    const styles = useStyles();

    const { data } = useQuery<PerformancePostData>(
        FIND_PERFORMANCE_POST,
        { variables: { id } }
    );

    const [isShownAlert, openAlert, closeAlert] = useModal();
    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);

    useEffect(() => {
        setModalState(postFind(data?.findPerformancePost));
    }, [id, data]);

    const isCreate = !id;
    const { description, pictureURL, videoURL, media, state } = modalState;

    const onCloseModal = useCallback(() => {
        setModalState(DEFAULT_STATE);

        close();
    }, []);

    const [mutatePerformancePost, { loading, error }] = useMutation(
        isCreate ? CREATE_PERFORMANCE_POST : PATCH_PERFORMANCE_POST,
        {
            onCompleted() {
                onCloseModal();
                openAlert();
            },
            update: (dataProxy, mutationResult) => {
                dataProxy.writeQuery({
                    query: FIND_PERFORMANCE_POST,
                    data: {
                        findPerformancePost: mutationResult.data.patchPerformancePost
                    }
                });
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
        <>
            <Modal title={title} isOpen={isOpen} close={onCloseModal}>
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
                    {error && (
                        <div className={styles.error}>
                            Произошла ошибка при {isCreate ? 'создании' : 'обновлении'} выступления
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
                <Alert onClose={closeAlert} text={`Выступление успешно ${isCreate ? 'создано' : 'обновлено'}!`} />
            )}
        </>
    );
});
