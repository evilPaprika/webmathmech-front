export const ROUTES = {
    MAIN: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    NEWS: '/news',
    PERFORMANCES: '/performances',
    ADMIN: '/admin',
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
