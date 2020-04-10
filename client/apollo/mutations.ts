import { gql } from 'apollo-boost';


// Authorization
export const USER_SIGNUP = gql`
    mutation userSignUp($login: String!, $password: String!, $name: String!, $surname: String!) {
        userSignUp(login: $login, password: $password, name: $name, surname: $surname) {
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

export const AUTH_VK = gql`
    mutation authVk($code: String!) {
        authVk(code: $code) {
            token
        }
    }
`;

// News posts
export const CREATE_NEWS_POST = gql`
    mutation createNewsPost($text: String!, $pictureURL: String) {
        createNewsPost(text: $text, pictureURL: $pictureURL) {
            id
        }
    }
`;

export const REMOVE_NEWS_POST = gql`
    mutation removeNewsPost($id: String!) {
        removeNewsPost(id: $id)
    }
`;
