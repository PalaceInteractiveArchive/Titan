import React from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Logout extends React.Component {

    componentWillMount() {
        cookies.remove('user', { path: '/' });
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('otherStuff', { path: '/'});
        window.location.replace('/auth')
      }
    
      render() {
        return null
      }

}

export default Logout;
