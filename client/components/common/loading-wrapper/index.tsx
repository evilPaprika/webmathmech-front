import { Box, CircularProgress, Fade } from '@material-ui/core';
import React, { ReactNode } from 'react';


interface Props {
    loading: boolean;
    children?: ReactNode;
}

const Loader = (
    <Box display="flex" justifyContent="center">
        <CircularProgress />
    </Box>
);

const LoadingWrapper = ({ loading, children }: Props) => {
    const Content = (children ? (
        <Fade mountOnEnter in>
            <div>
                {children}
            </div>
        </Fade>
    ) : null);

    return loading ? Loader : Content;
};


export default LoadingWrapper;
