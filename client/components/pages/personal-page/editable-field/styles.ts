import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(() => ({
    textField: {
        height: '40%',

        '& input': {
            lineHeight: 1,
            fontSize: ({ fontSize }: any) => fontSize,
            padding: 0
        }
    },
    typography: {
        lineHeight: 1,
        margin: '5px 0',
        fontSize: ({ fontSize }: any) => fontSize
    },
}));
