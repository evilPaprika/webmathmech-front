import { useMutation } from '@apollo/react-hooks';
import { Button, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo } from 'react';

import { REMOVE_USER } from '_apollo/mutations';
import { GET_USERS_CURSOR } from '_apollo/queries';
import { useModal } from '_client/hooks';
import { UsersDataCursor } from '_client/types';
import { AsyncButton, ContainerBox, LoadingWrapper, Modal } from '_components/common';
import { SnackbarErrorText } from '_components/common/snackbar-error-text';


interface Props {
    id: string;
}

export const RemoveUserButton = memo(({ id }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [removeUser, { loading }] = useMutation(
        REMOVE_USER,
        {
            update: (dataProxy) => {
                const data = dataProxy?.readQuery<UsersDataCursor>({
                    query: GET_USERS_CURSOR,
                });

                if (data) {
                    const updatedData = data.getUsersCursor.filter((user) => user.id !== id);
                    dataProxy?.writeQuery({
                        query: GET_USERS_CURSOR,
                        data: { getUsersCursor: updatedData }
                    });
                }
            },
            onCompleted() {
                enqueueSnackbar('Пользователь успешно удален!', { variant: 'success' });
            },
            onError(error: ApolloError) {
                const title = 'Произошла ошибка при удалении пользователя';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            }
        }
    );
    const [isOpenRemoveModal, openRemoveModal, closeRemoveModal] = useModal();


    return (
        <>
            <LoadingWrapper loading={loading}>
                <IconButton onClick={openRemoveModal} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </LoadingWrapper>
            <Modal title="Предупреждение" isOpen={isOpenRemoveModal} close={closeRemoveModal}>
                <ContainerBox gap="large">
                    <Typography>Вы уверены, что хотите безвозвратно удалить пользователя?</Typography>
                </ContainerBox>
                <ContainerBox display="flex" flexDirection="row-reverse" gap="none">
                    <AsyncButton
                        isLoading={loading}
                        color="secondary"
                        onClick={() => removeUser({ variables: { id } })}
                    >
                        Удалить
                    </AsyncButton>
                    <Button color="secondary" onClick={closeRemoveModal}>Отмена</Button>
                </ContainerBox>
            </Modal>
        </>
    );
});


export default RemoveUserButton;
