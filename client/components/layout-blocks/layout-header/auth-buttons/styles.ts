import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((styles) => ({
    authButtons__wrapper: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    authButtons__login: {
        marginRight: '10px'
    },
    authButtons__menu: {
        marginTop: styles.spacing(5)
    }
}));
