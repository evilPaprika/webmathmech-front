import React, { memo } from 'react';
import { Paper, Table as TableMUI, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import LoadingWrapper from '../loading-wrapper';


interface TableProps {
    children: React.ReactNode;
    size?: 'small' | 'medium';
    className?: string;
    loading?: boolean;
    columns?: Array<React.ReactNode>;
}

export const Table = memo(({ className, size = 'medium', children, loading, columns }: TableProps) => (
    <Paper className={className}>
        <LoadingWrapper loading={Boolean(loading)}>
            <TableContainer>
                <TableMUI size={size}>
                    {columns && (
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell key={index}>
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {children}
                    </TableBody>
                </TableMUI>
            </TableContainer>
        </LoadingWrapper>
    </Paper>
));

export default Table;
