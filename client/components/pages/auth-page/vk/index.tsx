import { ApolloError } from 'apollo-client';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { memo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { CircularProgress, Container, Typography } from '@material-ui/core';

import { AUTH_VK } from 'apollo/mutations';
import { GET_CURRENT_USER } from 'apollo/queries';
import { SnackbarErrorText } from 'components/common';


export const AuthVk = memo(() => {
    const location = useLocation();
    const history = useHistory();
    const client = useApolloClient();
    const { enqueueSnackbar } = useSnackbar();
    const { refetch } = useQuery(GET_CURRENT_USER);
    const [authVk, { loading }] = useMutation(
        AUTH_VK,
        {
            async onCompleted(response) {
                const { token }: { token: string } = response.authVk;
                localStorage.setItem('token', token);
                client.writeData({ data: { isLoggedIn: true } });
                await refetch();
            },
            onError: (error: ApolloError) => {
                const title = 'Произошла ошибка 😢';

                enqueueSnackbar(<SnackbarErrorText title={title} error={error} />, { variant: 'error' });
            }
        }
    );
    useEffect(() => {
        const { code } = queryString.parse(location.search);
        authVk({ variables: { code } })
            .then(() => history.goBack());
    }, []);

    return (
        <Container>
            <Typography>Мы аутентифицируем вас с помощью сервиса вконтакте. Подождите, пожалуйста</Typography>
            {loading && <CircularProgress />}
        </Container>
    );
});
