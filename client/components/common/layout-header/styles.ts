import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((styles) => ({
    layoutHeader: {
        position: 'fixed',
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid grey',
        backgroundColor: styles.palette.background.paper,
    },

    layoutHeader__content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
}));
