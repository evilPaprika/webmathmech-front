import gql from 'graphql-tag';


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

export const FILE_UPLOAD = gql`
    mutation($file: Upload!) {
        fileUpload(file: $file)
    }
`;

export const PATCH_CURRENT_USER = gql`
    mutation($name: String, $surname: String, $password: String) {
        patchCurrentUser(name: $name, surname: $surname, password: $password){
            id
        }
    }
`;

// Performance posts
export const CREATE_PERFORMANCE_POST = gql`
    mutation createPerformancePost(
        $text: String!,
        $pictureURL: String,
        $videoURL: String,
        $state: PerformancePostState!
    ) {
        createPerformancePost(text: $text, pictureURL: $pictureURL, videoURL: $videoURL, state: $state) {
            id
        }
    }
`;
