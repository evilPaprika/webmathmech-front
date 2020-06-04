import { ApolloProvider } from '@apollo/react-hooks';
import { Fade } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { ROUTES } from '_client/consts';
import Layout from '_components/layout-blocks/layout';
import {
    AuthPage,
    Error404,
    NewsPage,
    PersonalPage,
    PersonalPerformancesPage,
    PublishedPerformancesPage,
    UsersPage
} from '_components/pages';
import AllPerformancesPage from '_components/pages/all-performances-page';

import apolloClient from './apollo';


const PageTransitionHOC = (Component: React.ElementType) => (
    () => (
        <Fade mountOnEnter in>
            <div>
                <Component />
            </div>
        </Fade>
    )
);

export default (
    <ApolloProvider client={apolloClient}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Redirect exact from={ROUTES.MAIN} to={ROUTES.NEWS} />
                        <Route path={ROUTES.NEWS} component={PageTransitionHOC(NewsPage)} />
                        <Route
                            path={ROUTES.PUBLISHED_PERFORMANCES}
                            component={PageTransitionHOC(PublishedPerformancesPage)}
                        />
                        <Route path={ROUTES.ALL_PERFORMANCES} component={PageTransitionHOC(AllPerformancesPage)} />
                        <Route path={ROUTES.USERS} component={PageTransitionHOC(UsersPage)} />
                        <Route path={ROUTES.PERSONAL_PAGE} component={PageTransitionHOC(PersonalPage)} />
                        <Route
                            path={ROUTES.PERSONAL_PERFORMANCES}
                            component={PageTransitionHOC(PersonalPerformancesPage)}
                        />
                        <Route path={ROUTES.AUTH} component={PageTransitionHOC(AuthPage)} />
                        <Route component={PageTransitionHOC(Error404)} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </SnackbarProvider>
    </ApolloProvider>
);
