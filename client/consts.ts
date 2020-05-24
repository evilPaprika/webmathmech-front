import { GET_NEWS_POSTS, GET_PERFORMANCE_POSTS } from './apollo/queries';
import { MediaTypes, Options, PerformancePostState } from './typings';


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

export const HEADER_TABS: Options = [
    {
        label: 'Новости',
        value: ROUTES.NEWS
    },
    {
        label: 'Выступления',
        value: ROUTES.PERFORMANCES
    },
    {
        label: 'Админка',
        value: ROUTES.ADMIN
    }
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

export const EXTENDED_HEADER_TABS: Options = [...MENU_OPTIONS, ...HEADER_TABS];

export const MEDIA_TABS: Options<MediaTypes> = [
    {
        label: 'Добавить картинку',
        value: MediaTypes.Picture
    },
    {
        label: 'Добавить видео',
        value: MediaTypes.Video
    }
];

export const PERFORMANCE_STATES_OPTIONS: Options<PerformancePostState> = [
    {
        label: 'Черновик',
        value: PerformancePostState.Draft
    },
    {
        label: 'Голосование',
        value: PerformancePostState.Poll
    },
    {
        label: 'Голосование окончено',
        value: PerformancePostState.PollFinished
    },
    {
        label: 'На публикацию',
        value: PerformancePostState.Published
    },
];

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
