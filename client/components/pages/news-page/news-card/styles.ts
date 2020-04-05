import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    text: {
        margin: theme.spacing(2),

        textAlign: 'start',
        whiteSpace: 'pre-line',
        wordBreak: 'break-word',
    },

    media: {
        height: '50vw'
    },

    blockInfo: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    date: {
        fontSize: 10,
        textAlign: 'start',
        color: theme.palette.text.secondary
    },

    menu: {
        marginTop: theme.spacing(4),
    },
}));
