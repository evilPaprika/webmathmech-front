import { Button, Typography } from '@material-ui/core';
import React, { memo, useMemo } from 'react';

import { useToggle } from '_client/hooks';
import { truncateText } from '_client/utils';


interface Props {
    text?: string | null;
    minLengthToCollapse?: number;
    Component?: React.ElementType;
    className?: string;
    [x: string]: any;
}

const MIN_TEXT_LENGTH_TO_COLLAPSE = 200;


export const CollapsibleText = memo((props: Props) => {
    const {
        text = '',
        minLengthToCollapse = MIN_TEXT_LENGTH_TO_COLLAPSE,
        Component = Typography,
        className,
        ...other
    } = props;

    const [collapsed, toggleCollapsed] = useToggle();

    const canCollapse = text && text.length >= minLengthToCollapse;
    const truncatedText = useMemo(
        () => ((collapsed || !canCollapse) ? text : truncateText(text!, minLengthToCollapse)),
        [text, collapsed]
    );

    return truncatedText ? (
        <Component className={className} {...other}>
            {truncatedText}
            {' '}
            {canCollapse && (
                <Button color="secondary" onClick={() => toggleCollapsed()} size="small">
                    {collapsed ? 'Скрыть' : 'Показать еще'}
                </Button>
            )}
        </Component>
    ) : null;
});


export default CollapsibleText;
