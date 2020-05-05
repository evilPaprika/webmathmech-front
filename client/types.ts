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
    Published = 'PUBLISHED',
}

export interface NewsPost {
    id: string;
    text: string;
    pictureURL?: string;
    createdAt: Date;
}

export interface PerformancePost {
    id: string;
    text: string;
    pictureURL?: string;
    videoURL?: string;
    createdAt: Date;
    averageRating: PerformanceRating;
}

export interface PerformanceRating {
    format: number;
    content: number;
    interest: number;
}

export interface NewsPostsData {
    getNewsPosts: Array<NewsPost>;
}

export interface PerformancePostsData {
    getPerformancePosts: Array<PerformancePost>;
}

export interface User {
    name: string;
    surname: string;
    avatar: string;
    role: Roles;
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
