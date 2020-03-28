import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        borderTop: '1px solid #eee',

        backgroundColor: '#fafafa',
    },

    socialGroup: {
        display: 'flex',
        justifyContent: 'center',
    },

    socialIcon: {
        margin: theme.spacing(0.5)
    },

    socialIconImage: {
        width: '20px',
        height: '20px',
    }
}));
