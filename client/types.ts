export enum AuthMethods {
    SignIn = 'sign-in',
    SignUp = 'sign-up'
}

export enum Roles {
    User = 'USER',
    Student = 'STUDENT',
    Admin = 'ADMIN'
}

export interface NewsPost {
    id: string;
    text: string;
    pictureURL?: string;
    createdAt: Date;
}

export interface NewsPostsData {
    getNewsPosts: Array<NewsPost>;
}

export interface MenuItem {
    text: string;
    path: string;
}

export interface User {
    name: string;
    surname: string;
    avatar: string;
    role: Roles;
}

export interface UserData {
    getCurrentUser: Partial<User>;
}
