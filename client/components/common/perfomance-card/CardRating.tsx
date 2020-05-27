import React, { memo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';

import { Rating } from 'client/types';
import { useStyles } from './styles';


interface Props {
    rating: Rating;
}

export const CardRating = memo(({ rating }: Props) => {
    const styles = useStyles();

    return (
        <Paper className={styles.rating}>
            <TableContainer>
                <Table size="small">
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
            </TableContainer>
        </Paper>
    );
});

export default CardRating;
