export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};


export type Mutation = {
    __typename?: 'Mutation';
    userSignIn: Token;
    userSignUp: Token;
    authVk: Token;
    createNewsPost: NewsPost;
    patchNewsPost: NewsPost;
    removeNewsPost: Scalars['Boolean'];
    patchCurrentUser: User;
    patchUser: User;
    createPerformancePost: PerformancePost;
    patchPerformancePost: PerformancePost;
    removePerformancePost: Scalars['Boolean'];
    fileUpload: Scalars['String'];
    removeUser: Scalars['Boolean'];
};


export type MutationUserSignInArgs = {
    login: Scalars['String'];
    password: Scalars['String'];
};


export type MutationUserSignUpArgs = {
    name: Scalars['String'];
    surname: Scalars['String'];
    login: Scalars['String'];
    password: Scalars['String'];
};


export type MutationAuthVkArgs = {
    code: Scalars['String'];
};


export type MutationCreateNewsPostArgs = {
    description: Scalars['String'];
    pictureURL?: Maybe<Scalars['String']>;
};


export type MutationPatchNewsPostArgs = {
    id: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    pictureURL?: Maybe<Scalars['String']>;
};


export type MutationRemoveNewsPostArgs = {
    id: Scalars['String'];
};


export type MutationPatchCurrentUserArgs = {
    name?: Maybe<Scalars['String']>;
    surname?: Maybe<Scalars['String']>;
    password?: Maybe<Scalars['String']>;
    universityGroup?: Maybe<Scalars['String']>;
};


export type MutationPatchUserArgs = {
    id: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    surname?: Maybe<Scalars['String']>;
    role?: Maybe<Role>;
    universityGroup?: Maybe<Scalars['String']>;
};


export type MutationCreatePerformancePostArgs = {
    title: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    pictureURL?: Maybe<Scalars['String']>;
    videoURL?: Maybe<Scalars['String']>;
    state?: Maybe<PerformancePostState>;
    averageRating?: Maybe<RatingInput>;
    speakerId?: Maybe<Scalars['String']>;
};


export type MutationPatchPerformancePostArgs = {
    id: Scalars['String'];
    title?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    pictureURL?: Maybe<Scalars['String']>;
    videoURL?: Maybe<Scalars['String']>;
    state?: Maybe<PerformancePostState>;
    averageRating?: Maybe<RatingInput>;
    speakerId?: Maybe<Scalars['String']>;
};


export type MutationRemovePerformancePostArgs = {
    id: Scalars['String'];
};


export type MutationFileUploadArgs = {
    file: Scalars['Upload'];
};


export type MutationRemoveUserArgs = {
    id: Scalars['String'];
};

export type NewsPost = {
    __typename?: 'NewsPost';
    id: Scalars['ID'];
    description: Scalars['String'];
    pictureURL?: Maybe<Scalars['String']>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type PaginationInputs = {
    limit?: Maybe<Scalars['Int']>;
    offset: Scalars['Int'];
    order?: Maybe<Array<Scalars['String']>>;
};

export type PerformancePost = {
    __typename?: 'PerformancePost';
    id: Scalars['ID'];
    title: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    pictureURL?: Maybe<Scalars['String']>;
    videoURL?: Maybe<Scalars['String']>;
    state: PerformancePostState;
    averageRating: Rating;
    speakerId?: Maybe<Scalars['ID']>;
    speaker?: Maybe<User>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export enum PerformancePostState {
    Draft = 'DRAFT',
    Poll = 'POLL',
    PollFinished = 'POLL_FINISHED',
    Published = 'PUBLISHED'
}

export type Query = {
    __typename?: 'Query';
    findNewsPost: NewsPost;
    getNewsPosts: Array<NewsPost>;
    findPerformancePost: PerformancePost;
    getPerformancePosts: Array<PerformancePost>;
    getCurrentUser: User;
    findUser: User;
    getUsers: Array<User>;
};


export type QueryFindNewsPostArgs = {
    id: Scalars['String'];
};


export type QueryGetNewsPostsArgs = {
    params: PaginationInputs;
};


export type QueryFindPerformancePostArgs = {
    id: Scalars['String'];
};


export type QueryGetPerformancePostsArgs = {
    params: PaginationInputs;
};


export type QueryFindUserArgs = {
    login: Scalars['String'];
};


export type QueryGetUsersArgs = {
    params: PaginationInputs;
};

export type Rating = {
    __typename?: 'Rating';
    interest: Scalars['Float'];
    format: Scalars['Float'];
    content: Scalars['Float'];
};

export type RatingInput = {
    interest?: Maybe<Scalars['Float']>;
    format?: Maybe<Scalars['Float']>;
    content?: Maybe<Scalars['Float']>;
};

export enum Role {
    User = 'USER',
    Student = 'STUDENT',
    Admin = 'ADMIN'
}

export type Token = {
    __typename?: 'Token';
    token: Scalars['String'];
};


export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    name: Scalars['String'];
    surname: Scalars['String'];
    role: Role;
    login: Scalars['String'];
    universityGroup?: Maybe<Scalars['String']>;
    performances?: Maybe<Array<PerformancePost>>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};
