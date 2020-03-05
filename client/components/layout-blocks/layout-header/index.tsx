import React, { memo, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, CardMedia, Container, Tab, Tabs } from '@material-ui/core';

import { HEADER_TABS, ROUTES } from '../../../consts';
import { AuthButtons } from './auth-buttons';
import { useStyles } from './styles';


const DEFAULT_TAB = ROUTES.NEWS;

const LayoutHeader = () => {
    const styles = useStyles();

    const { pathname } = useLocation();
    const lastTab = HEADER_TABS.find(({ path }) => pathname.startsWith(path))?.path || DEFAULT_TAB;
    const [tab, setTab] = useState(lastTab);

    const onChangeTab = useCallback((_: React.ChangeEvent<{}>, newTab: string) => {
        setTab(newTab);
    }, []);

    return (
        <Container className={styles.layoutHeader} maxWidth={false}>
            <Box className={styles.layoutHeader__left}>
                <Link to={ROUTES.NEWS} onClick={() => setTab(DEFAULT_TAB)}>
                    <CardMedia image="/static/logo.png" className={styles.layoutHeader__logo} />
                </Link>
                <Tabs value={tab} onChange={onChangeTab}>
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
            </Box>
            <AuthButtons />
        </Container>
    );
};

export default memo(LayoutHeader);
