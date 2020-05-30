import { Query } from './generated';


export * from 'client/types/generated';

export enum AuthMethods {
    SignIn = 'sign-in',
    SignUp = 'sign-up'
}

export enum MediaTypes {
    Picture = 'picture',
    Video = 'video',
}

export interface NewsPostsData {
    getNewsPosts: Query['getNewsPosts'];
}

export interface NewsPostsCursorData {
    getNewsPostsCursor: Query['getNewsPostsCursor'];
}

export interface NewsPostData {
    findNewsPost: Query['findNewsPost'];
}

export interface PerformancePostsData {
    getPerformancePosts: Query['getPerformancePosts'];
}

export interface PerformancePostData {
    findPerformancePost: Query['findPerformancePost'];
}

export interface UserData {
    getCurrentUser: Query['getCurrentUser'];
}

export interface IsLoggedInData {
    isLoggedIn: boolean;
}

export interface Option<TValue = string> {
    label: string;
    value: TValue;
}

export type Options<TValue = string> = Array<Option<TValue>>;
