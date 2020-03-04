import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    layoutFooter: {
        padding: theme.spacing(1),
        borderTop: '1px solid #eee',

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#fafafa',
    },

    layoutFooter__socialGroup: {
        display: 'flex',
    },

    layoutFooter__socialIcon: {
        margin: theme.spacing(0.5)
    },

    layoutFooter__socialIconImage: {
        width: '20px',
        height: '20px',
    }
}));
