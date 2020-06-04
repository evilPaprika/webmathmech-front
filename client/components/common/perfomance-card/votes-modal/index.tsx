import { TableCell, TableRow } from '@material-ui/core';
import React, { memo } from 'react';

import { PollVote } from '_client/types';
import { getFullName } from '_client/utils';

import { Modal } from '../../modal';
import Table, { ColumnProps } from '../../table';


interface Props {
    votes: Array<PollVote>;
    isOpen: boolean;
    close(): void;
}

const DEFAULT_CELL = '—';

const COLUMNS: Array<ColumnProps> = [
    { title: 'Имя и фамилия' },
    { title: 'Форма' },
    { title: 'Содержание' },
    { title: 'Интерес' },
];

export const VotesModal = memo(({ votes, isOpen, close }: Props) => (
    <Modal title="Список проголосовавших" isOpen={isOpen} close={close}>
        <Table columnTitles={COLUMNS}>
            {votes?.map((vote) => {
                const { user, rating } = vote;
                const { format, content, interest } = rating || {};

                return (
                    <TableRow key={user?.id}>
                        <TableCell>{getFullName(user) || DEFAULT_CELL}</TableCell>
                        <TableCell>{format || DEFAULT_CELL}</TableCell>
                        <TableCell>{content || DEFAULT_CELL}</TableCell>
                        <TableCell>{interest || DEFAULT_CELL}</TableCell>
                    </TableRow>
                );
            })}
        </Table>
    </Modal>
));
