import { useMutation } from '@apollo/react-hooks';
import { Button, Typography } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useContext } from 'react';

import { REMOVE_PERFORMANCE_POST } from '_apollo/mutations';
import { GET_PERFORMANCE_POSTS_CURSOR } from '_apollo/queries';
import { PerformancePostsCursorData } from '_client/types';
import { PerformanceListContext } from '_contexts/PerformanceList.context';

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
    const { filters } = useContext(PerformanceListContext);
    const { enqueueSnackbar } = useSnackbar();
    const [removePerformancePost, { loading, client }] = useMutation(
        REMOVE_PERFORMANCE_POST,
        {
            onCompleted() {
                const data = client?.readQuery<PerformancePostsCursorData>({
                    query: GET_PERFORMANCE_POSTS_CURSOR,
                    variables: { filters }
                });
                if (data) {
                    const updatedData = data.getPerformancePostsCursor.filter((post) => post.id !== performancePostId);
                    client?.writeQuery({
                        query: GET_PERFORMANCE_POSTS_CURSOR,
                        variables: { filters },
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
