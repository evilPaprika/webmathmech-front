export enum AuthMethods {
    SignIn = 'sign-in',
    SignUp = 'sign-up'
}

export enum Roles {
    User = 'USER',
    Student = 'STUDENT',
    Admin = 'ADMIN'
}

export enum MediaTypes {
    Picture = 'picture',
    Video = 'video',
}

export enum PerformancePostState {
    Draft = 'DRAFT',
    Poll = 'POLL',
    PollFinished = 'POLL_FINISHED',
    Published = 'PUBLISHED',
}

export interface NewsPost {
    id: string;
    description: string;
    pictureURL?: string;
    createdAt: Date;
}

export interface PerformancePost {
    id: string;
    description: string;
    pictureURL?: string;
    videoURL?: string;
    createdAt: Date;
    averageRating: PerformanceRating;
    state: PerformancePostState;
}

export interface PerformanceRating {
    format: number;
    content: number;
    interest: number;
}

export interface NewsPostsData {
    getNewsPosts: Array<NewsPost>;
}

export interface NewsPostData {
    findNewsPost: NewsPost;
}

export interface PerformancePostsData {
    getPerformancePosts: Array<PerformancePost>;
}

export interface PerformancePostData {
    findPerformancePost: PerformancePost;
}

export interface User {
    name: string;
    surname: string;
    avatar?: string;
    role: Roles;
    login: string;
}

export interface UserData {
    getCurrentUser: User;
}

export interface IsLoggedInData {
    isLoggedIn: boolean;
}

export interface Option<TValue = string> {
    label: string;
    value: TValue;
}

export type Options<TValue = string> = Array<Option<TValue>>;
