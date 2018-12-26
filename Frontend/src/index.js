import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.jsx";
import CanvasLayout from "layouts/Canvas/Canvas.jsx";
import WelcomeLayout from "layouts/Welcome/Welcome.jsx";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

//Redux Imports
import { Provider } from 'react-redux';
import { getInitialState } from './helpers/local-storage.helpers';
import configureStore from './redux/store';
const initialState = getInitialState();
const store = configureStore(initialState);



const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/canvas" render={props => <CanvasLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/" render={props => <WelcomeLayout {...props} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
