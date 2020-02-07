import React, { memo, ReactNode } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    children?: ReactNode;
}

const useStyles = makeStyles({
    layoutGroup: {
        margin: '0 0 40px'
    },
});

const LayoutGroup = ({ children }: Props) => {
    const styles = useStyles();

    return (
        <Container className={styles.layoutGroup}>
            {children}
        </Container>
    );
};

export default memo(LayoutGroup);
