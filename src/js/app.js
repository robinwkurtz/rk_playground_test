/*
This is the entry point to our client-side application.
*/

// Define some global constants. The server defines the opposite values
global.__CLIENT__ = true;
global.__SERVER__ = false;

// SASS is handled by Webpack with sass-loader
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import makeStore from './redux/store';

/*
window.__reduxInitialState can be set by the server in case there was server rendering done.
If set, it represents the last state of the redux store when the current page was generated by the server.
*/

delete __reduxInitialState.ui

const store = makeStore(browserHistory, window.__reduxInitialState);

// Any changes in history will be reflected in redux under the routing key.
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

/*
The router is wrapped with a provider. This makes it easier to get access to the global state.
ReduxAsyncConnect kicks off the data loading process -- if any -- right before React and the router want to mount a component.
*/
const app = (
    <Provider store={store}>
        <Router render={ (props) => <ReduxAsyncConnect {...props}/> } history={ history }>
            { routes }
        </Router>
    </Provider>
)

render(app, document.getElementById('app'));
