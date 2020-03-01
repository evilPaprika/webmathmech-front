import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    layoutFooter: {
        height: '160px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',

        background: 'linear-gradient(0deg, #fff 30%, #808080 90%)',
    },

    layoutFooter__content: {
        margin: 'auto',
    },

    layoutFooter__socialGroup: {
        display: 'flex',
        justifyContent: 'center',
    },

    layoutFooter__socialIcon: {
        margin: theme.spacing(1)
    },

    layoutFooter__socialIconImage: {
        width: '40px',
        height: '40px',
    }
}));
