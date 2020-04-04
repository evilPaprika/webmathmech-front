import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import Layout from 'components/layout-blocks/layout';
import {
    AdminPage,
    AuthPage,
    Error404,
    NewsPage,
    PerformancesPage,
    PersonalPage,
    PersonalPerformancesPage
} from 'components/pages';
import { ROUTES } from 'client/consts';
import apolloClient from './apollo';


export default (
    <ApolloProvider client={apolloClient}>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Redirect exact from={ROUTES.MAIN} to={ROUTES.NEWS} />
                    <Route path={ROUTES.NEWS} component={NewsPage} />
                    <Route path={ROUTES.PERFORMANCES} component={PerformancesPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                    <Route path={ROUTES.PERSONAL_PAGE} component={PersonalPage} />
                    <Route path={ROUTES.PERSONAL_PERFORMANCES} component={PersonalPerformancesPage} />
                    <Route path={ROUTES.AUTH} component={AuthPage} />
                    <Route component={Error404} />
                </Switch>
            </Layout>
        </BrowserRouter>
    </ApolloProvider>
);
