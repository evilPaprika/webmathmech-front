import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => {
    const colors = {
        color: theme.palette.common.white,
        backgroundColor: '#16242f'
    };

    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        modalForm: {
            width: '400px',

            backgroundColor: theme.palette.background.paper,
            borderRadius: '5px',

            overflow: 'hidden'
        },

        formHeader: {
            display: 'flex',

            ...colors
        },

        close: {
            color: colors.color
        },

        textPointer: {
            cursor: 'pointer'
        },

        error: {
            marginTop: '5px',
            color: theme.palette.error.main
        }
    };
});
