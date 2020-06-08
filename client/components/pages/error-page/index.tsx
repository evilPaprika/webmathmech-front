import React, { memo } from 'react';

import { PageContainer } from '_components/common';


const Error404 = () => {
    return (
        <PageContainer>
            Запрашиваемая вами страница не найдена!
        </PageContainer>
    );
};

export default memo(Error404);
