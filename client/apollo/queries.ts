import { gql } from 'apollo-boost';

export const FIND_USER = gql`
    query findUser($login: String!) {
        findUser(login: $login) {
            login
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser {
        getCurrentUser {
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
