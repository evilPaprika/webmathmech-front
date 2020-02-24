import React, { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, CardMedia, Container, Tab, Tabs } from '@material-ui/core';

import { HEADER_TABS } from '../../../consts';
import { HeaderTabs } from '../../../types';
import { AuthButtons } from './auth-buttons';
import { useStyles } from './styles';


interface Props {
    selectedTab?: HeaderTabs;
}

const LayoutHeader = ({ selectedTab }: Props) => {
    const styles = useStyles();
    const [tab, changeTab] = useState(selectedTab);

    const onChangeTab = useCallback((_: React.ChangeEvent<{}>, newTab: HeaderTabs) => {
        changeTab(newTab);
    }, [tab]);

    return (
        <Container className={styles.layoutHeader} maxWidth={false}>
            <Box className={styles.layoutHeader__content}>
                <CardMedia image="/static/logo.png" className={styles.layoutHeader__logo} />
                <Tabs value={tab} onChange={onChangeTab}>
                    {HEADER_TABS.map(({ name, path }) => (
                        <Tab label={name} value={name} to={path} component={Link} />
                    ))}
                </Tabs>
                <AuthButtons />
            </Box>

        </Container>
    );
};

export default memo(LayoutHeader);
