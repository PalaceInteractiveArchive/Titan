import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './auth';


import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import ApplyLayout from "layouts/Apply";
require('dotenv').config()


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/dash" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/apply" render={props => <ApplyLayout {...props} />} />
      <Redirect from="/" to="/dash" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
