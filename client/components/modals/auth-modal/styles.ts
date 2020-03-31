import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    textPointer: {
        cursor: 'pointer'
    },

    error: {
        marginTop: '5px',
        color: theme.palette.error.main
    }
}));
