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
import axios from 'axios';
import Cookies from 'universal-cookie';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col
} from "reactstrap";

const cookies = new Cookies();


class Login extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = { loginStatus: "failed", user: {} };
  }
  
  getLoginWindow() {
    axios.get('/titan/auth/login')
    .then((response) => {
    console.log(response.data)
    var win = window.open(
      response.data, 
      "Login", "height=700,width=600,resizable=no");
      let logStatus = "failed";
      let user = {};
      let otherInfo = {};
      let accessToken = "";
      window.addEventListener('message',function(event) {
        if(event.origin !== 'https://internal-api.palace.network') return;
          console.log(event.data);
          logStatus = event.data.status;
          user = event.data.user;
          accessToken = event.data.accessToken;
          otherInfo = event.data.otherStuff;
        },false);
        var waitClose = setInterval(function() {
          if (win.closed) {
              clearInterval(waitClose);
              if (logStatus === "success") {
                cookies.set('accessToken', accessToken, {path: '/', maxAge: 1800});
                cookies.set('user', user, {path: '/', maxAge: 1800})
                cookies.set('otherStuff', otherInfo, {path: '/', maxAge: 1800})
                window.location.replace('/')
              } else {
                alert("Failed logon, refreshing page");
                window.location.reload();
              }
          }
      }, 500);
    })
  }

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={this.getLoginWindow}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/pn_icon.png")}
                    />
                  </span>
                  <span className="btn-inner--text">Palace Forums</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>This site uses cookies to enhance your experience and monitor logins. No Third Party cookies are used on this site.</small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Login;
