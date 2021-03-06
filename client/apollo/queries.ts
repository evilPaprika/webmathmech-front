import gql from 'graphql-tag';

/* User queries */
export const GET_USERS_CURSOR = gql`
    query ($limit: Int, $dateTimeCursor: DateTime, $sequelizeWhere: JSONObject) {
        getUsersCursor(
            limit: $limit,
            dateTimeCursor: $dateTimeCursor,
            sequelizeWhere: $sequelizeWhere
        )
        @connection(key: "getUsersCursor") {
            name
            surname
            id
            login
            universityGroup
            role
            createdAt
        }
    }
`;

export const FIND_USER = gql`
    query ($login: String!) {
        findUser(login: $login) {
            name
            surname
            id
            login
            universityGroup
            role
            createdAt
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            name
            surname
            login
            role
            universityGroup
            createdAt
            updatedAt
        }
    }
`;

export const GET_CURRENT_USER_PERFORMANCES = gql`
    query {
        getCurrentUser {
            performances {
                id
                title
                description
                pictureURL
                videoURL
                createdAt
                state
                pollVotes {
                    rating {
                        format
                        content
                        interest
                    }
                }
                speaker {
                    id
                    name
                    surname
                }
                averageRating {
                    format
                    content
                    interest
                }
            }
        }
    }
`;

export const GET_IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

/* News posts queries */
export const GET_NEWS_POSTS = gql`
    query ($limit: Int, $offset: Int!, $order: [String!]) {
        getNewsPosts(params: { limit: $limit, offset: $offset, order: $order }) @connection(key: "getNewsPosts") {
            id
            description
            pictureURL
            createdAt
        }
    }
`;

export const GET_NEWS_POSTS_CURSOR = gql`
    query ($limit: Int, $dateTimeCursor: DateTime) {
        getNewsPostsCursor(
            limit: $limit, 
            dateTimeCursor: $dateTimeCursor
        ) 
        @connection(key: "getNewsPostsCursor") {
            id
            description
            pictureURL
            createdAt
        }
    }
`;

export const FIND_NEWS_POST = gql`
    query ($id: String!) {
        findNewsPost(id: $id) {
            id
            description
            pictureURL
        }
    }
`;

/* Performances posts queries */
export const GET_PERFORMANCE_POSTS_CURSOR = gql`
    query ($limit: Int, $dateTimeCursor: DateTime, $sequelizeWhere: JSONObject) {
        getPerformancePostsCursor(
            limit: $limit, 
            dateTimeCursor: $dateTimeCursor,
            sequelizeWhere: $sequelizeWhere
        ) @connection(key: "getPerformancePostsCursor", filter: ["sequelizeWhere"]) {
            id
            title
            description
            pictureURL
            videoURL
            createdAt
            state
            pollVotes {
                rating {
                    format
                    content
                    interest
                }
                user {
                    id
                    name
                    surname
                }
            }
            speaker {
                id
                name
                surname
            }
            averageRating {
                format
                content
                interest
            }
        }
    }
`;

export const FIND_PERFORMANCE_POST = gql`
    query ($id: String!) {
        findPerformancePost(id: $id) {
            id
            title
            description
            pictureURL
            videoURL
            createdAt
            state
            pollVotes {
                rating {
                    format
                    content
                    interest
                }
                user {
                    id
                    name
                    surname
                }
            }
            speaker {
                id
                name
                surname
            }
            averageRating {
                format
                content
                interest
            }
        }
    }
`;

export const FIND_VOTE_CURRENT_USER = gql`
    query ($performanceId: String!) {
        findVoteCurrentUser(performanceId: $performanceId) {
            user {
                id
            }
            performance {
                id
            }
            rating {
                format
                content
                interest
            }
            createdAt
        }
    }
`;

export const GET_ACTIVE_POLLS = gql`
    query {
        getActivePerformancePostsCount
    }
`;
