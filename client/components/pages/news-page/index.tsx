import React, { memo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Container } from '@material-ui/core';

import { GET_NEWS_POSTS } from '../../../apollo/queries';
import { NEWS_POSTS_LIMIT } from '../../../consts';
import { NewsPost } from '../../../types';
import ScrollTopIcon from '../../common/scroll-top-icon';
import InfiniteScroll from '../../common/infinite-scroll';
import NewsCard from '../../news-card';
import { useStyles } from './styles';


interface NewsPostsData {
    getNewsPosts: Array<NewsPost>;
}

const NewsPage = () => {
    const styles = useStyles();
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { data, fetchMore, error, loading } = useQuery<NewsPostsData>(GET_NEWS_POSTS, {
        variables: {
            offset: 0,
            limit: NEWS_POSTS_LIMIT
        },
        fetchPolicy: 'cache-and-network'
    });

    const newsPosts = data?.getNewsPosts || [];

    const fetchMoreData = (page: number) => {
        setHasMore(false);

        fetchMore({
            variables: { offset: page * NEWS_POSTS_LIMIT, limit: NEWS_POSTS_LIMIT },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult?.getNewsPosts?.length) {
                    return prev;
                }

                setHasMore(true);

                return {
                    getNewsPosts: [...prev.getNewsPosts, ...fetchMoreResult?.getNewsPosts]
                };
            }
        });
    };

    return (
        <Container className={styles.newsPage}>
            <InfiniteScroll loadMore={fetchMoreData} hasMore={hasMore}>
                {newsPosts?.map((newsPost) => <NewsCard newsPost={newsPost} key={newsPost.id} />)}
            </InfiniteScroll>

            {error && <div>Произошла ошибка. Пожалуйста, перезагрузите страницу!</div>}
            {!loading && !newsPosts.length && !error && <div>Новостей не найдено!</div>}

            <ScrollTopIcon />
        </Container>
    );
};

export default memo(NewsPage);
