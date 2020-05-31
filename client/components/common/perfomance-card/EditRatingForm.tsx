import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { Button, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import RatingMUI from '@material-ui/lab/Rating';

import { VOTE_CURRENT_USER } from 'apollo/mutations';
import { FIND_VOTE_CURRENT_USER } from 'apollo/queries';
import { useToggle } from 'client/hooks';
import { FindVoteCurrentUserData, PerformancePost, PollVote, QueryFindVoteCurrentUserArgs, Rating } from 'client/types';
import { SnackbarErrorText } from 'components/common/snackbar-error-text';

import { AsyncTable } from '../table';
import { useStyles } from './styles';


interface Props {
    item: PerformancePost;
}

type RatingState = Rating;

const DEFAULT_RATING: RatingState = {
    format: 0,
    content: 0,
    interest: 0
};

const EditRatingForm = memo(({ item: { id } }: Props) => {
    const styles = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [rating, setRating] = useState<RatingState>(DEFAULT_RATING);
    const { format, content, interest } = rating;

    const [isActivePoll, changeIsActivePoll] = useToggle(true);

    const { data, loading } = useQuery<FindVoteCurrentUserData, QueryFindVoteCurrentUserArgs>(
        FIND_VOTE_CURRENT_USER,
        { variables: { performanceId: id } }
    );

    const voteData = data?.findVoteCurrentUser || {} as PollVote;

    useEffect(() => {
        if (data) {
            setRating(voteData.rating);
            changeIsActivePoll(false);
        }
    }, [data, loading]);

    const changeFormat = (_: React.ChangeEvent<{}>, value: number | null) => {
        setRating({ ...rating, format: value || DEFAULT_RATING.format });
    };

    const changeContent = (_: React.ChangeEvent<{}>, value: number | null) => {
        setRating({ ...rating, content: value || DEFAULT_RATING.content });
    };

    const changeInterest = (_: React.ChangeEvent<{}>, value: number | null) => {
        setRating({ ...rating, interest: value || DEFAULT_RATING.interest });
    };

    const [vote] = useMutation(VOTE_CURRENT_USER, {
        variables: { performanceId: id, rating },
        onCompleted: () => {
            changeIsActivePoll(false);
            enqueueSnackbar('Ваш голос успешно сохранён!', { variant: 'success' });
        },
        onError(error: ApolloError) {
            const title = 'Произошла ошибка при отправке голоса. Попробуйте снова!';

            enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
        }
    });

    const submit = () => {
        const variables = { performanceId: id, rating };

        vote({ variables });
    };

    return (
        <AsyncTable className={styles.rating} size="small" loading={loading}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography>Форма</Typography>
                        <RatingMUI
                            value={format}
                            disabled={!isActivePoll}
                            name={`format-${id}`}
                            max={10}
                            size="small"
                            onChange={changeFormat}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Содержание</Typography>
                        <RatingMUI
                            value={content}
                            disabled={!isActivePoll}
                            name={`content-${id}`}
                            max={10}
                            size="small"
                            onChange={changeContent}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Интерес</Typography>
                        <RatingMUI
                            value={interest}
                            disabled={!isActivePoll}
                            name={`interest-${id}`}
                            max={10}
                            size="small"
                            onChange={changeInterest}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">
                        {isActivePoll
                            ? (
                                <Button variant="outlined" color="secondary" fullWidth onClick={submit}>
                                    Проголосовать
                                </Button>
                            ) : <Typography>Ваш голос засчитан!</Typography>}
                    </TableCell>
                </TableRow>
            </TableBody>
        </AsyncTable>
    );
});

export default EditRatingForm;
