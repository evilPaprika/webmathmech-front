import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    textArea: {
        minWidth: '348px',
        maxWidth: '348px',
        minHeight: '200px',
    },

    error: {
        marginTop: '5px',
        color: theme.palette.error.main
    },

    alert: {
        position: 'absolute',
        top: '60px',
        right: 0,
        left: 0,
    }
}));
