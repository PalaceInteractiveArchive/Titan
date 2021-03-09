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
  CardText,
  Button
} from "reactstrap";
import Axios from "axios";
import Cookies from "universal-cookie";
import Header from "components/Headers/ApplyHeader.js";

const cookies = new Cookies();


class Index extends React.Component {
  state = {
      applications: []
  }

  componentDidMount() {
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getAllOpen`, {
        user: cookies.get("applyCookie")
    })
    .then((res) => {
      this.setState({ applications: res.data})
    })
  }

  checkForum = () => {
      if (cookies.get("applyCookie").forums.member_id !== null) {
          return false
      } else {
          return true
      }
  }

  goToAppPage = (id) => {
    this.props.history.push(`/apply/application/${id}`)
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
                  <h3 className=" mb-0">Welcome to Titan</h3>
                </CardHeader>
                <CardBody>
                    Welcome to the Application Centre.
                </CardBody>
              </Card>
            </Col>
          </Row>
            {(this.checkForum === true) ?
          <Row className="mt-3 align-items-center">
          <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0 text-danger">Please link your forums profile!</h3>
                </CardHeader>
                <CardBody>
                    To Continue with your application please link your Forum Account in game and re-authorize.
                </CardBody>
              </Card>
            </Col>
          </Row> 
          : null}
          <Row className="mt-3 align-items-center">
                {this.state.applications.length ?
                this.state.applications.map(e => (
                    <Col key={e.id}>
                    <Card style={{ width: "18rem" }} className={"mt-5"}>
                        <CardBody>
                            <CardTitle>{e.name}</CardTitle>
                            <CardText>
                            You can apply for this position by clicking the button below.
                            </CardText>
                            <Button
                            color="primary"
                            onClick={() => this.goToAppPage(e.appId)}
                            >
                            Apply
                            </Button>
                        </CardBody>
                    </Card>
                    </Col>
                )) : <Col><center><h1>There are no Applications open right now. Check Back soon!</h1></center></Col> }
          </Row>
         </Container>
      </>
    );
    }
  }
}

export default Index;
