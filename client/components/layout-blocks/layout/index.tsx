import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { ScrollTopIcon, Teleporter } from 'components/common';

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
                <Box textAlign="center" m="80px auto 0">
                    {children}
                </Box>

                <Box id="layout-icons" display="flex" position="fixed" right="16px" bottom="16px">
                    <ScrollTopIcon />
                    <Teleporter.Target />
                </Box>
            </div>
        </ThemeProvider>
    );
};

export default memo(Layout);
