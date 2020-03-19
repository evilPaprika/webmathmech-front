import React, { memo, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    CardMedia,
    Container,
    Drawer,
    Hidden,
    IconButton,
    SwipeableDrawer,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { HEADER_TABS, ROUTES } from '../../../consts';
import { AuthButtons } from './auth-buttons';
import LayoutFooter from '../layout-footer';
import { useStyles } from './styles';


const DEFAULT_TAB = ROUTES.NEWS;

const LayoutHeader = () => {
    const styles = useStyles();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const { pathname } = useLocation();
    const lastTab = HEADER_TABS.find(({ path }) => pathname.startsWith(path))?.path || DEFAULT_TAB;
    const [tab, setTab] = useState<string>(lastTab);

    const onChangeTab = useCallback((_: React.ChangeEvent<{}>, newTab: string) => {
        setTab(newTab);
        setMobileOpen(false);
    }, []);

    const onClickByLogo = useCallback(() => {
        setTab(DEFAULT_TAB);
        setMobileOpen(false);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const Logo = (
        <Link to={ROUTES.NEWS} onClick={onClickByLogo}>
            <CardMedia image="/static/logo.png" className={styles.logo} />
        </Link>
    );

    const drawer = (
        <>
            <div>
                <Container className={styles.toolbar}>
                    {Logo}
                    <Box ml="10px" pt="12px">
                        <Typography variant="h6">
                            WEBMATHMEX
                        </Typography>
                    </Box>
                </Container>
                <Tabs value={tab} onChange={onChangeTab} orientation="vertical">
                    {HEADER_TABS.map(({ name, path }) => (
                        <Tab
                            key={name}
                            label={name}
                            value={path}
                            to={path}
                            component={Link}
                        />
                    ))}
                </Tabs>
            </div>
            <LayoutFooter />
        </>
    );

    return (
        <>
            <AppBar position="fixed" className={styles.appBar}>
                <Toolbar>
                    <Box className={styles.icons}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={styles.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        {Logo}
                    </Box>
                    <AuthButtons />
                </Toolbar>
            </AppBar>
            <nav className={styles.drawer}>
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        classes={{ paper: styles.drawerPaper }}
                        variant="temporary"
                        open={mobileOpen}
                        onOpen={handleDrawerToggle}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{ paper: styles.drawerPaper }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
};

export default memo(LayoutHeader);
