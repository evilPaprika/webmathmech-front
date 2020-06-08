import { Container, TableCell, TableRow } from '@material-ui/core';
import moment from 'moment';
import React, { memo, useMemo } from 'react';
import { useQuery } from 'react-apollo';
import { sortBy } from 'sort-by-typescript';

import { GET_USERS_CURSOR } from '_apollo/queries';
import { ColumnProps } from '_client/components/common/table';
import { SortDirection, User, UsersDataCursor } from '_client/types';
import { ContainerBox, PageContainer, Table } from '_components/common';
import RemoveUserButton from '_components/pages/users-list-page/removeUserButton';
import UserRoleSelect from '_components/pages/users-list-page/userRoleSelect';


type UserKey = keyof User;

moment.locale('ru');
const USERS_LIMIT = 1000; // TODO Infinite scroll pagination (как в NewsPosts и PerformancePosts)

const COLUMNS: Array<ColumnProps<UserKey>> = [
    { id: 'name', title: 'Имя' },
    { id: 'surname', title: 'Фамилия' },
    { id: 'login', title: 'Логин' },
    { id: 'universityGroup', title: 'Группа' },
    { id: 'role', title: 'Роль' },
    { id: 'createdAt', title: 'Создан' },
    { title: '' },
];

const UsersPage = memo(() => {
    const { data, loading } = useQuery<UsersDataCursor>(
        GET_USERS_CURSOR,
        {
            variables: {
                limit: USERS_LIMIT,
                fetchPolicy: 'cache-and-network'
            }
        }
    );
    const users: Array<User> = data?.getUsersCursor || [];

    const [sortDirection, setSortDirection] = React.useState<SortDirection>(SortDirection.Asc);
    const [orderBy, setOrderBy] = React.useState<UserKey>('name');

    const handleSort = (_: React.MouseEvent<unknown>, property: UserKey) => {
        const isAsc = orderBy === property && sortDirection === SortDirection.Asc;
        setSortDirection(isAsc ? SortDirection.Desc : SortDirection.Asc);
        setOrderBy(property);
    };

    const sortedUsers = useMemo(
        () => users.sort(sortBy(sortDirection === SortDirection.Asc ? `${orderBy}^` : `-${orderBy}^`)),
        [users, sortDirection, orderBy]
    );

    return (
        <PageContainer maxWidth="1000px">
            <Container disableGutters>
                <ContainerBox gap="extra">
                    <Table
                        columnTitles={COLUMNS}
                        loading={loading}
                        stickyHeader
                        onSortRequest={handleSort}
                        sortDirection={sortDirection}
                        orderBy={orderBy}
                    >
                        {sortedUsers.map((user: User) => {
                            const { id, name, surname, login, universityGroup, role, createdAt } = user;

                            return (
                                <TableRow key={id} hover>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{surname}</TableCell>
                                    <TableCell>{login}</TableCell>
                                    <TableCell>{universityGroup || '—'}</TableCell>
                                    <TableCell>
                                        <UserRoleSelect id={id} defaultValue={role} />
                                    </TableCell>
                                    <TableCell>
                                        {moment(createdAt).fromNow()}
                                    </TableCell>
                                    <TableCell>
                                        <RemoveUserButton id={id} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </Table>
                </ContainerBox>
            </Container>
        </PageContainer>
    );
});

export default UsersPage;
