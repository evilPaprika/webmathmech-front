import React, { memo } from 'react';
import { Box, Card } from '@material-ui/core';


interface Props {
    children: React.ReactNode;
}

export const CardItem = memo(({ children }: Props) => {
    return (
        <Box my={4}>
            <Card variant="outlined">
                {children}
            </Card>
        </Box>
    );
});

export default CardItem;
