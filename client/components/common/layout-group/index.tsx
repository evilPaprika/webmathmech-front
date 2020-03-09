import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';
import { Container } from '@material-ui/core';

import { useStyles } from './styles';


enum Size {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
}

interface Props {
    children?: ReactNode;
    className?: string;
    margin?: Size | string | null;
}

const getMarginClass = (marginType: string) => {
    const availableMarginTypes: Array<string> = Object.values(Size);

    if (availableMarginTypes.includes(marginType)) {
        return `margin_${marginType}`;
    }

    return 'margin_no';
};

const LayoutGroup = ({ children, className, margin = Size.Large }: Props) => {
    const styles: any = useStyles();
    const marginType = getMarginClass(String(margin));

    return (
        <Container className={clsx(className, styles[marginType])}>
            {children}
        </Container>
    );
};

export default memo(LayoutGroup);
