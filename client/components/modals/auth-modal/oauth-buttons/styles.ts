import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    vkOAuth: {
        '&:hover': {
            background: '#4680C2'
        },
        background: '#cecece',
        color: 'white',
        padding: theme.spacing(1),
        borderRadius: '5px',
        margin: 'auto'
    }
}));
