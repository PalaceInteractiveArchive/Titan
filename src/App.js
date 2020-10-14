import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Redirect } from 'react-router';
import { AuthContext } from "./context/Auth";

function App(props) {
    return (
      <AuthContext.Provider value={false}>
        <Router>
          <div>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Dashboard} />
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }

export default App;