import React, { memo } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';


interface Props {
    children: React.ReactNode;
    isLoading: boolean;
    [prop: string]: unknown;
}

const AsyncButton = ({ isLoading, children, ...otherProps }: Props) => (
    <Box textAlign="center">
        {isLoading
            ? <CircularProgress />
            : <Button {...otherProps}>{children}</Button>}
    </Box>
);

export default memo(AsyncButton);
