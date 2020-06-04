import { mapPerformanceState } from '_client/utils';

import { MediaTypes, Options, PerformancePostState } from './types';


export const NEWS_POSTS_LIMIT = 10;
export const PERFORMANCE_POSTS_LIMIT = 10;

export const ROUTES = {
    MAIN: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    NEWS: '/news',
    PUBLISHED_PERFORMANCES: '/performances',
    ALL_PERFORMANCES: '/all-performances',
    USERS: '/users',
    PERSONAL_PAGE: '/my',
    PERSONAL_PERFORMANCES: '/my-performances',
    AUTH: '/auth',
    AUTH_VK: '/auth/vk',
};

export const HEADER_TABS: Options = [
    {
        label: 'Новости',
        value: ROUTES.NEWS
    },
    {
        label: 'Выступления',
        value: ROUTES.PUBLISHED_PERFORMANCES
    },

];

export const ADMIN_TABS: Options = [
    {
        label: 'Список пользователей',
        value: ROUTES.USERS
    },
    {
        label: 'Все выступления',
        value: ROUTES.ALL_PERFORMANCES
    },
];

export const MENU_OPTIONS: Options = [
    {
        label: 'Моя страница',
        value: ROUTES.PERSONAL_PAGE
    },
    {
        label: 'Мои выступления',
        value: ROUTES.PERSONAL_PERFORMANCES
    }
];

export const EXTENDED_HEADER_TABS: Options = [...MENU_OPTIONS, ...HEADER_TABS, ...ADMIN_TABS];

export const MEDIA_TABS: Options<MediaTypes> = [
    {
        label: 'Вставить картинку',
        value: MediaTypes.Picture
    },
    {
        label: 'Вставить видео',
        value: MediaTypes.Video
    }
];

export const PERFORMANCE_STATES_OPTIONS: Options<PerformancePostState> = [
    {
        label: mapPerformanceState(PerformancePostState.Draft),
        value: PerformancePostState.Draft
    },
    {
        label: mapPerformanceState(PerformancePostState.Poll),
        value: PerformancePostState.Poll
    },
    {
        label: mapPerformanceState(PerformancePostState.PollFinished),
        value: PerformancePostState.PollFinished
    },
    {
        label: mapPerformanceState(PerformancePostState.Published),
        value: PerformancePostState.Published
    },
];

export const CURRENT_YEAR = new Date().getFullYear();

export const SIDEBAR_WIDTH = 280;
