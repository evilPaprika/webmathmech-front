import { GET_NEWS_POSTS, GET_PERFORMANCE_POSTS } from './apollo/queries';
import { MenuItem } from './types';


export const NEWS_POSTS_LIMIT = 10;
export const PERFORMANCE_POSTS_LIMIT = 10;

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

export const EXTENDED_HEADER_TABS: Array<MenuItem> = [...MENU_ITEMS, ...HEADER_TABS];

export const CURRENT_YEAR = new Date().getFullYear();

export const SIDEBAR_WIDTH = 280;

export const GET_NEWS_POST_QUERY_DEFAULT = {
    query: GET_NEWS_POSTS,
    variables: { offset: 0, limit: NEWS_POSTS_LIMIT },
};

export const GET_PERFORMANCES_POST_QUERY_DEFAULT = {
    query: GET_PERFORMANCE_POSTS,
    variables: { offset: 0, limit: PERFORMANCE_POSTS_LIMIT },
};
