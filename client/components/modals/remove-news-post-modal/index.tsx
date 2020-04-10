import React, { memo, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Box, Typography, Button } from '@material-ui/core';

import { REMOVE_NEWS_POST } from 'apollo/mutations';
import { GET_NEWS_POST_QUERY_DEFAULT } from 'client/consts';
import { useModal } from 'client/hooks';
import { NewsPostsData } from 'client/types';
import { Alert, AsyncButton, Modal } from 'components/common';
import { useStyles } from './styles';


interface Props {
    newsPostId: string;
    isOpen: boolean;
    close(): void;
}

export const RemoveNewsPostModal = memo(({ newsPostId, isOpen, close }: Props) => {
    const styles = useStyles();
    const [isShownAlert, openAlert, closeAlert] = useModal();
    const [removeNewsPost, { loading, error, client }] = useMutation(
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
                close();
                openAlert();
            }
        }
    );

    const onRemove = useCallback(() => {
        const variables = { id: newsPostId };
        removeNewsPost({ variables });
    }, [newsPostId]);

    return (
        <>
            <Modal title="Предупреждение" isOpen={isOpen} close={close}>
                <Box px="24px" mb="40px">
                    <Typography>Вы уверены, что хотите безвозвратно удалить новость?</Typography>
                </Box>
                <Box px="24px" mb="20px" display="flex" flexDirection="row-reverse">
                    <AsyncButton isLoading={loading} color="secondary" onClick={onRemove}>Удалить</AsyncButton>
                    <Button color="secondary" onClick={close}>Отмена</Button>
                </Box>
                {error && <Box px="24px" mb="20px" className={styles.error}>Произошла ошибка. Попробуйте снова</Box>}
            </Modal>
            {isShownAlert && <Alert onClose={closeAlert} text="Новость успешно удалена!" />}
        </>
    );
});
