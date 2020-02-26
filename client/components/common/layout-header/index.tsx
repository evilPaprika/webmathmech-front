import React, { memo, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, CardMedia, Container, Tab, Tabs, Typography } from '@material-ui/core';

import { HEADER_TABS, ROUTES } from '../../../consts';
import { AuthButtons } from './auth-buttons';
import { useStyles } from './styles';


const LayoutHeader = () => {
    const styles = useStyles();
    const { pathname } = useLocation();
    const defaultTab = HEADER_TABS.find(({ path }) => pathname.startsWith(path))?.path || ROUTES.NEWS;
    const [tab, changeTab] = useState(defaultTab);

    const onChangeTab = useCallback((_: React.ChangeEvent<{}>, newTab: string) => {
        changeTab(newTab);
    }, []);

    return (
        <Container className={styles.layoutHeader} maxWidth={false}>
            <Box className={styles.layoutHeader__content}>
                <Box className={styles.layoutHeader__titleWrapper}>
                    <CardMedia image="/static/logo.png" className={styles.layoutHeader__logo} />
                    <Typography variant="h3" className={styles.layoutHeader__title}>WebMathMech</Typography>
                </Box>
                <Tabs value={tab} onChange={onChangeTab}>
                    {HEADER_TABS.map(({ name, path }) => (
                        <Tab label={name} value={path} to={path} component={Link} />
                    ))}
                </Tabs>
                <AuthButtons />
            </Box>

        </Container>
    );
};

export default memo(LayoutHeader);
