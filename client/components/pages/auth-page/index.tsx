import React, { memo } from 'react';
import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from 'client/consts';
import Error404 from 'components/pages/error-page';
import { AuthVk } from 'components/pages/auth-page/vk';


const AuthPage = () => {
    return (
        <Container>
            <Switch>
                <Route path={ROUTES.AUTH_VK} component={AuthVk} />
                <Route component={Error404} />
            </Switch>
        </Container>
    );
};

export default memo(AuthPage);
