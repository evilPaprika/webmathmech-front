import {
    Paper,
    Table as TableMUI,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from '@material-ui/core';
import React, { memo } from 'react';

import { Order } from '_client/types';

import LoadingWrapper from '../loading-wrapper';


export interface ColumnProps<T = string> {
    id?: T;
    title: string;
}

interface TableProps {
    children: React.ReactNode;
    size?: 'small' | 'medium';
    className?: string;
    loading?: boolean;
    columns?: Array<ColumnProps>;
    stickyHeader?: boolean;
    order?: Order;
    orderBy?: string;
    onRequestSort?: (event: React.MouseEvent<unknown>, property: any) => void;
}

export const Table = memo((props: TableProps) => {
    const {
        className,
        size = 'medium',
        children,
        loading,
        columns,
        stickyHeader,
        order,
        orderBy,
        onRequestSort
    } = props;

    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        if (onRequestSort) {
            onRequestSort(event, property);
        }
    };

    return (
        <Paper className={className}>
            <LoadingWrapper loading={Boolean(loading)}>
                <TableContainer>
                    <TableMUI size={size} stickyHeader={stickyHeader}>
                        {columns && (
                            <TableHead>
                                <TableRow>
                                    {columns.map(({ id, title }) => (
                                        <TableCell key={title} sortDirection={orderBy === id ? order : false}>
                                            {id ? (
                                                <TableSortLabel
                                                    active={orderBy === id}
                                                    direction={orderBy === id ? order : Order.Asc}
                                                    onClick={createSortHandler(id)}
                                                >
                                                    {title}
                                                </TableSortLabel>
                                            ) : title}
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
    );
});

export default Table;
