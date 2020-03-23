import React, { memo, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Container, Drawer, Hidden, SwipeableDrawer, Tab, Tabs, Toolbar } from '@material-ui/core';

import { HEADER_TABS, ROUTES } from '../../../consts';
import LayoutFooter from '../layout-footer';
import { AuthButtons } from './auth-buttons';
import { HeaderIcons } from './header-icons';
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

    const Icons = <HeaderIcons onClickByMenu={handleDrawerToggle} onClickByLogo={onClickByLogo} />;

    const drawer = (
        <>
            <div>
                <Container className={styles.toolbar}>
                    {Icons}
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
                    {Icons}
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
