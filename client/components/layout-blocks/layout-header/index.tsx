import React, { memo, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Container, Drawer, Hidden, SwipeableDrawer, Tab, Tabs, Toolbar } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import { GET_IS_LOGGED_IN } from 'client/apollo/queries';
import { EXTENDED_HEADER_TABS, HEADER_TABS, ROUTES } from 'client/consts';
import LayoutFooter from '../layout-footer';
import { AuthButtons } from './auth-buttons';
import { HeaderIcons } from './header-icons';
import { useStyles } from './styles';


const DEFAULT_TAB = ROUTES.NEWS;

const LayoutHeader = () => {
    const styles = useStyles();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { data: { isLoggedIn } } = useQuery<any>(GET_IS_LOGGED_IN);
    const { pathname } = useLocation();

    const availableHeaderTabs = isLoggedIn ? EXTENDED_HEADER_TABS : HEADER_TABS;

    const lastTab = availableHeaderTabs.find(({ path }) => pathname.startsWith(path))?.path || DEFAULT_TAB;
    const [tab, setTab] = useState<string>(lastTab);

    if (tab !== lastTab) {
        setTab(lastTab);
    }

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
                    {availableHeaderTabs.map(({ text, path }) => (
                        <Tab
                            key={text}
                            label={text}
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
