import { Container, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import React, { memo } from 'react';
import { useQuery } from 'react-apollo';

import { GET_USERS } from '_apollo/queries';
import { ColumnProps } from '_client/components/common/table';
import { Order, User, UsersData } from '_client/types';
import { descendingComparator, sortData } from '_client/utils';
import { ContainerBox, Table } from '_components/common';


type UserKey = keyof Omit<User, '__typename'>;

const USERS_LIMIT = 100;

const COLUMNS: Array<ColumnProps<UserKey>> = [
    { id: 'name', title: 'Имя' },
    { id: 'surname', title: 'Фамилия' },
    { id: 'login', title: 'Логин' },
    { id: 'universityGroup', title: 'Группа' },
    { id: 'role', title: 'Роль' },
    { title: '' },
];

const getComparator = (order: Order, orderBy: string): (a: any, b: any) => number => (order === Order.Desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));

const UsersPage = memo(() => {
    const { data, loading } = useQuery<UsersData>(GET_USERS, { variables: { limit: USERS_LIMIT } });
    const users: Array<User> = data?.getUsers || [];

    const [order, setOrder] = React.useState<Order>(Order.Asc);
    const [orderBy, setOrderBy] = React.useState<UserKey>('name');

    const handleRequestSort = (_: React.MouseEvent<unknown>, property: UserKey) => {
        const isAsc = orderBy === property && order === Order.Asc;
        setOrder(isAsc ? Order.Desc : Order.Asc);
        setOrderBy(property);
    };

    return (
        <Container disableGutters>
            <ContainerBox gap="extra">
                <Table
                    columns={COLUMNS}
                    loading={loading}
                    stickyHeader
                    onRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                >
                    {sortData<User>(users, getComparator(order, orderBy)).map((user: User) => {
                        const { id, name, surname, login, universityGroup, role } = user;

                        return (
                            <TableRow key={id} hover>
                                <TableCell>{name}</TableCell>
                                <TableCell>{surname}</TableCell>
                                <TableCell>{login}</TableCell>
                                <TableCell>{universityGroup || '—'}</TableCell>
                                <TableCell>{role}</TableCell>
                                <TableCell><DeleteIcon /></TableCell>
                            </TableRow>
                        );
                    })}
                </Table>
            </ContainerBox>
        </Container>
    );
});

export default UsersPage;
