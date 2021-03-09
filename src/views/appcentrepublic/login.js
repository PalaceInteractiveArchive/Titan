/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
//import Cookies from 'universal-cookie';
// reactstrap components
import Axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();


class Index extends React.Component {
  state = {
  }

  componentDidMount() {
    const {
        match: { params },
      } = this.props;
    Axios.get(`${process.env.REACT_APP_API_URL}/titan/application/login/${params.id}/${params.uuid}`)
    .then(res => {
        if (res.status === 403 || res.status === 500) {
            window.alert("You are not authorized")
            return;
        }
        if (res.status === 200) {
            cookies.set("applyCookie", res.data,  {path: '/', maxAge: 3600})
            window.location.replace("/apply/home");
        } else {
            window.alert("You are not authorized")
        }
    })  
  }
  
  render() {
    return (
      <></>
    );
  }
}

export default Index;
