import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'
import {createHistory} from 'history'
// Layouts
import App from './App'
import Home from './layouts/home/Home'
import About from './layouts/about/About'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'
const PUBLIC_URL = process.env.NODE_ENV === 'production' ? '/TheWill' : '/'
const browserHistory = useRouterHistory(createHistory)({ basename: PUBLIC_URL })
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="about" component={About} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
