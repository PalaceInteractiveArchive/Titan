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


class MyApplications extends React.Component {
  state = {
      applications: []
  }

  componentDidMount() {
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getMyApplications`, {
        user: cookies.get("applyCookie")
    })
    .then((res) => {
      let apps = [...res.data];
      // apps.forEach((e) => {
      //   Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/get/${e.appId}`, {
      //     user: cookies.get("applyCookie")
      //   })
      //   .then((res2) => {
      //     e.appName = res2.data.name;
      //   })
      // })
      console.log(apps)
      this.setState({ applications: apps })
    })
  }

  checkForum = () => {
      if (cookies.get("applyCookie").forums.member_id !== null) {
          return false
      } else {
          return true
      }
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
        console.log(this.state.applications)
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
                    View all of your applications below
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
                    <Col key={e.appName}>
                    <Card style={{ width: "18rem" }} className="mt-2">
                        <CardBody>
                            <CardTitle>{e.appName}</CardTitle>
                            <CardText>
                            You submitted this application. Current status:<b><span className="clearfix" />{e.outcome[0].toUpperCase() + e.outcome.substring(1)}</b>
                            </CardText>
                            <Button
                            color="primary"
                            onClick={() => { this.props.history.push(`/apply/view/${e.id}`) }}
                            >
                            View
                            </Button>
                        </CardBody>
                    </Card>
                    </Col>
                )) : <Col><center><h1>You haven't submitted an application yet!</h1></center></Col> }
          </Row>
         </Container>
      </>
    );
    }
  }
}

export default MyApplications;
