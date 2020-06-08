import { useQuery } from '@apollo/react-hooks';
import { Box, Typography } from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import React, { memo, } from 'react';

import { GET_CURRENT_USER_PERFORMANCES } from '_apollo/queries';
import { PerformancePost, UserData } from '_client/types';
import { PageContainer, PerformanceCard, SnackbarErrorText } from '_components/common';


const DEFAULT_PERFORMANCES_LIST: Array<PerformancePost> = [];

export const PersonalPerformancesPage = memo(() => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, loading } = useQuery<UserData>(GET_CURRENT_USER_PERFORMANCES,
        {
            onError(error: ApolloError) {
                const title = 'Произошла ошибка при выполнении запроса ваших выступлений';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            },
            fetchPolicy: 'cache-and-network'
        });

    const items = data?.getCurrentUser.performances || DEFAULT_PERFORMANCES_LIST;

    return (
        <PageContainer>
            {items.map((item) => <PerformanceCard item={item} key={item.id} />)}
            {!loading && !items.length && (
                <Box mt={4}>
                    <Typography variant="h4" align="center">
                        Выступлений не найдено!
                    </Typography>
                </Box>
            )}
        </PageContainer>
    );
});

export default PersonalPerformancesPage;
