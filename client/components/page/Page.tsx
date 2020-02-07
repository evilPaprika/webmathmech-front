import React, { memo } from 'react';
import { Container } from '@material-ui/core';

import LayoutHeader from '../common/layout-header';
import LayoutContent from '../common/layout-content';
import LayoutFooter from '../common/layout-footer';

const Page = () => (
    <Container>
        <LayoutHeader />
        <LayoutContent />
        <LayoutFooter />
    </Container>
);

export default memo(Page);
