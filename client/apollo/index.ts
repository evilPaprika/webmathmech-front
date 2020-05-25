/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';


const cache = new InMemoryCache();

const request = (operation: any) => {
    const token = localStorage.getItem('token');
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });
};

const requestLink = new ApolloLink(
    (operation, forward) => new Observable((observer) => {
        let handle: any;
        Promise
            .resolve(operation)
            .then((oper) => request(oper))
            .then(() => {
                handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
            .catch(observer.error.bind(observer));

        return () => {
            if (handle) {
                handle.unsubscribe();
            }
        };
    })
);

export default new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            graphQLErrors?.forEach(({ message, locations, path }) => console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),);
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        }),
        requestLink,
        createUploadLink({
            uri: '/graphql',
            credentials: 'same-origin',
        }),
    ]),
    cache,
    resolvers: {}
});

cache.writeData({
    data: {
        isLoggedIn: Boolean(localStorage.getItem('token')),
    },
});
