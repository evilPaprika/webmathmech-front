import React, { memo, useState } from 'react';
import { Container } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import { GET_PERFORMANCE_POSTS_CURSOR, GET_CURRENT_USER } from 'apollo/queries';
import { GET_PERFORMANCES_POST_QUERY_DEFAULT, PERFORMANCE_POSTS_LIMIT } from 'client/consts';
import { useModal } from 'client/hooks';
import { PerformancePost, PerformancePostsCursorData, Role, UserData } from 'client/types';
import { AddEntityIcon, InfiniteScroll, Teleporter, PerformanceCard, PerformancePostModal } from 'components/common';


const DEFAULT_PERFORMANCES_LIST: Array<PerformancePost> = [];

export const PerformancesPage = memo(() => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isOpenModal, openModal, closeModal] = useModal();
    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const { data, fetchMore, error, loading, client } = useQuery<PerformancePostsCursorData>(
        GET_PERFORMANCE_POSTS_CURSOR, {
            variables: GET_PERFORMANCES_POST_QUERY_DEFAULT.variables
        }
    );

    const items = data?.getPerformancePostsCursor || DEFAULT_PERFORMANCES_LIST;

    const fetchMoreData = () => {
        setHasMore(false);

        const posts = client
            .readQuery<PerformancePostsCursorData>({ query: GET_PERFORMANCE_POSTS_CURSOR })
            ?.getPerformancePostsCursor || [];
        const lastPost = posts[posts.length - 1];

        fetchMore({
            variables: { dateTimeCursor: lastPost.createdAt, limit: PERFORMANCE_POSTS_LIMIT },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult?.getPerformancePostsCursor?.length) {
                    return prev;
                }

                setHasMore(true);

                return {
                    getPerformancePostsCursor: [
                        ...prev.getPerformancePostsCursor,
                        ...fetchMoreResult?.getPerformancePostsCursor
                    ]
                };
            }
        });
    };

    return (
        <Container disableGutters>
            <InfiniteScroll loading={loading} loadMore={fetchMoreData} hasMore={hasMore}>
                {items.map((item) => <PerformanceCard item={item} key={item.id} />)}
            </InfiniteScroll>

            {error && <div>Произошла ошибка. Пожалуйста, перезагрузите страницу!</div>}
            {!loading && !items.length && !error && <div>Выступлений не найдено!</div>}

            {role === Role.Admin && (
                <>
                    <Teleporter.Source>
                        <AddEntityIcon onClick={openModal} />
                    </Teleporter.Source>

                    {isOpenModal && <PerformancePostModal isOpen={isOpenModal} close={closeModal} />}
                </>
            )}
        </Container>
    );
});

export default PerformancesPage;
