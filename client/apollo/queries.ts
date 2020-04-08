import gql from 'graphql-tag';


export const FIND_USER = gql`
    query findUser($login: String!) {
        findUser(login: $login) {
            name
            surname
            login
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser {
        getCurrentUser {
            name
            surname
            login
            createdAt
            updatedAt
        }
    }
`;

export const GET_IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

export const GET_NEWS_POSTS = gql`
    query getNewsPosts($limit: Int!, $offset: Int!, $order: [String!]) {
        getNewsPosts(params: { limit: $limit, offset: $offset, order: $order }) {
            id
            text
            pictureURL
        }
    }
`;
