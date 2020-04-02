import React, { memo, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { AUTH_VK } from 'apollo/mutations';
import { GET_CURRENT_USER } from 'apollo/queries';


export const AuthVk = memo(() => {
    const location = useLocation();
    const history = useHistory();
    const client = useApolloClient();
    const { refetch } = useQuery(GET_CURRENT_USER);
    const [authVk, { loading, error }] = useMutation(
        AUTH_VK,
        {
            async onCompleted(response) {
                const { token }: { token: string; } = response.authVk;
                localStorage.setItem('token', token);
                client.writeData({ data: { isLoggedIn: true } });
                await refetch();
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
            <Typography>Сейчас мы вас аутентифицируем с помошью вконтакте, подождите пожалуйста</Typography>
            {loading && <CircularProgress />}
            {error && <Typography color="error">Произошла ошибка 😢</Typography>}
        </Container>
    );
});
