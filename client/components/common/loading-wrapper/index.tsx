import { Box, CircularProgress, Fade } from '@material-ui/core';
import React, { ReactNode } from 'react';


interface Props {
    loading: boolean;
    children: ReactNode;
}

const LoadingWrapper = ({ loading, children }: Props) => (
    loading ? (
        <Box display="flex" justifyContent="center">
            <CircularProgress />
        </Box>
    ) : (
        <Fade mountOnEnter in>
            <div>
                {children}
            </div>
        </Fade>
    )
);


export default LoadingWrapper;
