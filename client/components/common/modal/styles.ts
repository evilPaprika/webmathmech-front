import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main
    },

    modalPaper: {
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            // класс .MuiDialog-paperWidthMd.MuiDialog-paperScrollBody перебивает этот стиль
            maxWidth: 'calc(100% - 5px) !important',
            width: 'calc(100% - 5px)'
        }
    },

    content: {
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1)
        }
    }
}));
