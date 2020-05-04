import React, { memo, useState } from 'react';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import { GET_PERFORMANCE_POSTS } from 'client/apollo/queries';
import { GET_NEWS_POST_QUERY_DEFAULT, PERFORMANCE_POSTS_LIMIT } from 'client/consts';
import { PerformancePost, PerformancePostsData } from 'client/types';
import { InfiniteScroll } from 'components/common';
import { PerformanceCard } from './perfomance-card';
import { useStyles } from './styles';


const DEFAULT_PERFORMANCES_LIST: Array<PerformancePost> = [];

export const PerformancesPage = memo(() => {
    const styles = useStyles();
    const [hasMore, setHasMore] = useState<boolean>(true);

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
        <Container className={styles.performancesPage}>
            <InfiniteScroll loading={loading} loadMore={fetchMoreData} hasMore={hasMore}>
                {items.map((item) => <PerformanceCard item={item} key={item.id} />)}
            </InfiniteScroll>

            {error && <div>Произошла ошибка. Пожалуйста, перезагрузите страницу!</div>}
            {!loading && !items.length && !error && <div>Выступлений не найдено!</div>}
        </Container>
    );
});

export default PerformancesPage;
