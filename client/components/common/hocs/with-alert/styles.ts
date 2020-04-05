import { makeStyles } from '@material-ui/core/styles';

import { SIDEBAR_WIDTH } from 'client/consts';


export const useStyles = makeStyles((theme) => ({
    alert: {
        position: 'absolute',
        top: '60px',
        right: 0,
    },
    [theme.breakpoints.up('md')]: {
        alert: {
            left: SIDEBAR_WIDTH,
        }
    },
    [theme.breakpoints.down('sm')]: {
        alert: {
            left: 0,
        }
    }
}));
