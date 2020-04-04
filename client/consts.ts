import { MenuItem } from './types';


export const NEWS_POSTS_LIMIT = 10;

export const ROUTES = {
    MAIN: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    NEWS: '/news',
    PERFORMANCES: '/performances',
    ADMIN: '/admin',
    PERSONAL_PAGE: '/my',
    PERSONAL_PERFORMANCES: '/my-performances',
    AUTH: '/auth',
    AUTH_VK: '/auth/vk',
};

export const HEADER_TABS: Array<MenuItem> = [
    {
        text: 'Новости',
        path: ROUTES.NEWS
    },
    {
        text: 'Выступления',
        path: ROUTES.PERFORMANCES
    },
    {
        text: 'Админка',
        path: ROUTES.ADMIN
    }
];

export const MENU_ITEMS: Array<MenuItem> = [
    {
        text: 'Моя страница',
        path: ROUTES.PERSONAL_PAGE
    },
    {
        text: 'Мои выступления',
        path: ROUTES.PERSONAL_PERFORMANCES
    }
];

export const EXTENDED_HEADER_TABS: Array<MenuItem> = [...HEADER_TABS, ...MENU_ITEMS];

export const CURRENT_YEAR = new Date().getFullYear();

export const SIDEBAR_WIDTH = 280;
