import React, { memo, ReactNode } from 'react';
import { Container } from '@material-ui/core';

import { useStyles } from './styles';


interface Props {
    children?: ReactNode;
}

const LayoutGroup = ({ children }: Props) => {
    const styles = useStyles();

    return (
        <Container className={styles.layoutGroup}>
            {children}
        </Container>
    );
};

export default memo(LayoutGroup);
