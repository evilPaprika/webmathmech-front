import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(() => ({
    adminPage: {
        textAlign: 'center',
    },
    adminPage__main: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
    },
}));
