import React, { memo } from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';


interface Props {
    children: React.ReactNode;
    loadMore(page: number): void;
    hasMore: boolean;
}

const Loader = <CircularProgress />;

const InfiniteScroll = (props: Props) => (
    <InfiniteScroller initialLoad={false} loader={Loader} threshold={10} {...props} />
);

export default memo(InfiniteScroll);
