import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalForm: {
        padding: '20px',
        width: '500px',
        backgroundColor: theme.palette.background.paper,
    },
}));
