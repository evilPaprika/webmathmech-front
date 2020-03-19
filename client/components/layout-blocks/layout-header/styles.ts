import { createStyles, makeStyles } from '@material-ui/core/styles';


const DRAWER_WIDTH = 280;

export const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,

    },
    menuButton: {
        [theme.breakpoints.up('sm')]: {
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

        width: DRAWER_WIDTH,
    },
    logo: {
        width: '50px',
        height: '50px',
    },
    icons: {
        display: 'flex'
    }
}));
