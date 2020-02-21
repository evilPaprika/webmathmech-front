import ApolloClient, { InMemoryCache, NormalizedCacheObject } from 'apollo-boost';


const cache = new InMemoryCache();

export default new ApolloClient<NormalizedCacheObject>({
    uri: '/graphql',
    cache,
    request: (operation) => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : ''
            }
        });
    },
});

cache.writeData({
    data: {
        isLoggedIn: Boolean(localStorage.getItem('token')),
    },
});
