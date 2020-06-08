import { useQuery } from '@apollo/react-hooks';
import React, { memo, useState } from 'react';

import { GET_CURRENT_USER, GET_NEWS_POSTS_CURSOR } from '_apollo/queries';
import { NEWS_POSTS_LIMIT } from '_client/consts';
import { useModal } from '_client/hooks';
import { NewsPostsCursorData, Role, UserData } from '_client/types';
import { AddEntityIcon, InfiniteScroll, NewsPostModal, PageContainer, Teleporter } from '_components/common';

import NewsCard from './news-card';


const NewsPage = () => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isOpenModal, openModal, closeModal] = useModal();
    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const { data, fetchMore, error, loading, client } = useQuery<NewsPostsCursorData>(
        GET_NEWS_POSTS_CURSOR,
        { variables: { limit: NEWS_POSTS_LIMIT }, }
    );

    const newsPosts = data?.getNewsPostsCursor || [];

    const fetchMoreData = () => {
        if (loading) {
            return;
        }
        setHasMore(false);

        const posts = client
            .readQuery<NewsPostsCursorData>({ query: GET_NEWS_POSTS_CURSOR })
            ?.getNewsPostsCursor || [];
        const lastPost = posts[posts.length - 1];
        fetchMore({
            variables: { dateTimeCursor: lastPost.createdAt, limit: NEWS_POSTS_LIMIT },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult?.getNewsPostsCursor?.length) {
                    return prev;
                }

                setHasMore(true);

                return {
                    getNewsPostsCursor: [...prev.getNewsPostsCursor, ...fetchMoreResult?.getNewsPostsCursor]
                };
            }
        });
    };

    return (
        <PageContainer>
            <InfiniteScroll loading={loading} loadMore={fetchMoreData} hasMore={hasMore}>
                {newsPosts?.map((item) => <NewsCard item={item} key={item.id} />)}
            </InfiniteScroll>

            {error && <div>Произошла ошибка. Пожалуйста, перезагрузите страницу!</div>}
            {!loading && !newsPosts.length && !error && <div>Новостей не найдено!</div>}

            {role === Role.Admin && (
                <>
                    <Teleporter.Source>
                        <AddEntityIcon onClick={openModal} />
                    </Teleporter.Source>

                    {isOpenModal && <NewsPostModal isOpen={isOpenModal} close={closeModal} />}
                </>
            )}
        </PageContainer>
    );
};

export default memo(NewsPage);
