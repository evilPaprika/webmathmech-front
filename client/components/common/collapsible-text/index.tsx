import React, { memo, useMemo } from 'react';
import { Button, Typography } from '@material-ui/core';

import { useToggle } from 'client/hooks';
import { trimText } from 'client/utils';


interface Props {
    text: string;
    minLengthToCollapse?: number;
    Component?: React.ElementType;
    className?: string;
}

const MIN_TEXT_TO_COLLAPSE = 200;


export const CollapsibleText = memo((props: Props) => {
    const [collapsed, changeCollapsed] = useToggle();

    const { text, minLengthToCollapse = MIN_TEXT_TO_COLLAPSE, Component = Typography, className } = props;
    const isTrimmed = text.length >= minLengthToCollapse;
    const trimmedText = useMemo(
        () => (collapsed || !isTrimmed ? text : trimText(text, minLengthToCollapse)),
        [text, collapsed]
    );

    return (
        <Component className={className}>
            {trimmedText}
            {' '}
            {isTrimmed && (
                <Button color="secondary" onClick={changeCollapsed} size="small">
                    {collapsed ? 'Скрыть' : 'Показать еще'}
                </Button>
            )}
        </Component>
    );
});


export default CollapsibleText;
