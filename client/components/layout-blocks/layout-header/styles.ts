import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((styles) => ({
    layoutHeader: {
        position: 'fixed',
        height: '80px',
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
    },

    layoutHeader__logo: {
        width: '60px',
        height: '60px',
    },

    layoutHeader__titleWrapper: {
        display: 'flex',
    },

    layoutHeader__title: {
        margin: '5px 0 0 10px',
    },
}));
