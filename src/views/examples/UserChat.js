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
  Button
} from "reactstrap";

import Header from "components/Headers/Header.js";
import ChatTab from "components/ChatHistory";

const cookies = new Cookies();


class UserChat extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            isEntered: false,
            userChange: '',
            uuid: 0,
            isDisabled: false
        };
    
        this.handleUserChange = this.handleUserChange.bind(this);
        this.usernameToUUID = this.usernameToUUID.bind(this);
    }

    usernameToUUID() {
        this.setState({isEntered: false, isDisabled: true});
        Axios.post(`https://internal-api.palace.network/titan/lookup/general`, {
            accessToken: cookies.get('accessToken'),
            user: cookies.get('user'),
            username: this.state.userChange
        })
        .then(res1 => {
            this.setState({uuid: res1.data.game.uuid, isEntered: true});
        })
        .catch(err => {
            alert('Player not found')
        })
    }

    handleUserChange(event) {
        this.setState({userChange: event.target.value, isDisabled: false});
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
                  <h3 className=" mb-0">User Chat View</h3>
                </CardHeader>
                <CardBody>
                    <h1>Search a user below</h1>
                    <div class="form-group">
                        <input id="username" required="" type="text" className="form-control" onChange={this.handleUserChange} />
                    </div>
                    <Button className="btn-icon btn-2" color="primary" type="button" disabled={this.state.isDisabled} onClick={this.usernameToUUID}>
                    <span className="btn-inner--icon">
                        Search
                    </span>
                    </Button>
                </CardBody>
              </Card>
            </div>
          </Row>
          <Row className="mt-5">
            <div className=" col">
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                            <h3 className=" mb-0">Users Chat</h3>
                        </CardHeader>
                        <CardBody>
                            {this.state.isEntered ?
                            <ChatTab uuid={this.state.uuid} />
                            : <></>}
                        </CardBody>
                    </Card>
                </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default UserChat;
