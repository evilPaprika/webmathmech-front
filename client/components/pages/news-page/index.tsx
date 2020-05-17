import React, { memo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Container } from '@material-ui/core';

import { GET_CURRENT_USER, GET_NEWS_POSTS } from 'apollo/queries';
import { GET_NEWS_POST_QUERY_DEFAULT, NEWS_POSTS_LIMIT } from 'client/consts';
import { useModal } from 'client/hooks';
import { NewsPostsData, Roles, UserData } from 'client/types';
import { InfiniteScroll, Teleporter, AddEntityIcon } from 'components/common';
import { NewsPostModal } from 'components/modals';

import NewsCard from './news-card';


const NewsPage = () => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isOpenModal, openModal, closeModal] = useModal();
    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const { data, fetchMore, error, loading } = useQuery<NewsPostsData>(GET_NEWS_POSTS, {
        variables: GET_NEWS_POST_QUERY_DEFAULT.variables,
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
        <Container disableGutters>
            <InfiniteScroll loading={loading} loadMore={fetchMoreData} hasMore={hasMore}>
                {newsPosts?.map((item) => <NewsCard item={item} key={item.id} />)}
            </InfiniteScroll>

            {error && <div>Произошла ошибка. Пожалуйста, перезагрузите страницу!</div>}
            {!loading && !newsPosts.length && !error && <div>Новостей не найдено!</div>}

            {role === Roles.Admin && (
                <>
                    <Teleporter.Source>
                        <AddEntityIcon onClick={openModal} />
                    </Teleporter.Source>

                    <NewsPostModal isOpen={isOpenModal} close={closeModal} />
                </>
            )}
        </Container>
    );
};

export default memo(NewsPage);
