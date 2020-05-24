import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Typography } from '@material-ui/core';

import { REMOVE_NEWS_POST } from 'apollo/mutations';
import { GET_NEWS_POST_QUERY_DEFAULT } from 'client/consts';
import { NewsPostsData } from 'client/typings';
import { AsyncButton, ContainerBox, Modal, SnackbarErrorText } from 'components/common';


interface Props {
    newsPostId: string;
    isOpen: boolean;
    close(): void;
}

export const RemoveNewsPostModal = memo(({ newsPostId, isOpen, close }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const [removeNewsPost, { loading, client }] = useMutation(
        REMOVE_NEWS_POST,
        {
            onCompleted() {
                const data = client?.readQuery<NewsPostsData>(GET_NEWS_POST_QUERY_DEFAULT);
                if (data) {
                    client?.writeQuery({
                        ...GET_NEWS_POST_QUERY_DEFAULT,
                        data: { getNewsPosts: data.getNewsPosts.filter((post) => post.id !== newsPostId) }
                    });
                }
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
