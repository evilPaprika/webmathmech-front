import { HeaderTabs } from './types';


export enum ROUTES {
    MAIN = '/',
    SIGN_IN = '/sign-in',
    SIGN_UP = '/sign-up',
    NEWS = '/news',
    PERFORMANCES = '/performances',
    ADMIN = '/admin',
}

export const HEADER_TABS = [
    {
        name: HeaderTabs.News,
        path: ROUTES.NEWS,
    },
    {
        name: HeaderTabs.Performances,
        path: ROUTES.PERFORMANCES,
    },
    {
        name: HeaderTabs.Admin,
        path: ROUTES.ADMIN,
    }
];
