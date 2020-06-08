import { Box } from '@material-ui/core';
import React, { memo } from 'react';


interface Props {
    children: React.ReactNode;
    maxWidth?: string;
}

export const PageContainer = memo(({ children, maxWidth = '850px' }: Props) => {
    return (
        <Box maxWidth={maxWidth} m="auto">
            <Box width="100%">
                {children}
            </Box>
        </Box>
    );
});

export default PageContainer;
