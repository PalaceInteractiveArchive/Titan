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
    axios.get(`${process.env.REACT_APP_API_URL}/titan/auth/login`)
    .then((response) => {
    var win = window.open(
      response.data, 
      "Login", "height=700,width=600,resizable=no");
      let logStatus = "failed";
      let user = {};
      let otherInfo = {};
      let accessToken = "";
      let sGroups;
      window.addEventListener('message',function(event) {
        if(event.origin !==  process.env.REACT_APP_API_URL) return;
          logStatus = event.data.status;
          user = event.data.user;
          accessToken = event.data.accessToken;
          otherInfo = event.data.otherStuff;
          sGroups = event.data.sGroups;
        },false);
        var waitClose = setInterval(function() {
          if (win.closed) {
              clearInterval(waitClose);
              if (logStatus === "success") {
                cookies.set('accessToken', accessToken, {path: '/', maxAge: 3600});
                cookies.set('user', user, {path: '/', maxAge: 3600});
                cookies.set('otherStuff', otherInfo, {path: '/', maxAge: 3600});
                cookies.set('sGroups', sGroups, {path: '/', maxAge: 3600})
                window.location.replace('/');
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
                      src={require("assets/img/icons/common/pn_icon.png").default}
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
