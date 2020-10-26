import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};
const reducer = combineReducers(reducers);

class App extends React.Component {

    render() {
    return (
    //   <AuthContext.Provider value={false}>
        <BrowserRouter>
                <div>
                    <Route exact path="/" component={Dashboard} />
                </div>
                <div>
                    <Route exact path="/login" component={Login} />
                </div>
        </BrowserRouter>
    //   </AuthContext.Provider>
    );
    }
  }

export default App;