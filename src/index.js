import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, useRouterHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { UserIsAuthenticated } from "./util/wrappers.js";

// Layouts
import App from "./App";
import Home from "./layouts/home/Home";
import About from "./layouts/about/About";
import Dashboard from "./layouts/dashboard/Dashboard";
import Profile from "./user/layouts/profile/Profile";
import CreateOrganization from "./organization/ui/create/CreateOrganizationContainer";
import ListOrganizations from "./organization/ui/list/ListOrganizationsContainer";
import OrganizationDetail from "./organization/ui/detail/";
// import CreateVoteCoin from "./voteCoin/ui/create/CreateVoteCoinContainer";

// Redux Store
import store from "./store";
import { createHistory } from "history";

const PUBLIC_URL = process.env.NODE_ENV === "production" ? "/TheWill" : "/";
const browserHistory = useRouterHistory(createHistory)({
  basename: PUBLIC_URL
});

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="organization/create" component={CreateOrganization} />
        <Route exact path="organization/list" component={ListOrganizations} />
        <Route
          path="organization/list/:detail"
          component={OrganizationDetail}
        />
        {/*<Route path="votecoin/create" component={CreateVoteCoin} />*/}
        <Route path="about" component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
