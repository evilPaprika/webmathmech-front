import { Box, CircularProgress, Fade } from '@material-ui/core';
import React, { ReactNode } from 'react';


interface Props {
    loading: boolean;
    children?: ReactNode;
}

const LoadingWrapper = ({ loading, children }: Props) => {
    const Loader = (
        <Box display="flex" justifyContent="center">
            <CircularProgress />
        </Box>
    );

    const Content = (children ? (
        <Fade mountOnEnter in>
            <div>
                {children}
            </div>
        </Fade>
    ) : <></>);

    return loading ? Loader : Content;
};


export default LoadingWrapper;
