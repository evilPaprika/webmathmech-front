import React, { memo } from 'react';
import { Container } from '@material-ui/core';

import LayoutHeader from '../layout-header';
import LayoutFooter from '../layout-footer';


interface Props {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <Container disableGutters maxWidth={false}>
            <LayoutHeader />
            {children}
            <LayoutFooter />
        </Container>
    );
};

export default memo(Layout);
