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
  UncontrolledTooltip
} from "reactstrap";
import Axios from "axios";
import Notification from "components/Notification";
import Cookies from "universal-cookie";
import Header from "components/Headers/Header.js";

const cookies = new Cookies();


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.notifRef = React.createRef();
    this.removeHandler = this.removeHandler.bind(this);
  }

  state = {
    update: {v: "", updates: []},
    alerts: [],
    currAlert: {id: "", message: ""},
    onlineStaff: []
  }

  async componentDidMount() {
    Axios.get('https://tomr.dev/titan.json')
    .then(res => {
      this.setState({update: res.data})
    })
    Axios.post(`https://internal-api.palace.network/titan/stats/onlineStaff/`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user')
    })
    .then(res => {
      this.setState({onlineStaff: res.data})
    })
    Axios.post(`https://internal-api.palace.network/titan/alerts/getAll/`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user')
    })
    .then(res => {
      this.setState({alerts: res.data});
      this.runNotifs();
    })
    console.log(cookies.get('sGroups'))
  }

  runNotifs() {
    if (this.state.alerts.length !== 0) {
      Axios.post(`https://internal-api.palace.network/titan/alerts/get/${this.state.alerts[0]}`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user')
      })
      .then(res => {
        this.setState({currAlert: res.data});
        this.notifOpen();
      })
    }
  }

  removeHandler() {
    Axios.post(`https://internal-api.palace.network/titan/alerts/read/${this.state.alerts[0]}`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user')
      })
      .then(res => {
        if (res.data) {
          var array = this.state.alerts;
          array.splice(0, 1)
          this.setState({alerts: array})
          this.runNotifs();
        }
      })
  }
  
  notifOpen() {
    this.notifRef.current.toggleModal("notificationModal");
  };

  nameListToArray(staff) {
    staff = staff.replace(/\s/g, '');
    var arr = staff.split(',');
    return arr;
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
                  <h3 className=" mb-0">Welcome to Titan</h3>
                </CardHeader>
                <CardBody>
                    Check the forums for a usage guide.
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Staff Online</h3>
                </CardHeader>
                <CardBody>
                {this.state.onlineStaff.length ?
                      this.state.onlineStaff.map((group) => (
                        <>
                        <h3 key={group.title}>{group.title}</h3>
                        {this.nameListToArray(group.text).map(name => (
                          <>
                          <img
                          alt="..."
                          id={name}
                          key={name}
                          className="avatar rounded-circle mr-3"
                          src={`https://minotar.net/avatar/${name}`}
                          />
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target={name}
                          >
                            {name}
                          </UncontrolledTooltip>
                          </>
                        ), this)}
                        </>
                      ), this) : null}
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Titan Changelog</h3>
                </CardHeader>
                <CardBody>
                    <h1>Version - {this.state.update.v}</h1>
                    <h3>Updates:</h3>
                    <ul>
                      {this.state.update.updates.length ?
                      this.state.update.updates.map(info => (
                        <li key={info}>{info}</li>
                      )) : null}
                    </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Notification ref={this.notifRef} text={this.state.currAlert.message} id={this.state.currAlert.id} handler={this.removeHandler} />
        </Container>
      </>
    );
  }
}

export default Index;
