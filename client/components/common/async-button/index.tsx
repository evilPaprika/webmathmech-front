import { Box, Button, ButtonProps, CircularProgress } from '@material-ui/core';
import React, { memo } from 'react';


type Props = ButtonProps & {
    children: React.ReactNode;
    isLoading: boolean;
};

export const AsyncButton = memo(({ isLoading, children, ...otherProps }: Props) => (
    <Box textAlign="center">
        {isLoading
            ? <CircularProgress />
            : <Button {...otherProps}>{children}</Button>}
    </Box>
));

export default AsyncButton;
