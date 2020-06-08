import React, { memo } from 'react';

import { PerformancePostState } from '_client/types';
import { PageContainer, PerformancesList } from '_components/common';


export const PublishedPerformancesPage = memo(() => {
    return (
        <PageContainer>
            <PerformancesList filters={{ states: [PerformancePostState.Published] }} />
        </PageContainer>
    );
});


export default PublishedPerformancesPage;
