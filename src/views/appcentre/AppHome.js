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
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import Cookies from "universal-cookie";
import Header from "components/Headers/Header.js";

//const cookies = new Cookies();


class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
          <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Welcome to The Application Centre</h3>
                </CardHeader>
                <CardBody>
                    See below for your options.
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className="card mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        View Applicants
                      </CardTitle>
                      <CardSubtitle
                        tag="h6"
                        className="text-uppercase text-muted mt-2">
                      Shows Applicants for all applications
                      </CardSubtitle>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                        <i className="fas fa-address-card" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="card mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Restrict applications
                      </CardTitle>
                      <CardSubtitle
                        tag="h6"
                        className="text-uppercase text-muted mt-2">
                      Open/Close applications
                      </CardSubtitle>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i className="fas fa-window-close" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="card mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Edit Applications
                      </CardTitle>
                      <CardSubtitle
                        tag="h6"
                        className="text-uppercase text-muted mt-2">
                      Create, Delete and Edit Applications
                      </CardSubtitle>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-window-close" />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
