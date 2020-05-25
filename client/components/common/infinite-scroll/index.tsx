import React, { memo } from 'react';
import InfiniteScroller from 'react-infinite-scroller';

import LoadingWrapper from 'components/common/loading-wrapper';


interface Props {
    children: React.ReactNode;
    loadMore(page: number): void;
    hasMore: boolean;
    loading: boolean;
}

const Loader = () => <LoadingWrapper loading key={0} />;

export const InfiniteScroll = memo(({ loading, ...rest }: Props) => (
    <InfiniteScroller initialLoad={false} loader={loading ? <Loader /> : undefined} {...rest} />
));

export default InfiniteScroll;
