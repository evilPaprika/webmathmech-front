import gql from 'graphql-tag';


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

export const CREATE_NEWS_POST = gql`
    mutation createNewsPost($text: String!, $pictureURL: String) {
        createNewsPost(text: $text, pictureURL: $pictureURL) {
            id
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

export const FILE_UPLOAD = gql`
    mutation($file: Upload!) {
        fileUpload(file: $file)
    }
`;
