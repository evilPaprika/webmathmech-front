import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
    layoutHeader: {
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid grey',
    },

    layoutHeader__content: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
});
