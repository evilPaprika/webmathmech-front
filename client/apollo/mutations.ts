import gql from 'graphql-tag';


// Authorization
export const USER_SIGNUP = gql`
    mutation ($login: String!, $password: String!, $name: String!, $surname: String!) {
        userSignUp(login: $login, password: $password, name: $name, surname: $surname) {
            token
        }
    }
`;

export const USER_SIGNIN = gql`
    mutation ($login: String!, $password: String!) {
        userSignIn(login: $login, password: $password) {
            token
        }
    }
`;

export const AUTH_VK = gql`
    mutation ($code: String!) {
        authVk(code: $code) {
            token
        }
    }
`;

// News posts
export const CREATE_NEWS_POST = gql`
    mutation ($description: String!, $pictureURL: String) {
        createNewsPost(description: $description, pictureURL: $pictureURL) {
            id
            description
            pictureURL
            createdAt
        }
    }
`;

export const PATCH_NEWS_POST = gql`
    mutation ($id: String!, $description: String!, $pictureURL: String) {
        patchNewsPost(id: $id, description: $description, pictureURL: $pictureURL) {
            id
            description
            pictureURL
            createdAt
        }
    }
`;

export const REMOVE_NEWS_POST = gql`
    mutation ($id: String!) {
        removeNewsPost(id: $id)
    }
`;

export const FILE_UPLOAD = gql`
    mutation ($file: Upload!) {
        fileUpload(file: $file)
    }
`;

export const PATCH_CURRENT_USER = gql`
    mutation ($name: String, $surname: String, $password: String, $universityGroup: String) {
        patchCurrentUser(name: $name, surname: $surname, password: $password, universityGroup: $universityGroup){
            id
        }
    }
`;

// Performance posts
export const CREATE_PERFORMANCE_POST = gql`
    mutation (
        $description: String!,
        $pictureURL: String,
        $videoURL: String,
        $state: PerformancePostState!
    ) {
        createPerformancePost(description: $description, pictureURL: $pictureURL, videoURL: $videoURL, state: $state) {
            id
        }
    }
`;


export const PATCH_PERFORMANCE_POST = gql`
    mutation (
        $id: String!,
        $description: String!,
        $pictureURL: String,
        $videoURL: String,
        $state: PerformancePostState!
    ) {
        patchPerformancePost(
            id: $id,
            description: $description,
            pictureURL: $pictureURL,
            videoURL: $videoURL,
            state: $state
        ) {
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

export const REMOVE_PERFORMANCE_POST = gql`
    mutation ($id: String!) {
        removePerformancePost(id: $id)
    }
`;
