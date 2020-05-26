import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    vkOAuth: {
        '&:hover': {
            backgroundColor: '#4680C2'
        },
        backgroundColor: '#cecece',
        color: 'white',
        padding: theme.spacing(1),
        borderRadius: '5px',
        margin: 'auto'
    }
}));
