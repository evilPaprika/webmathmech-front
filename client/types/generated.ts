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

export type CursorPaginationInputs = {
    limit?: Maybe<Scalars['Int']>;
    dateTimeCursor?: Maybe<Scalars['DateTime']>;
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
    vote: PollVote;
    voteCurrentUser: PollVote;
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
    speakerId: Scalars['String'];
};


export type MutationPatchPerformancePostArgs = {
    id: Scalars['String'];
    title: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    pictureURL?: Maybe<Scalars['String']>;
    videoURL?: Maybe<Scalars['String']>;
    state?: Maybe<PerformancePostState>;
    speakerId: Scalars['String'];
};


export type MutationRemovePerformancePostArgs = {
    id: Scalars['String'];
};


export type MutationVoteArgs = {
    userId: Scalars['String'];
    performanceId: Scalars['String'];
    rating: RatingInput;
};


export type MutationVoteCurrentUserArgs = {
    performanceId: Scalars['String'];
    rating: RatingInput;
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

export type OffsetPaginationInputs = {
    limit?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
    order?: Maybe<Array<Scalars['String']>>;
};

export type PerformancePaginationFiltersInput = {
    states?: Maybe<Array<PerformancePostState>>;
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
    speaker?: Maybe<User>;
    pollVotes?: Maybe<Array<PollVote>>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export enum PerformancePostState {
    Draft = 'DRAFT',
    Poll = 'POLL',
    PollFinished = 'POLL_FINISHED',
    Published = 'PUBLISHED'
}

export type PollVote = {
    __typename?: 'PollVote';
    user: User;
    performance: PerformancePost;
    rating: Rating;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type Query = {
    __typename?: 'Query';
    findNewsPost: NewsPost;
    getNewsPosts: Array<NewsPost>;
    getNewsPostsCursor: Array<NewsPost>;
    findPerformancePost: PerformancePost;
    getPerformancePosts: Array<PerformancePost>;
    getPerformancePostsCursor: Array<PerformancePost>;
    findVoteCurrentUser: PollVote;
    getCurrentUser: User;
    findUser: User;
    getUsers: Array<User>;
};


export type QueryFindNewsPostArgs = {
    id: Scalars['String'];
};


export type QueryGetNewsPostsArgs = {
    params: OffsetPaginationInputs;
};


export type QueryGetNewsPostsCursorArgs = {
    params: CursorPaginationInputs;
};


export type QueryFindPerformancePostArgs = {
    id: Scalars['String'];
};


export type QueryGetPerformancePostsArgs = {
    filters?: Maybe<PerformancePaginationFiltersInput>;
    params: OffsetPaginationInputs;
};


export type QueryGetPerformancePostsCursorArgs = {
    filters?: Maybe<PerformancePaginationFiltersInput>;
    params: CursorPaginationInputs;
};


export type QueryFindVoteCurrentUserArgs = {
    performanceId: Scalars['String'];
};


export type QueryFindUserArgs = {
    login: Scalars['String'];
};


export type QueryGetUsersArgs = {
    params: OffsetPaginationInputs;
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
    pollVotes?: Maybe<Array<PollVote>>;
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};
