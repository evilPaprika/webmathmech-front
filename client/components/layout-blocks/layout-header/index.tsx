import { useQuery } from '@apollo/react-hooks';
import {
    AppBar,
    Container,
    Divider as MUIDivider,
    Drawer,
    Hidden,
    SwipeableDrawer,
    Tab,
    Tabs,
    Toolbar
} from '@material-ui/core';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GET_CURRENT_USER, GET_IS_LOGGED_IN } from '_apollo/queries';
import { ADMIN_TABS, COMMON_TABS, PERSONAL_TABS, ROUTES } from '_client/consts';
import { IsLoggedInData, Role, UserData } from '_client/types';
import { findMenuItemByPath } from '_client/utils';

import LayoutFooter from '../layout-footer';
import { AuthButtons } from './auth-buttons';
import { HeaderIcons } from './header-icons';
import { useStyles } from './styles';


const DEFAULT_TAB = ROUTES.NEWS;

const getHeaderTabs = (isLoggedIn: boolean = false, isAdmin: boolean = false) => {
    switch (true) {
        case isAdmin:
            return [...PERSONAL_TABS, ...COMMON_TABS, ...ADMIN_TABS];
        case isLoggedIn:
            return [...PERSONAL_TABS, ...COMMON_TABS];
        default:
            return COMMON_TABS;
    }
};

const LayoutHeader = () => {
    const styles = useStyles();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const { isLoggedIn } = useQuery<IsLoggedInData>(GET_IS_LOGGED_IN)?.data || {};
    const { pathname } = useLocation();

    const { data: userData } = useQuery<UserData>(GET_CURRENT_USER);
    const isAdmin = userData?.getCurrentUser?.role === Role.Admin;

    const availableHeaderTabs = getHeaderTabs(isLoggedIn, isAdmin);

    const lastTab = useMemo(
        () => {
            window.scrollTo({ top: 0 });

            return findMenuItemByPath(availableHeaderTabs, pathname)?.value || DEFAULT_TAB;
        },
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
                    {isLoggedIn && PERSONAL_TABS.map(({ label, value }) => (
                        <Tab key={label} label={label} value={value} to={value} component={Link} />
                    ))}
                    <Tab component={Divider} disabled />
                    {COMMON_TABS.map(({ label, value }) => (
                        <Tab key={label} label={label} value={value} to={value} component={Link} />
                    ))}
                    <Tab component={Divider} disabled />
                    {isAdmin && ADMIN_TABS.map(({ label, value }) => (
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
            <AppBar className={styles.appBar}>
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

export default memo(LayoutHeader);
