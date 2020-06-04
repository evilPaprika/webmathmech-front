import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main
    }
}));
