import React from "react";
// node.js library that concatenates classes (strings)
//import Cookies from 'universal-cookie';
// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Header from "components/Headers/Header.js";
import RestrictTable from "./RestrictTable"

//const cookies = new Cookies();

class RestrictPage extends React.Component {

  componentDidMount() {
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
                  <h3 className=" mb-0">Restrict Applications</h3>
                </CardHeader>
                <CardBody>All Applications stored in the system are below</CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardBody>
                  <RestrictTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default RestrictPage;
