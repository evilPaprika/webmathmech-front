import React, { memo, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Typography } from '@material-ui/core';

import { REMOVE_PERFORMANCE_POST } from 'apollo/mutations';
import { GET_PERFORMANCES_POST_QUERY_DEFAULT } from 'client/consts';
import { useModal } from 'client/hooks';
import { PerformancePostsData } from 'client/types';
import { Alert, AsyncButton, ContainerBox, Modal } from 'components/common';

import { useStyles } from './styles';


interface Props {
    performancePostId: string;
    isOpen: boolean;
    close(): void;
}

export const RemovePerformancePostModal = memo(({ performancePostId, isOpen, close }: Props) => {
    const styles = useStyles();
    const [isShownAlert, openAlert, closeAlert] = useModal();
    const [removePerformancePost, { loading, error, client }] = useMutation(
        REMOVE_PERFORMANCE_POST,
        {
            onCompleted() {
                const data = client?.readQuery<PerformancePostsData>(GET_PERFORMANCES_POST_QUERY_DEFAULT);
                if (data) {
                    const updatedData = data.getPerformancePosts.filter((post) => post.id !== performancePostId);
                    client?.writeQuery({
                        ...GET_PERFORMANCES_POST_QUERY_DEFAULT,
                        data: { getPerformancePosts: updatedData }
                    });
                }
                close();
                openAlert();
            }
        }
    );

    const onRemove = useCallback(() => {
        const variables = { id: performancePostId };
        removePerformancePost({ variables });
    }, [performancePostId]);

    return (
        <>
            <Modal title="Предупреждение" isOpen={isOpen} close={close}>
                <ContainerBox gap="large">
                    <Typography>Вы уверены, что хотите безвозвратно удалить пост с выступлением?</Typography>
                </ContainerBox>
                <ContainerBox display="flex" flexDirection="row-reverse">
                    <AsyncButton isLoading={loading} color="secondary" onClick={onRemove}>Удалить</AsyncButton>
                    <Button color="secondary" onClick={close}>Отмена</Button>
                </ContainerBox>
                {error && <ContainerBox className={styles.error}>Произошла ошибка. Попробуйте снова</ContainerBox>}
            </Modal>
            {isShownAlert && <Alert onClose={closeAlert} text="Пост с выступлением успешно удален!" />}
        </>
    );
});
