import React from "react";
import Cookies from "universal-cookie";
import Axios from "axios";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Table,
  Media,
  Button
} from "reactstrap";

import Header from "components/Headers/Header.js";

const cookies = new Cookies();


class AdminArea extends React.Component {

    
    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
        groups: {},
        alertMsg: '',
      }
  
      this.handleMsgChange = this.handleMsgChange.bind(this);
      this.sendAlert = this.sendAlert.bind(this);
  }

    componentDidMount() {
      Axios.post(`https://internal-api.palace.network/titan/stats/titanUserList`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user')
      })
      .then(res1 => {
        this.setState({data: res1.data})
        this.getGroupInfo();
      })
    }

    getGroupInfo() {
      Axios.post(`https://internal-api.palace.network/titan/stats/getGroups`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user')
      })
      .then(res1 => {
        this.setState({groups: res1.data})
      })
    }

    getGroupName(id) {
      var gName = "group" + id.toString();
      return(this.state.groups[gName]);
    }

    userChatUpdate(e) {
      var action = '';
      if (e.target.checked) {
        action = 'add';
      } else {
        action = 'remove';
      }
      Axios.post(`https://internal-api.palace.network/titan/admin/update/${e.target.id}/chat`, {
          accessToken: cookies.get('accessToken'),
          user: cookies.get('user'),
          action: action
        })
        .then(res1 => {
        })
    }

    userSupportUpdate(e) {
      var action = '';
      if (e.target.checked) {
        action = 'add';
      } else {
        action = 'remove';
      }

      Axios.post(`https://internal-api.palace.network/titan/admin/update/${e.target.id}/support`, {
          accessToken: cookies.get('accessToken'),
          user: cookies.get('user'),
          action: action
        })
        .then(res1 => {
        })
    }

    handleMsgChange(event) {
      this.setState({alertMsg: event.target.value});
    }

    sendAlert() {
      Axios.post(`https://internal-api.palace.network/titan/admin/alert/add/`, {
          accessToken: cookies.get('accessToken'),
          user: cookies.get('user'),
          alertContent: this.state.alertMsg
        })
        .then(res1 => {
          if (res1.data.saved) {
            alert('Saved! This Alert will now be seen by all when logging in');
          } else {
            alert('Error Saving!');
          }
        })
    }


  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Admin Area</h3>
                </CardHeader>
                <CardBody>
                  <h3>Users will need to logout and back in after being updated.</h3>
                <Table className="align-items-center" responsive>
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">User</th>
                        <th scope="col">Rank</th>
                        <th scope="col">Support Admin</th>
                        <th scope="col">User Chat</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.length ?
                        this.state.data.map(data => (
                            <tr key={data.name}>
                            <th scope="row">
                            <Media className="align-items-center">
                                <a
                                    className="avatar rounded-circle mr-3"
                                    href={`/dash/user/${data.name}`}
                                >
                                    <img
                                    alt="..."
                                    src={`https://minotar.net/avatar/${data.name}`}
                                    />
                                </a>
                                <Media>
                                    <span className="mb-0 text-sm">
                                      {data.name}
                                    </span>
                                </Media>
                                </Media>
                            </th>
                            <th scope="row">
                                <span>{this.getGroupName(data.pgroup)}</span>
                            </th>
                            <th scope="row">
                                <label className="custom-toggle">
                                  {data.allowedRoutes.includes(1) ?
                                  <input defaultChecked type="checkbox" id={data.id} onChange={this.userSupportUpdate} />
                                  : <input type="checkbox" id={data.id} onChange={this.userSupportUpdate} />
                                  }
                                  <span className="custom-toggle-slider rounded-circle" />
                                </label>
                            </th>
                            <th scope="row">
                                <label className="custom-toggle">
                                  {data.allowedRoutes.includes(2) ?
                                  <input defaultChecked type="checkbox" id={data.id} onChange={this.userChatUpdate}/>
                                  : <input type="checkbox" id={data.id} onChange={this.userChatUpdate}/>
                                  }
                                  <span className="custom-toggle-slider rounded-circle" />
                                </label>
                            </th>
                        </tr>
                        ))
                    : null}
                    </tbody>
                </Table>
                </CardBody>
              </Card>
            </div>
          </Row>
          <Row className="mt-5">
          <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Alert Control</h3>
                </CardHeader>
                <CardBody>
                  <h3>Send out an Alert.</h3>
                  <div className="form-group">
                        <input id="alert_msg" required="" type="text" className="form-control" onChange={this.handleMsgChange} />
                    </div>
                    <Button className="btn-icon btn-2" color="primary" type="button" onClick={this.sendAlert}>
                    <span className="btn-inner--icon">
                        Search
                    </span>
                    </Button>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default AdminArea;
