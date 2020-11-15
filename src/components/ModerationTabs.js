import React from "react";
import classnames from "classnames";
import Axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
import UserToUUID from "components/UsernameFromUUID";
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Media,
  Table
} from "reactstrap";

const cookies = new Cookies();


class ModerationTabs extends React.Component {
  state = {
    tabs: 1,
    warnings: [],
    mutes: [],
    kicks: [],
    bans: []
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  componentDidMount() {
    Axios.post(`https://internal-api.palace.network/titan/lookup/moderation`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      uuid: this.props.uuid
    })
    .then(res1 => {
      if (Object.keys(res1.data).length === 0 && res1.data.constructor === Object) {
        window.location.replace('/dash')
      } else {
        this.setState({warnings: res1.data.warnings, mutes: res1.data.mutes, kicks: res1.data.kicks, bans: res1.data.bans})
        console.log(res1.data.warnings);
      }
    })
  }

    getUsernameFromUUID = ( uuid ) => {
    Axios.get(`https://api.ashcon.app/mojang/v2/user/${uuid}`)
    .then((res) => {
        console.log(res.data.username)
        return ("res.data.username");
    })
}

  render() {
    
    return (
      <>
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
                <i className="fas fa-exclamation-triangle  mr-2" />
                Warnings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#pablo"
                role="tab"
              >
                <i className="fas fa-comment-slash mr-2" />
                Mutes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 3
                })}
                onClick={e => this.toggleNavs(e, "tabs", 3)}
                href="#pablo"
                role="tab"
              >
                <i className="fas fa-user-minus mr-2" />
                Kicks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 4
                })}
                onClick={e => this.toggleNavs(e, "tabs", 4)}
                href="#pablo"
                role="tab"
              >
                <i className="fas fa-gavel mr-2" />
                Bans
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Reasoning</th>
                        <th scope="col">Time</th>
                        <th scope="col">Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.warnings ?
                        this.state.warnings.map(warn => (
                            <tr key={Math.floor(Math.random() * 6000) + 1  }>
                            <th scope="row" style={{whiteSpace: "normal"}}>
                                <span>{warn.reason}</span>
                            </th>
                            <th scope="row">
                                <span>{moment(warn.time).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </th>
                            <th scope="row">
                                <Media className="align-items-center">
                                <a
                                    className="avatar rounded-circle mr-3"
                                    onClick={e => e.preventDefault()}
                                    href="#a"
                                >
                                    <img
                                    alt="..."
                                    src={`https://minotar.net/avatar/${warn.source}`}
                                    />
                                </a>
                                <Media>
                                    <span className="mb-0 text-sm">
                                    <UserToUUID uuid={warn.source} />
                                    </span>
                                </Media>
                                </Media>
                            </th>
                        </tr>
                        ))
                    : null}
                    </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="tabs2">
              <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Reasoning</th>
                        <th scope="col">Time Started</th>
                        <th scope="col">Time Finished</th>
                        <th scope="col">Active</th>
                        <th scope="col">Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mutes.length ?
                        this.state.mutes.map(mute => (
                            <tr key={mute}>
                            <th scope="row">
                                <span>{mute.reason}</span>
                            </th>
                            <th scope="row">
                                <span>{moment(mute.created).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </th>
                            <th scope="row">
                                <span>{moment(mute.expires).format('MMMM Do YYYY, h:mm:ss a')}</span>
                            </th>
                            <th scope="row">
                                <span>{(mute.active ? <i class="fas fa-check-circle"></i> : <i class="fas fa-times"></i>)}</span>
                            </th>
                            <th scope="row">
                                <Media className="align-items-center">
                                <a
                                    className="avatar rounded-circle mr-3"
                                    onClick={e => e.preventDefault()}
                                    href="#a"
                                >
                                    <img
                                    alt="..."
                                    src={`https://minotar.net/avatar/${mute.source}`}
                                    />
                                </a>
                                <Media>
                                    <span className="mb-0 text-sm">
                                    <UserToUUID uuid={mute.source} />
                                    </span>
                                </Media>
                                </Media>
                            </th>
                        </tr>
                        ))
                    : null}
                    </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="tabs3">
                <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Reasoning</th>
                            <th scope="col">Time</th>
                            <th scope="col">Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.kicks.length ?
                            this.state.kicks.map(kick => (
                                <tr key={Math.floor(Math.random() * 6000) + 1  }>
                                <th scope="row" style={{whiteSpace: "normal"}}>
                                    <span>{kick.reason}</span>
                                </th>
                                <th scope="row">
                                    <span>{moment(kick.time).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </th>
                                <th scope="row">
                                    <Media className="align-items-center">
                                    <a
                                        className="avatar rounded-circle mr-3"
                                        onClick={e => e.preventDefault()}
                                        href="#a"
                                    >
                                        <img
                                        alt="..."
                                        src={`https://minotar.net/avatar/${kick.source}`}
                                        />
                                    </a>
                                    <Media>
                                        <span className="mb-0 text-sm">
                                        <UserToUUID uuid={kick.source} />
                                        </span>
                                    </Media>
                                    </Media>
                                </th>
                            </tr>
                            ))
                        : null}
                        </tbody>
                    </Table>
              </TabPane>
              <TabPane tabId="tabs4">
              <Table className="align-items-center" responsive>
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">Reasoning</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Permanent</th>
                            <th scope="col">Active</th>
                            <th scope="col">Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.bans.length ?
                            this.state.bans.map(ban => (
                                <tr key={Math.floor(Math.random() * 6000) + 1  }>
                                <th scope="row" style={{whiteSpace: "normal"}}>
                                    <span>{ban.reason}</span>
                                </th>
                                <th scope="row">
                                    <span>{moment(ban.created).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </th>
                                <th scope="row">
                                    <span>{moment(ban.expires).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                </th>
                                <th scope="row">
                                    <span>{(ban.permanent ? <i class="fas fa-check-circle"></i> : <i class="fas fa-times"></i>)}</span>
                                </th>
                                <th scope="row">
                                    <span>{(ban.active ? <i class="fas fa-check-circle"></i> : <i class="fas fa-times"></i>)}</span>
                                </th>
                                <th scope="row">
                                    <Media className="align-items-center">
                                    <a
                                        className="avatar rounded-circle mr-3"
                                        onClick={e => e.preventDefault()}
                                        href="#a"
                                    >
                                        <img
                                        alt="..."
                                        src={`https://minotar.net/avatar/${ban.source}`}
                                        />
                                    </a>
                                    <Media>
                                        <span className="mb-0 text-sm">
                                        <UserToUUID uuid={ban.source} />
                                        </span>
                                    </Media>
                                    </Media>
                                </th>
                            </tr>
                            ))
                        : null}
                        </tbody>
                    </Table>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default ModerationTabs;