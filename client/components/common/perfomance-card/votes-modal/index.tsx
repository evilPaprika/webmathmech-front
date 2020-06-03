import { TableCell, TableRow } from '@material-ui/core';
import React, { memo } from 'react';

import { PollVote } from '_client/types';

import { Modal } from '../../modal';
import Table from '../../table';


interface Props {
    votes: Array<PollVote>;
    isOpen: boolean;
    close(): void;
}

const DEFAULT_CELL = '—';

const COLUMNS = ['Имя', 'Фамилия', 'Форма', 'Содержание', 'Интерес'];

export const VotesModal = memo(({ votes, isOpen, close }: Props) => (
    <Modal title="Список проголосовавших" isOpen={isOpen} close={close}>
        <Table columns={COLUMNS}>
            {votes?.map((vote) => {
                const { user, rating } = vote;
                const { name, surname, id } = user || {};
                const { format, content, interest } = rating || {};

                return (
                    <TableRow key={id}>
                        <TableCell>{name || DEFAULT_CELL}</TableCell>
                        <TableCell>{surname || DEFAULT_CELL}</TableCell>
                        <TableCell>{format || DEFAULT_CELL}</TableCell>
                        <TableCell>{content || DEFAULT_CELL}</TableCell>
                        <TableCell>{interest || DEFAULT_CELL}</TableCell>
                    </TableRow>
                );
            })}
        </Table>
    </Modal>
));
