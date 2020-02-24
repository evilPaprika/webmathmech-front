import React, { memo } from 'react';
import { Container } from '@material-ui/core';

import LayoutHeader from '../common/layout-header';
import LayoutContent from '../common/layout-content';
import LayoutFooter from '../common/layout-footer';
import { HeaderTabs } from '../../types';


interface Props {
    selectedTab?: HeaderTabs;
}

const Page = ({ selectedTab }: Props) => {
    return (
        <Container disableGutters maxWidth={false}>
            <LayoutHeader selectedTab={selectedTab} />
            <LayoutContent selectedTab={selectedTab} />
            <LayoutFooter />
        </Container>
    );
};

export default memo(Page);
