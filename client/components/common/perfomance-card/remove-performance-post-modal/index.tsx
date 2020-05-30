import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Typography } from '@material-ui/core';

import { REMOVE_PERFORMANCE_POST } from 'apollo/mutations';
import { GET_PERFORMANCES_POST_QUERY_DEFAULT } from 'client/consts';
import { PerformancePostsCursorData } from 'client/types';
import { AsyncButton } from '../../async-button';
import { ContainerBox } from '../../container-box';
import { Modal } from '../../modal';
import { SnackbarErrorText } from '../../snackbar-error-text';


interface Props {
    performancePostId: string;
    isOpen: boolean;
    close(): void;
}

export const RemovePerformancePostModal = memo(({ performancePostId, isOpen, close }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [removePerformancePost, { loading, client }] = useMutation(
        REMOVE_PERFORMANCE_POST,
        {
            onCompleted() {
                const data = client?.readQuery<PerformancePostsCursorData>(GET_PERFORMANCES_POST_QUERY_DEFAULT);
                if (data) {
                    const updatedData = data.getPerformancePostsCursor.filter((post) => post.id !== performancePostId);
                    client?.writeQuery({
                        ...GET_PERFORMANCES_POST_QUERY_DEFAULT,
                        data: { getPerformancePostsCursor: updatedData }
                    });
                }
                enqueueSnackbar('Пост с выступлением успешно удален!', { variant: 'success' });
            },
            onError(error: ApolloError) {
                const title = 'Произошла ошибка при удалении выступления';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            }
        }
    );

    const onRemove = useCallback(() => {
        const variables = { id: performancePostId };
        removePerformancePost({ variables });
    }, [performancePostId]);

    return (
        <Modal title="Предупреждение" isOpen={isOpen} close={close}>
            <ContainerBox gap="large">
                <Typography>Вы уверены, что хотите безвозвратно удалить пост с выступлением?</Typography>
            </ContainerBox>
            <ContainerBox display="flex" flexDirection="row-reverse" gap="none">
                <AsyncButton isLoading={loading} color="secondary" onClick={onRemove}>Удалить</AsyncButton>
                <Button color="secondary" onClick={close}>Отмена</Button>
            </ContainerBox>
        </Modal>
    );
});
