import  React, { useEffect, useState } from  "react";
import { Route, Redirect } from  "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import AdminLayout from "layouts/Admin.js";


const cookies = new Cookies();

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}


const PrivateRoute = ({ component: Component, ...rest }) => {

    const [isLoggedIn, setisLoggedIn] = useState({isLoggedIn: false});
    const [isBusy, setBusy] = useState(true)


    useEffect(() => {

        const fetchInfo= async() => {
            if (cookies.get('accessToken') !== undefined) {
                axios.post(`${process.env.REACT_APP_API_URL}/titan/auth/verify`, {
                    accessToken: cookies.get('accessToken'),
                    user: cookies.get('user')
                })
                .then(function (response) {
                    setisLoggedIn({isLoggedIn: response.data})
                    setBusy(false);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
            } else {
                setisLoggedIn({isLoggedIn: false})
                setBusy(false);
            }
        }
        
        fetchInfo();
    }, []);
    
    
    if (isBusy === false) {
        return (
            <Route {...rest} component={props => isLoggedIn.isLoggedIn
              ? (
                  <AdminLayout {...props} />
              ) : (
                <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
              )
            } />
          )
    } else {
        return null
    }
    
  }

export default PrivateRoute;