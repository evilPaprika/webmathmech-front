import React from 'react';
import { Box, BoxProps } from '@material-ui/core';

import { useStyles } from './styles';


type GapType = 'small' | 'medium' | 'large' | 'none';

interface OwnProps {
    children?: React.ReactNode;
    gap?: GapType;
}

type Props = OwnProps & BoxProps;

export const ContainerBox = (props: Props) => {
    const styles: Record<string, string> = useStyles();
    const { children, gap = 'medium', ...otherProps } = props;

    return (
        <Box className={styles[`gap_${gap}`]} {...otherProps}>
            {children}
        </Box>
    );
};

export default ContainerBox;
