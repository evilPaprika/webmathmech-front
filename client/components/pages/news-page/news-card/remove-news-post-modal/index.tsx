import { useMutation } from '@apollo/react-hooks';
import { Button, Typography } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback } from 'react';

import { REMOVE_NEWS_POST } from '_apollo/mutations';
import { GET_NEWS_POSTS_CURSOR } from '_apollo/queries';
import { NEWS_POSTS_LIMIT } from '_client/consts';
import { NewsPostsCursorData } from '_client/types';
import { AsyncButton, ContainerBox, Modal, SnackbarErrorText } from '_components/common';


interface Props {
    newsPostId: string;
    isOpen: boolean;
    close(): void;
}

export const RemoveNewsPostModal = memo(({ newsPostId, isOpen, close }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const [removeNewsPost, { loading }] = useMutation(
        REMOVE_NEWS_POST,
        {
            update: (dataProxy) => {
                const data = dataProxy?.readQuery<NewsPostsCursorData>({
                    query: GET_NEWS_POSTS_CURSOR,
                    variables: { limit: NEWS_POSTS_LIMIT }
                });
                if (data) {
                    dataProxy?.writeQuery({
                        query: GET_NEWS_POSTS_CURSOR,
                        variables: { limit: NEWS_POSTS_LIMIT },
                        data: { getNewsPostsCursor: data.getNewsPostsCursor.filter((post) => post.id !== newsPostId) }
                    });
                }
            },
            onCompleted() {
                enqueueSnackbar('Новость успешно удалена!', { variant: 'success' });
                close();
            },
            onError(error: ApolloError) {
                const title = 'Произошла ошибка при удалении новости';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            }
        }
    );

    const onRemove = useCallback(() => {
        const variables = { id: newsPostId };
        removeNewsPost({ variables });
    }, [newsPostId]);

    return (
        <Modal title="Предупреждение" isOpen={isOpen} close={close}>
            <ContainerBox gap="large">
                <Typography>Вы уверены, что хотите безвозвратно удалить новость?</Typography>
            </ContainerBox>
            <ContainerBox display="flex" flexDirection="row-reverse" gap="none">
                <AsyncButton isLoading={loading} color="secondary" onClick={onRemove}>Удалить</AsyncButton>
                <Button color="secondary" onClick={close}>Отмена</Button>
            </ContainerBox>
        </Modal>
    );
});
