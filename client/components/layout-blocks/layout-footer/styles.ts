import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    layoutFooter: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(0deg, #fff 50%, #808080 100%)'
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
