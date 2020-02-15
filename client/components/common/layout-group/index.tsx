import React, { memo, ReactNode } from 'react';
import { Container } from '@material-ui/core';

import cssStyles from './index.css';

interface Props {
    children?: ReactNode;
}

const LayoutGroup = ({ children }: Props) => {
    return (
        <Container className={cssStyles.layoutGroup}>
            {children}
        </Container>
    );
};

export default memo(LayoutGroup);
