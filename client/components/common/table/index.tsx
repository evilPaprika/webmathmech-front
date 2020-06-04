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

import { SortDirection } from '_client/types';

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
    columnTitles?: Array<ColumnProps>;
    stickyHeader?: boolean;
    order?: SortDirection;
    orderBy?: string;
    onSortRequest?: (event: React.MouseEvent<unknown>, property: any) => void;
}

export const Table = memo((props: TableProps) => {
    const {
        className,
        size = 'medium',
        children,
        loading,
        columnTitles,
        stickyHeader,
        order,
        orderBy,
        onSortRequest
    } = props;

    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        if (onSortRequest) {
            onSortRequest(event, property);
        }
    };

    return (
        <Paper className={className}>
            <LoadingWrapper loading={Boolean(loading)}>
                <TableContainer>
                    <TableMUI size={size} stickyHeader={stickyHeader}>
                        {columnTitles && (
                            <TableHead>
                                <TableRow>
                                    {columnTitles.map(({ id, title }) => (
                                        <TableCell key={title} sortDirection={orderBy === id ? order : false}>
                                            {id ? (
                                                <TableSortLabel
                                                    active={orderBy === id}
                                                    direction={orderBy === id ? order : SortDirection.Asc}
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
