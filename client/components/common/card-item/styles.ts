import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    card: {
        margin: `${theme.spacing(4)}px 0`,
        maxWidth: 800,

        [theme.breakpoints.up('md')]: {
            minWidth: 500,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 300
        },
    },
}));
