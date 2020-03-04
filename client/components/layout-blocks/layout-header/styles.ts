import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    layoutHeader: {
        position: 'fixed',

        padding: theme.spacing(1),
        borderBottom: '1px solid #eee',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#fafafa',
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

    layoutHeader__tab: {
        fontSize: '12px',
    }
}));
