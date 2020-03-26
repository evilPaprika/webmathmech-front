import React, { memo } from 'react';
import { Card } from '@material-ui/core';

import { useStyles } from './styles';


interface Props {
    children: React.ReactNode;
}

const CardItem = ({ children }: Props) => {
    const styles = useStyles();

    return (
        <Card className={styles.card} raised elevation={4}>
            {children}
        </Card>
    );
};

export default memo(CardItem);
