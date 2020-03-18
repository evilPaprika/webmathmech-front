import React, { memo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import LayoutHeader from '../layout-header';
import { useStyles } from './styles';


interface Props {
    children?: React.ReactNode;
}

// здесь можно переопределять темы
const theme = createMuiTheme({
    palette: {
        background: {
            default: '#16242f'
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
