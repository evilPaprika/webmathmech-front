import React, { memo } from 'react';
import { Paper, Table as TableMUI, TableContainer } from '@material-ui/core';

import LoadingWrapper from '../loading-wrapper';


interface TableProps {
    size?: 'small' | 'medium';
    className?: string;
    children: React.ReactNode;
}

export const Table = memo(({ className, size = 'medium', children }: TableProps) => (
    <Paper className={className}>
        <TableContainer>
            <TableMUI size={size}>
                {children}
            </TableMUI>
        </TableContainer>
    </Paper>
));


interface AsyncTableProps extends TableProps {
    loading: boolean;
}

export const AsyncTable = memo(({ loading, className, size = 'medium', children }: AsyncTableProps) => (
    <Paper className={className}>
        <LoadingWrapper loading={loading}>
            <TableContainer>
                <TableMUI size={size}>
                    {children}
                </TableMUI>
            </TableContainer>
        </LoadingWrapper>
    </Paper>
));
