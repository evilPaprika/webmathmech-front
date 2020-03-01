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

export const FOOTER_LOGOTYPES: Array<{
    src: string;
    href: string;
}> = [
    {
        src: '/static/vk_logo.svg',
        href: 'https://vk.com/webmathmech'
    },
    {
        src: '/static/instagram_logo.svg',
        href: 'https://instagram.com/' // TODO link. It is example
    },
    {
        src: '/static/mail_logo.svg',
        href: 'https://mail.ru/', // TODO link. It is example
    },
    {
        src: '/static/github_logo.svg',
        href: 'https://github.com/evilPaprika/webmathmech-front'
    }
];
