import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalWrapper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
    },

    formWrapper: {
        padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`,
    },

    formHeader: {
        marginTop: 0
    },

    close: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    modalForm: {
        padding: `0 ${theme.spacing(2)} ${theme.spacing(2)}`,
        width: '400px',
    },

    textPointer: {
        cursor: 'pointer'
    },

    error: {
        marginTop: '5px',
        color: theme.palette.error.main
    }
}));
