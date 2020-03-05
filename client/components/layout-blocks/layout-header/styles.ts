import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    layoutHeader: {
        position: 'fixed',

        padding: theme.spacing(1),
        borderBottom: '1px solid #eee',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#16242f',
        color: '#fff',
    },

    layoutHeader__left: {
        display: 'flex'
    },

    layoutHeader__logo: {
        width: '50px',
        height: '50px',

        marginRight: '20px',

        flexShrink: 0,
    },
}));
