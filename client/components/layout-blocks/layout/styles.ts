import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
    root: {
        display: 'flex',
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
sans-serif`
    },

    icons: {
        display: 'flex',

        position: 'fixed',
        right: '16px',
        bottom: '16px'
    }
});
