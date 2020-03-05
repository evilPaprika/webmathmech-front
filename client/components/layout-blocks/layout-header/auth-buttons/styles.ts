import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(() => ({
    authButtons__wrapper: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    authButtons__login: {
        marginRight: '10px'
    }
}));
