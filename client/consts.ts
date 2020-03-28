export const NEWS_POSTS_LIMIT = 10;

export const ROUTES = {
    MAIN: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    NEWS: '/news',
    PERFORMANCES: '/performances',
    ADMIN: '/admin',
    PERSONAL_PAGE: '/personal-page',
};

export const HEADER_TABS = [
    {
        name: 'Новости',
        path: ROUTES.NEWS
    },
    {
        name: 'Выступления',
        path: ROUTES.PERFORMANCES
    },
    {
        name: 'Админка',
        path: ROUTES.ADMIN
    }
];
