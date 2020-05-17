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
            role
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
            description
            pictureURL
            createdAt
        }
    }
`;


export const FIND_NEWS_POST = gql`
    query findNewsPost($id: String!) {
        findNewsPost(id: $id) {
            id
            description
            pictureURL
        }
    }
`;

export const GET_PERFORMANCE_POSTS = gql`
    query getPerformancePosts($limit: Int!, $offset: Int!, $order: [String!]) {
        getPerformancePosts(params: { limit: $limit, offset: $offset, order: $order }) {
            id
            description
            pictureURL
            videoURL
            createdAt
            state
            averageRating {
                format
                content
                interest
            }
        }
    }
`;

export const FIND_PERFORMANCE_POST = gql`
    query findPerformancePost($id: String!) {
        findPerformancePost(id: $id) {
            id
            description
            pictureURL
            videoURL
            createdAt
            state
            averageRating {
                format
                content
                interest
            }
        }
    }
`;
