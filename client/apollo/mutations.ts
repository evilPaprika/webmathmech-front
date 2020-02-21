import { gql } from 'apollo-boost';

export const USER_SIGNUP = gql`
    mutation userSignUp($login: String!, $password: String!) {
        userSignUp(login: $login, password: $password) {
            token
        }
    }
`;

export const USER_SIGNIN = gql`
    mutation userSignIn($login: String!, $password: String!) {
        userSignIn(login: $login, password: $password) {
            token
        }
    }
`;
