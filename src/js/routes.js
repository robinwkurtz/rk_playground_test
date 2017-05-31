import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './pages/App/';
import HomePage from './pages/HomePage/';

/*
Instead of directly defining our app routes, we have to export a function that receives the store.
When creating routes, as we do in the app.js on the client and server.js on the server, we need
access to the store in order to dispatch a switchLanguage action. At the moment, the router seems
like the best place to do it, specifically in the onEnter hook.
*/

export default function createRoutes(store) {
    return (
        <Route
            path="/"
            component={App}
        >
            <IndexRoute component={HomePage} />
        </Route>
    );
}
