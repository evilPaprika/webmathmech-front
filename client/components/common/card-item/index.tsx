import React, { memo } from 'react';
import { Card } from '@material-ui/core';

import { useStyles } from './styles';


interface Props {
    children: React.ReactNode;
}

const CardItem = ({ children }: Props) => {
    const styles = useStyles();

    return (
        <Card className={styles.card} variant="outlined">
            {children}
        </Card>
    );
};

export default memo(CardItem);
