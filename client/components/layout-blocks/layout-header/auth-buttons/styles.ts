import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((styles) => ({
    authButtons__wrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    authButtons__login: {
        marginRight: '10px'
    },
    authButtons__menu: {
        marginTop: styles.spacing(5)
    }
}));