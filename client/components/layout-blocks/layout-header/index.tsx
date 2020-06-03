import React, { memo, useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    AppBar,
    Box,
    Container,
    Divider as MUIDivider,
    Drawer,
    Hidden,
    Slide,
    SwipeableDrawer,
    Tab,
    Tabs,
    Toolbar,
    useScrollTrigger
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import { GET_IS_LOGGED_IN } from 'client/apollo/queries';
import { EXTENDED_HEADER_TABS, HEADER_TABS, MENU_OPTIONS, ROUTES } from 'client/consts';
import { IsLoggedInData } from 'client/types';
import { findMenuItemByPath } from 'client/utils';

import LayoutFooter from '../layout-footer';
import { AuthButtons } from './auth-buttons';
import { HeaderIcons } from './header-icons';
import { useStyles } from './styles';


const DEFAULT_TAB = ROUTES.NEWS;

const LayoutHeader = () => {
    const styles = useStyles();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { isLoggedIn } = useQuery<IsLoggedInData>(GET_IS_LOGGED_IN)?.data || {};
    const { pathname } = useLocation();

    const availableHeaderTabs = isLoggedIn ? EXTENDED_HEADER_TABS : HEADER_TABS;

    const lastTab = useMemo(
        () => findMenuItemByPath(availableHeaderTabs, pathname)?.value || DEFAULT_TAB,
        [pathname]
    );
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

    const onDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const Icons = <HeaderIcons onClickByMenu={onDrawerToggle} onClickByLogo={onClickByLogo} />;
    const Divider = React.forwardRef(
        (_, ref) => <MUIDivider innerRef={ref} light />
    );

    const drawer = (
        <>
            <div>
                <Container className={styles.toolbar}>
                    {Icons}
                </Container>
                <Tabs value={tab} onChange={onChangeTab} orientation="vertical">
                    {isLoggedIn && MENU_OPTIONS.map(({ label, value }) => (
                        <Tab key={label} label={label} value={value} to={value} component={Link} />
                    ))}
                    <Tab component={Divider} disabled />
                    {HEADER_TABS.map(({ label, value }) => (
                        <Tab key={label} label={label} value={value} to={value} component={Link} />
                    ))}
                    <Tab component={Divider} disabled />
                </Tabs>
            </div>
            <LayoutFooter />
        </>
    );

    return (
        <>
            <Box className={styles.appBar}>
                <HideOnScroll>
                    <AppBar position="relative">
                        <Toolbar>
                            {Icons}
                            <AuthButtons />
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            </Box>
            <nav className={styles.drawer}>
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        classes={{ paper: styles.drawerPaper }}
                        variant="temporary"
                        open={mobileOpen}
                        onOpen={onDrawerToggle}
                        onClose={onDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden smDown implementation="css">
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

function HideOnScroll({ children }: {children: React.ReactNode}) {
    const trigger = useScrollTrigger();

    return (
        <Slide direction="down" in={!trigger}>
            <div>
                {children}
            </div>
        </Slide>
    );
}

export default memo(LayoutHeader);
