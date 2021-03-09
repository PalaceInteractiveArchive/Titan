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
} from "reactstrap";
import Cookies from "universal-cookie";
import Header from "components/Headers/ApplyHeader.js";

const cookies = new Cookies();


class SubmittedPage extends React.Component {
  state = {
      response: ""
  }

  componentDidMount() {
    const {
        match: { params },
      } = this.props;
      this.setState({response: params.response})
  }

  render() {
      if (!cookies.get("applyCookie")) {
        return (
            <>
                <Col>
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                        <h3 className=" mb-0">Please use /apply to access this website</h3>
                        </CardHeader>
                    </Card>
                </Col>
            </>
        );
      } else {
    return (
      <>
        <Header name={cookies.get("applyCookie").username} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
          <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  {(this.state.response === "200") ? <h3 className=" mb-0">Thank you for your application!</h3> : <h3 className=" mb-0">We Encountered an unexpected error!</h3> }
                </CardHeader>
                <CardBody>
                    {(this.state.response === "200") ? <span>Thank you for your application! When we have an update for you, you will see a notification when logging into the server! Have a wonderful day.</span> : <span>Oh no! We encountered an unexpected error! If you can, try going back and submitting again. If you still have no luck, please try reaching out to a member of the Development team on Discord.</span>}
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

export default SubmittedPage;
