import React, { memo } from 'react';
import { useQuery } from 'react-apollo';
import { TableBody, TableCell, TableRow, Typography } from '@material-ui/core';

import { GET_CURRENT_USER } from 'apollo/queries';
import { PerformancePost, PerformancePostState, Role, UserData } from 'client/types';

import { Table } from '../table';
import CardRatingForVoting from './CardRatingForVoting';
import { useStyles } from './styles';


interface Props {
    performance: PerformancePost;
}

const AVAILABLE_ROLES_TO_VOTE: Array<Role | undefined> = [Role.Student, Role.Admin];

export const CardRating = memo((props: Props) => {
    const styles = useStyles();

    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const { role } = userData?.getCurrentUser || {};

    const { averageRating: rating, state } = props.performance;

    const isPollActive = state === PerformancePostState.Poll;
    const isRatingVisible = [PerformancePostState.PollFinished, PerformancePostState.Published].includes(state);

    if (isPollActive && AVAILABLE_ROLES_TO_VOTE.includes(role)) {
        return <CardRatingForVoting {...props} />;
    }

    if (!isRatingVisible) {
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
