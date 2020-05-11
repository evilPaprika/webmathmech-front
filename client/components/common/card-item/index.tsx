import React, { memo } from 'react';
import { Box, Card } from '@material-ui/core';


interface Props {
    children: React.ReactNode;
}

const CardItem = ({ children }: Props) => {
    return (
        <Box my={4}>
            <Card variant="outlined">
                {children}
            </Card>
        </Box>
    );
};

export default memo(CardItem);
