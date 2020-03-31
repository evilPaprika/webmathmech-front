import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalForm: {
        width: '400px',

        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',

        overflow: 'hidden',
        outline: 'none',
    },

    close: {
        color: theme.palette.primary.contrastText,
    },
}));
