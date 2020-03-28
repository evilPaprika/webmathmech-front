import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    text: {
        margin: theme.spacing(2),
        whiteSpace: 'pre-line',
        textAlign: 'start'
    },

    media: {
        height: '50vw'
    }
}));
