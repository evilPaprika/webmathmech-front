import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(() => ({
    newsPage: {
        textAlign: 'center',
    },
    newsPage__logo: {
        height: '40vmin',
        boxShadow: '-10px -10px 30px 4px rgba(256,256,256,0.7), 10px 10px 30px 4px rgba(0,0,0,0.5)'
    },
    newsPage__main: {
        backgroundColor: '#7f8082',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    },
}));
