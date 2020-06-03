import React, { memo } from 'react';

import { PerformancePostState } from '_client/types';
import PerformancesList from '_components/common/performances-list';


export const PublishedPerformancesPage = memo(() => {
    return (
        <PerformancesList filters={{ states: [PerformancePostState.Published] }} />
    );
});


export default PublishedPerformancesPage;
