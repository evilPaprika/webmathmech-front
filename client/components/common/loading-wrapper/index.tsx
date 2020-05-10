import { Box, CircularProgress } from '@material-ui/core';
import React, { ReactNode } from 'react';


interface Props {
    loading: boolean;
    children: ReactNode;
}

export function LoadingWrapper({ loading, children }:Props) {
    return (
        <> {loading ? (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        ) : (
            children
        )}
        </>
    );
}
