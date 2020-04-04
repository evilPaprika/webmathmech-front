import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    card: {
        margin: `${theme.spacing(4)}px 0`,
        maxWidth: 600,

        [theme.breakpoints.up('md')]: {
            minWidth: 600,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 380
        },
    },
}));
