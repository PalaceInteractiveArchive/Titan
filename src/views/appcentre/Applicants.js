import React from "react";
// node.js library that concatenates classes (strings)
//import Cookies from 'universal-cookie';
// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import Header from "components/Headers/Header.js";
import OpenApplicantTable from "./OpenApplicantTable"
import AllApplicantTable from "./AllApplicantTable";
import Button from "reactstrap/lib/Button";

//const cookies = new Cookies();

class Applicants extends React.Component {
  state = {
    viewComplete: false
  }

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
                  <h3 className=" mb-0">Current Applicants</h3>
                </CardHeader>
                <CardBody>All Current Applicants are below</CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardBody>
                  <OpenApplicantTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardBody>
                  {(this.state.viewComplete === true) ?
                  <AllApplicantTable />
                  :
                  <Button className="btn-icon btn-2" color="primary" type="button" onClick={() => this.setState({ viewComplete: true })}>View All Past Applicants</Button>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Applicants;
