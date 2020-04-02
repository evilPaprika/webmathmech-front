import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import Layout from 'components/layout-blocks/layout';
import AdminPage from 'components/pages/admin-page';
import Error404 from 'components/pages/error-page';
import NewsPage from 'components/pages/news-page';
import PerformancesPage from 'components/pages/performances-page';
import PersonalPage from 'components/pages/personal-page';
import AuthPage from 'components/pages/auth-page';
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
                    <Route path={ROUTES.AUTH} component={AuthPage} />
                    <Route component={Error404} />
                </Switch>
            </Layout>
        </BrowserRouter>
    </ApolloProvider>

);
