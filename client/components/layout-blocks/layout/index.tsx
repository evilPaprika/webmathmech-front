import React, { memo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { } from '@material-ui/core/colors';


import LayoutHeader from '../layout-header';
import { useStyles } from './styles';


interface Props {
    children?: React.ReactNode;
}

// здесь можно переопределять темы
const theme = createMuiTheme({
    palette: {
        primary: {
            dark: '#0f1920',
            main: '#16242f',
            light: '#444f58',
            contrastText: '#fff'
        }
    }
});

const Layout = ({ children }: Props) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <LayoutHeader />
                {children}
            </div>
        </ThemeProvider>
    );
};

export default memo(Layout);
