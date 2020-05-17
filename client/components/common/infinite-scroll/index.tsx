import React, { memo } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';


interface Props {
    children: React.ReactNode;
    loadMore(page: number): void;
    hasMore: boolean;
    loading: boolean;
}

const Loader = <CircularProgress key={0} />;

export const InfiniteScroll = memo(({ loading, ...rest }: Props) => (
    <InfiniteScroller initialLoad={false} loader={loading ? Loader : undefined} {...rest} />
));

export default InfiniteScroll;
