import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from '_client/consts';
import { PageContainer } from '_components/common';

import { AuthVk } from './vk';


const AuthPage = () => {
    return (
        <PageContainer>
            <Switch>
                <Route path={ROUTES.AUTH_VK} component={AuthVk} />
            </Switch>
        </PageContainer>
    );
};

export default memo(AuthPage);
