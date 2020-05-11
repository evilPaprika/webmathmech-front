import React, { memo, useState } from 'react';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import { GET_PERFORMANCE_POSTS, GET_CURRENT_USER } from 'client/apollo/queries';
import { GET_NEWS_POST_QUERY_DEFAULT, PERFORMANCE_POSTS_LIMIT } from 'client/consts';
import { useModal } from 'client/hooks';
import { PerformancePost, PerformancePostsData, UserData, Roles } from 'client/types';
import { AddEntityIcon, InfiniteScroll, Teleporter } from 'components/common';
import { CreatePerformancePostModal } from 'components/modals';
import { PerformanceCard } from './perfomance-card';
import { useStyles } from './styles';


const DEFAULT_PERFORMANCES_LIST: Array<PerformancePost> = [];

export const PerformancesPage = memo(() => {
    const styles = useStyles();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isOpenModal, openModal, closeModal] = useModal();
    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const { data, fetchMore, error, loading } = useQuery<PerformancePostsData>(GET_PERFORMANCE_POSTS, {
        variables: GET_NEWS_POST_QUERY_DEFAULT.variables,
        fetchPolicy: 'cache-and-network'
    });

    const items = data?.getPerformancePosts || DEFAULT_PERFORMANCES_LIST;

    const fetchMoreData = (page: number) => {
        setHasMore(false);

        fetchMore({
            variables: { offset: page * PERFORMANCE_POSTS_LIMIT, limit: PERFORMANCE_POSTS_LIMIT },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult?.getPerformancePosts?.length) {
                    return prev;
                }

                setHasMore(true);

                return {
                    getPerformancePosts: [
                        ...prev.getPerformancePosts,
                        ...fetchMoreResult?.getPerformancePosts
                    ]
                };
            }
        });
    };

    return (
        <Container className={styles.performancesPage} disableGutters>
            <InfiniteScroll loading={loading} loadMore={fetchMoreData} hasMore={hasMore}>
                {items.map((item) => <PerformanceCard item={item} key={item.id} />)}
            </InfiniteScroll>

            {error && <div>Произошла ошибка. Пожалуйста, перезагрузите страницу!</div>}
            {!loading && !items.length && !error && <div>Выступлений не найдено!</div>}

            {role === Roles.Admin && (
                <>
                    <Teleporter.Source>
                        <AddEntityIcon onClick={openModal} />
                    </Teleporter.Source>

                    <CreatePerformancePostModal isOpen={isOpenModal} close={closeModal} />
                </>
            )}
        </Container>
    );
});

export default PerformancesPage;
