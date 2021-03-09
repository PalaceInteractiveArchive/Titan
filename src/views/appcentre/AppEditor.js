import React from "react";
// node.js library that concatenates classes (strings)
import Cookies from 'universal-cookie';
// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import {ReactFormBuilder} from 'react-form-builder2';
import Header from "components/Headers/Header.js";
import "react-form-builder2/dist/app.css";

const cookies = new Cookies();

class AppEditor extends React.Component {
  state = {
    appId: ""
  };
  

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log(params.id)
    this.setState({ appId: params.id });
    console.log(this.state.appId);
  }

  render() {
    if (this.state.appId === "") {
      return <></>
    } else {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Edit Application</h3>
                </CardHeader>
                <CardBody>
                  This Page will Auto-Save. If you experience issues reach out
                  to Devs on Slack.
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Form Builder</h3>
                </CardHeader>
                <CardBody>
                  <ReactFormBuilder
                    url={`${process.env.REACT_APP_API_URL}/titan/application/getFormData/${this.state.appId}`}
                    saveUrl={`${process.env.REACT_APP_API_URL}/titan/application/saveFormData/${this.state.appId}`}
                    additionalBody={{user: cookies.get("user"), accessToken: cookies.get("accessToken")}}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
    }
  }
}

export default AppEditor;
