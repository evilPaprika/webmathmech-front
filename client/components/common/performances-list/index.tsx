import { useQuery } from '@apollo/react-hooks';
import { Container } from '@material-ui/core';
import React, { memo, useState } from 'react';

import { GET_CURRENT_USER, GET_PERFORMANCE_POSTS_CURSOR } from '_apollo/queries';
import { PERFORMANCE_POSTS_LIMIT } from '_client/consts';
import { useModal } from '_client/hooks';
import {
    PerformancePaginationFiltersInput,
    PerformancePost,
    PerformancePostsCursorData,
    Role,
    UserData
} from '_client/types';
import AddEntityIcon from '_components/common/add-entity-icon';
import InfiniteScroll from '_components/common/infinite-scroll';
import PerformanceCard from '_components/common/perfomance-card';
import PerformancePostModal from '_components/common/performance-post-modal';
import Teleporter from '_components/common/teleporter';
import { PerformanceListContextProvider } from '_contexts/PerformanceList.context';


interface Props {
    filters?: PerformancePaginationFiltersInput;
}

const DEFAULT_PERFORMANCES_LIST: Array<PerformancePost> = [];

export const PerformancesList = memo(({ filters }: Props) => {
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isOpenModal, openModal, closeModal] = useModal();
    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const { data, fetchMore, error, loading, client } = useQuery<PerformancePostsCursorData>(
        GET_PERFORMANCE_POSTS_CURSOR, {
            variables: { filters, limit: PERFORMANCE_POSTS_LIMIT },
            fetchPolicy: 'cache-and-network'
        },
    );

    const items = data?.getPerformancePostsCursor || DEFAULT_PERFORMANCES_LIST;

    const fetchMoreData = () => {
        if (loading) {
            return;
        }
        setHasMore(false);

        const posts = client
            .readQuery<PerformancePostsCursorData>({
                query: GET_PERFORMANCE_POSTS_CURSOR,
                variables: { filters }
            })
            ?.getPerformancePostsCursor || [];
        const lastPost = posts[posts.length - 1];

        fetchMore({
            variables: { dateTimeCursor: lastPost.createdAt, limit: PERFORMANCE_POSTS_LIMIT, filters },
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
        <PerformanceListContextProvider filters={filters}>
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
        </PerformanceListContextProvider>
    );
});

export default PerformancesList;
