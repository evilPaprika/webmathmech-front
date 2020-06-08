import React, { memo } from 'react';

import { PageContainer, PerformancesList } from '_components/common';


export const AllPerformancesPage = memo(() => {
    return (
        <PageContainer>
            <PerformancesList />
        </PageContainer>
    );
});


export default AllPerformancesPage;
