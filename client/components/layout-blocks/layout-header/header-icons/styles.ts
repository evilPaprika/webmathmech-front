import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    icons: {
        display: 'flex',
        alignItems: 'center'
    },
    menuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    logo: {
        width: '50px',
        height: '50px',
    },
}));
