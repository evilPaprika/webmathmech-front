import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AdminPanel from './components/admin-panel';
import Error404 from './components/not-found-error';
import Page from './components/page';
import { ROUTES } from './consts';


export default (
    <BrowserRouter>
        <Switch>
            <Route exact path={ROUTES.MAIN} component={Page} />
            <Route path={ROUTES.ADMIN_PANEL} component={AdminPanel} />
            <Route path={ROUTES.SIGN_UP} component={Page} />
            <Route path={ROUTES.SIGN_IN} component={Page} />
            <Route component={Error404} />
        </Switch>
    </BrowserRouter>
);
