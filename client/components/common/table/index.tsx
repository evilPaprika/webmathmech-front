import React, { memo } from 'react';
import { Paper, Table as TableMUI, TableContainer } from '@material-ui/core';

import LoadingWrapper from '../loading-wrapper';


interface TableProps {
    children: React.ReactNode;
    size?: 'small' | 'medium';
    className?: string;
    loading?: boolean;
}

export const Table = memo(({ className, size = 'medium', children, loading }: TableProps) => (
    <Paper className={className}>
        <LoadingWrapper loading={Boolean(loading)}>
            <TableContainer>
                <TableMUI size={size}>
                    {children}
                </TableMUI>
            </TableContainer>
        </LoadingWrapper>
    </Paper>
));

export default Table;
