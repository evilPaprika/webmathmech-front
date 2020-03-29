import { makeStyles } from '@material-ui/core/styles';

import { SIDEBAR_WIDTH } from 'client/consts';


export const useStyles = makeStyles((theme) => ({
    error: {
        marginTop: '5px',
        color: theme.palette.error.main
    },

    [theme.breakpoints.up('md')]: {
        alert: {
            position: 'absolute',
            top: '60px',
            right: 0,
            left: SIDEBAR_WIDTH,
        }
    },
    [theme.breakpoints.down('sm')]: {
        alert: {
            position: 'absolute',
            top: '60px',
            right: 0,
            left: 0,
        }
    }
}));
