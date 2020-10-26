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

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Cookies from "universal-cookie";
import Axios from "axios";

const cookies = new Cookies();


class Profile extends React.Component {
  state = {
    userFriends: 0,
    userInfo: { forum: { photoUrl: '', primaryGroup: {name: ''}}},
    uName: ''
  }

  

  componentDidMount() {

    const { match: { params } } = this.props;
    this.setState({uName: params.id})
    console.log(`http://localhost:3001/titan/stats/getUser/${params.id}/${cookies.get('accessToken')}`);
    Axios.get(`http://localhost:3001/titan/stats/getUser/${params.id}/${cookies.get('accessToken')}`)
    .then(res1 => {
      if (Object.keys(res1.data).length === 0 && res1.data.constructor === Object) {
        window.location.replace('/dash')
      } else {
        this.setState({userInfo: res1.data})
        console.log(res1.data);
        Axios.get(`http://localhost:3001/titan/stats/getFriends/${res1.data.game.uuid}`)
        .then(res2 => {
            this.setState({ userFriends: res2.data });
        });
      }
    })
  }

  render() {
    return (
      <>
        <UserHeader greeting='Meet,' uName={this.state.uName} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#a" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          src={this.state.userInfo.forum.photoUrl}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">{this.state.userFriends}</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.userInfo.forum.posts}</span>
                          <span className="description">Posts</span>
                        </div>
                        <div>
                          <span className="heading">{this.state.userInfo.forum.reputationPoints}</span>
                          <span className="description">Reputation</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                    {this.state.userInfo.forum.name}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.userInfo.forum.primaryGroup.name}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      Wow, so cool.
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={this.state.userInfo.forum.name}
                              id="input-username"
                              placeholder="Username"
                              disabled
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-rank"
                            >
                              Rank
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-rank"
                              placeholder=""
                              disabled
                              defaultValue={this.state.userInfo.forum.primaryGroup.name}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-titan-info"
                            >
                              Titan Registered
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="N/A"
                              disabled
                              id="input-titan-info"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
