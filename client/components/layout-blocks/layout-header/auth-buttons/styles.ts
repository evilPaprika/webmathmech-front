import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((styles) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    username: {
        marginRight: '10px'
    },
    menu: {
        marginTop: styles.spacing(5)
    }
}));
