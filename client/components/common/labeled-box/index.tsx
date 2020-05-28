import React, { memo } from 'react';
import { Box } from '@material-ui/core';

import ContainerBox, { Props as ContainerBoxProps } from '../container-box';


interface OwnProps {
    label?: string;
    children?: React.ReactNode;
}

type Props = OwnProps & ContainerBoxProps;


export const LabeledBox = memo(({ label, children, ...otherProps }: Props) => {
    return (
        <ContainerBox display="flex" {...otherProps}>
            <Box width="100px">{label}</Box>
            {children}
        </ContainerBox>
    );
});

export default LabeledBox;
