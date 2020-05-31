import React, { memo } from 'react';
import { useQuery } from 'react-apollo';
import { TableBody, TableCell, TableRow, Typography } from '@material-ui/core';

import { GET_CURRENT_USER } from 'apollo/queries';
import { PerformancePost, PerformancePostState, Role, UserData } from 'client/types';

import { Table } from '../table';
import EditRatingForm from './EditRatingForm';
import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

const AVAILABLE_ROLES_TO_VOTE: Array<Role | undefined> = [Role.Student, Role.Admin];

export const CardRating = memo((props: Props) => {
    const styles = useStyles();

    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const performance = props.item;
    const { averageRating: rating, state } = performance;

    const isActivePoll = state === PerformancePostState.Poll;
    const isShownRating = [PerformancePostState.PollFinished, PerformancePostState.Published].includes(state);

    if (isActivePoll && AVAILABLE_ROLES_TO_VOTE.includes(role)) {
        return <EditRatingForm {...props} />;
    }

    if (!isShownRating) {
        return null;
    }

    return (
        <Table className={styles.rating} size="small">
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography>Форма</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{rating.format.toFixed(2)}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Содержание</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{rating.content.toFixed(2)}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Интерес</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{rating.interest.toFixed(2)}</Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
});

export default CardRating;
