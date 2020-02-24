import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClient from './apollo';
import Error404 from './components/not-found-error';
import Page from './components/page';
import { ROUTES } from './consts';
import { HeaderTabs } from './types';


export default (
    <ApolloProvider client={apolloClient}>
        <BrowserRouter>
            <Switch>
                <Redirect exact from={ROUTES.MAIN} to={ROUTES.NEWS} />
                {/* <Route exact path={ROUTES.MAIN} component={Page} /> */}
                <Route
                    path={ROUTES.NEWS}
                    render={(props) => <Page selectedTab={HeaderTabs.News} {...props} />}
                />
                <Route
                    path={ROUTES.PERFORMANCES}
                    render={(props) => <Page selectedTab={HeaderTabs.Performances} {...props} />}
                />
                <Route
                    path={ROUTES.ADMIN}
                    render={(props) => <Page selectedTab={HeaderTabs.Admin} {...props} />}
                />

                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    </ApolloProvider>

);
