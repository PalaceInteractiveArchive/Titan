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
import moment from "moment";
import classnames from "classnames";
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
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import ModerationTabs from "components/ModerationTabs";
import ChatTab from "components/ChatHistory";
import Cookies from "universal-cookie";
import Axios from "axios";

const cookies = new Cookies();


class Profile extends React.Component {
  state = {
    userFriends: 0,
    userInfo: {},
    uName: '',
    isLoading: true,
    tabs: 1
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  componentDidMount() {

    const { match: { params } } = this.props;
    this.setState({uName: params.id})
    Axios.post(`https://internal-api.palace.network/titan/lookup/general`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      username: params.id
    })
    .then(res1 => {
      if (Object.keys(res1.data).length === 0 && res1.data.constructor === Object) {
        window.location.replace('/dash')
      } else {
        this.setState({userInfo: res1.data})
        console.log(res1.data);
        Axios.post(`https://internal-api.palace.network/titan/stats/getFriends/${res1.data.game.uuid}`, {
          accessToken: cookies.get('accessToken'),
          user: cookies.get('user')
        })
        .then(res2 => {
            this.setState({ userFriends: res2.data });
            this.setState({ isLoading: false });
        });
      }
    })
  }
  
  render() {
    if (!this.state.isLoading) {
      const formatted = moment(this.state.userInfo.game.lastOnline).format('MMMM Do YYYY, h:mm:ss a');
        return (
          <>
            <UserHeader greeting='Meet,' uName={this.state.userInfo.game.username} />
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
                              src={`https://minotar.net/avatar/${this.state.userInfo.game.uuid}`}
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
                              <span className="heading">{(this.state.userInfo.hasOwnProperty('forum')) ? this.state.userInfo.forum.posts : "-"}</span>
                              <span className="description">Posts</span>
                            </div>
                            <div>
                              <span className="heading">{(this.state.userInfo.hasOwnProperty('forum')) ? this.state.userInfo.forum.reputationPoints : "-"}</span>
                              <span className="description">Reputation</span>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <div className="text-center">
                        <h3>
                        {(this.state.userInfo.hasOwnProperty('forum')) ? this.state.userInfo.forum.name : this.state.userInfo.game.username}
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          <span>{(this.state.userInfo.hasOwnProperty('forum')) ? this.state.userInfo.forum.primaryGroup.name : "No Forum Data"}</span>
                          <br/>
                          <FormGroup>
                            <Input
                              className="form-control-alternative"
                              defaultValue={(this.state.userInfo.hasOwnProperty('forum')) ? `https://forums.palace.network/profile/${this.state.userInfo.forum.id}-titan` : "No Forum Link Available"}
                              id="input-forums-url"
                              disabled
                              type="text"
                              style={{marginTop: "1rem"}}
                            />
                          </FormGroup>
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
                          <h3 className="mb-0">Information</h3>
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
                                  defaultValue={this.state.userInfo.game.username}
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
                                  defaultValue={this.state.userInfo.game.rank}
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
                                  htmlFor="input-titan-tags"
                                >
                                  User Tags
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={this.state.userInfo.game.tags}
                                  disabled
                                  id="input-titan-tags"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-titan-discord"
                                >
                                  User Discord
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={(this.state.userInfo.game.discordUsername !== "") ? this.state.userInfo.game.discordUsername : 'N/A'}
                                  disabled
                                  id="input-titan-discord"
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
                                  htmlFor="input-titan-online"
                                >
                                  Last Online
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={formatted}
                                  disabled
                                  id="input-titan-online"
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
              <Container className="mt-5" fluid>
              <Row>
                <Col className="order-xl-1">
                  <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                              <Col xs="8">
                                <h3 className="mb-0">User Details</h3>
                              </Col>
                            </Row>
                    </CardHeader>
                    <CardBody>
                      <div className="nav-wrapper">
                        <Nav
                          className="nav-fill flex-column flex-md-row"
                          id="tabs-icons-text"
                          pills
                          role="tablist"
                        >
                          <NavItem>
                            <NavLink
                              aria-selected={this.state.tabs === 1}
                              className={classnames("mb-sm-3 mb-md-0", {
                                active: this.state.tabs === 1
                              })}
                              onClick={e => this.toggleNavs(e, "tabs", 1)}
                              href="#pablo"
                              role="tab"
                            >
                              <i className="ni ni-fat-remove mr-2" />
                              Moderation
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              aria-selected={this.state.tabs === 2}
                              className={classnames("mb-sm-3 mb-md-0", {
                                active: this.state.tabs === 2
                              })}
                              onClick={e => this.toggleNavs(e, "tabs", 2)}
                              href="#"
                              role="tab"
                            >
                              <i className="ni ni-bell-55 mr-2" />
                              Chat History
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                      <Card className="shadow">
                        <CardBody>
                          <TabContent activeTab={"tabs" + this.state.tabs}>
                            <TabPane tabId="tabs1">
                              <ModerationTabs uuid={this.state.userInfo.game.uuid} />
                            </TabPane>
                            <TabPane tabId="tabs2">
                              <p>Chat will return soon.</p>
                            </TabPane>
                          </TabContent>
                        </CardBody>
                      </Card>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            </Container>
          </>
        );
    } else {
      return(
        <h1>Loading</h1>
      )
    }
  }
}

export default Profile;
