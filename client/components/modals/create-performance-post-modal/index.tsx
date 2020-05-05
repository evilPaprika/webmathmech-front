import React, { memo, useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup } from '@material-ui/core';

import { CREATE_PERFORMANCE_POST, FILE_UPLOAD } from 'apollo/mutations';
import { MEDIA_TABS, PERFORMANCE_STATES_OPTIONS } from 'client/consts';
import { useModal } from 'client/hooks/use-modal';
import { MediaTypes, PerformancePostState } from 'client/types';
import { Alert, AsyncButton, LabeledInput, LabeledSelect, Modal } from 'components/common';

import { useStyles } from './styles';


interface Props {
    isOpen: boolean;
    close(): void;
}

interface ModalState {
    text: string;
    pictureURL?: string;
    videoURL?: string;
    state: PerformancePostState;

    media: MediaTypes;
}

const DEFAULT_STATE: ModalState = {
    text: '',
    state: PerformancePostState.Draft,

    media: MediaTypes.Picture,
};

export const CreatePerformancePostModal = memo(({ isOpen, close }: Props) => {
    const styles = useStyles();

    const [isShownAlert, openAlert, closeAlert] = useModal();
    const [modalState, setModalState] = useState<ModalState>(DEFAULT_STATE);
    const { text, pictureURL, videoURL, media, state } = modalState;

    const onCloseModal = useCallback(() => {
        setModalState(DEFAULT_STATE);

        close();
    }, []);

    const [createPerformancePost, { loading, error }] = useMutation(
        CREATE_PERFORMANCE_POST,
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
        name?: string | undefined;
        value: unknown;
    }>) => {
        setModalState({
            ...modalState,
            state: event.target.value as PerformancePostState
        });
    };

    const submit = useCallback(() => {
        const variables = {
            text: text.trim(),
            pictureURL: (media === MediaTypes.Picture && pictureURL?.trim()) || null,
            videoURL: (media === MediaTypes.Video && videoURL?.trim()) || null,
            state,
        };
        createPerformancePost({ variables });
    }, [createPerformancePost, modalState]);

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
            <Modal title="Создание выступления" isOpen={isOpen} close={onCloseModal}>
                <>
                    <Box px="24px" mb="20px">
                        <LabeledInput
                            value={text}
                            label="Описание"
                            rowsMax={10}
                            multiline
                            onChange={changeText}
                        />
                    </Box>
                    <Box px="24px" mb="20px">
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
                    </Box>
                    <Box px="24px" mb="20px">
                        <RadioGroup value={media} onChange={changeMediaType}>
                            {MEDIA_TABS.map(({ label, value }) => (
                                <FormControlLabel key={label} label={label} value={value} control={<Radio />} />
                            ))}
                        </RadioGroup>
                    </Box>
                    {media === MediaTypes.Picture && (
                        <Box px="24px" mb="20px">
                            <LabeledInput
                                value={pictureURL}
                                size="small"
                                label="Ссылка на фото"
                                onChange={changePictureURL}
                            />
                        </Box>
                    )}
                    {media === MediaTypes.Video && (
                        <Box px="24px" mb="20px">
                            <LabeledInput
                                value={videoURL}
                                size="small"
                                label="Ссылка на видео"
                                onChange={changeVideoURL}
                            />
                        </Box>
                    )}
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
                        {error && <div className={styles.error}>Произошла ошибка при создании выступления</div>}
                    </Box>
                    <input
                        type="file"
                        required
                        onChange={onFileChange}
                    />
                </>
            </Modal>
            {isShownAlert && <Alert onClose={closeAlert} text="Выступление успешно создано!" />}
        </>
    );
});

export default CreatePerformancePostModal;
