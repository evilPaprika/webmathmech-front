import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
sans-serif`
    },
    content: {
        margin: '70px auto 0',
        padding: `0 ${theme.spacing(6)}px 0`,
        [theme.breakpoints.down('sm')]: {
            padding: `0 ${theme.spacing(4)}px 0`,
        },
        [theme.breakpoints.down('xs')]: {
            padding: `0 ${theme.spacing(2)}px 0`,
        },

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        width: '100%',
        maxWidth: 700,
    },

    icons: {
        display: 'flex',

        position: 'fixed',
        right: '16px',
        bottom: '16px'
    }
}));
