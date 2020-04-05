export enum AuthMethods {
    SignIn = 'sign-in',
    SignUp = 'sign-up'
}

export interface NewsPost {
    id: string;
    text: string;
    pictureURL?: string;
    createdAt: Date;
}

export interface MenuItem {
    text: string;
    path: string;
}
