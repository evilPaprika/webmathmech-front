import { Container } from '@material-ui/core';
import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from '_client/consts';

import { AuthVk } from './vk';


const AuthPage = () => {
    return (
        <Container>
            <Switch>
                <Route path={ROUTES.AUTH_VK} component={AuthVk} />
            </Switch>
        </Container>
    );
};

export default memo(AuthPage);
