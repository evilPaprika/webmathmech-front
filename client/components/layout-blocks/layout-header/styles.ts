import { createStyles, makeStyles } from '@material-ui/core/styles';

import { SIDEBAR_WIDTH } from 'client/consts';


export const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,

    },
    menuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    drawerPaper: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.background.paper,

        width: SIDEBAR_WIDTH,
    },
    logo: {
        width: '50px',
        height: '50px',
    },
    icons: {
        display: 'flex',
        alignItems: 'center'
    }
}));
