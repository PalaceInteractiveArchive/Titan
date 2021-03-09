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
import Axios from "axios";
import Cookies from "universal-cookie";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const cookies = new Cookies();


class Header extends React.Component {
  state = {
    titanUsers: 0,
    totalPlayers: 0,
    totalHelps: 0,
    onlinePlayers: 0
  }

  componentDidMount() {
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/stats/titanUsers`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user')
    })
    .then(res => {
      this.setState({ titanUsers: res.data });
    });    
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/stats/totalUsers`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user')
    })
    .then(res => {
      this.setState({ totalPlayers: res.data });
    });
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/stats/totalHelps`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user')
    })
    .then(res => {
      this.setState({ totalHelps: res.data });
    });
    Axios.get(`${process.env.REACT_APP_API_URL}/minecraft/server/online`)
    .then(res => {
      this.setState({ onlinePlayers: res.data.players });
    });
  } 

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Titan Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.titanUsers.toLocaleString()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Players
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.state.totalPlayers.toLocaleString()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Help Mes
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.totalHelps.toLocaleString()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Online Players
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.onlinePlayers.toLocaleString()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="ni ni-laptop" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
