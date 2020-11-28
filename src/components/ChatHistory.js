import React from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";
import classnames from "classnames";
// reactstrap components
import {
  Table,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";

const cookies = new Cookies();


class ChatTab extends React.Component {
  state = {
    loading: true,
    chat: [],
    page: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  componentDidMount() {
    Axios.post(`https://internal-api.palace.network/titan/lookup/chat`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      uuid: this.props.uuid,
      page: 1
    })
    .then(res1 => {
        this.setState({chat: res1.data.chat, loading: false})
        console.log(res1.data.chat);
    })
  }

  newSetOfChat( e, direction ) {
    e.preventDefault();
    if (direction) {
        let tempPage = this.state.page;
        tempPage++;
        this.setState({ loading: true, page: tempPage, chat: []});
        Axios.post(`https://internal-api.palace.network/titan/lookup/chat`, {
            accessToken: cookies.get('accessToken'),
            user: cookies.get('user'),
            uuid: this.props.uuid,
            page: tempPage
        })
        .then(res1 => {
                this.setState({chat: res1.data.chat, loading: false})
                console.log(res1.data.chat);
        })
    } else {
        let tempPage = this.state.page;
        if (tempPage > 1) {
            tempPage--;
        } else {

        }
        console.log(tempPage)
        this.setState({ loading: true, page: tempPage, chat: []});
        Axios.post(`https://internal-api.palace.network/titan/lookup/chat`, {
            accessToken: cookies.get('accessToken'),
            user: cookies.get('user'),
            uuid: this.props.uuid,
            page: tempPage
        })
        .then(res1 => {
                this.setState({chat: res1.data.chat, loading: false})
                console.log(res1.data.chat);
        })
    }
  }

  render() {
    
    if (this.state.loading) {
        return (
            <>
            <div className="fa-3x">
                <center>
                    <i className="fas fa-cog fa-spin fa-3x"></i>
                    <h1>We're just loading this for you.</h1>
                </center>
            </div>
            </>
        );
    } else {
        return (
            <>
            <Nav className="nav-pills-circle" id="chat_tabs" pills role="tablist">
                <NavItem>
                    <NavLink
                    aria-selected={this.state.circledNavPills === 1}
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 1
                    })}
                    onClick={e => this.newSetOfChat(e, false)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="fas fa-arrow-left" />
                    </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    className={classnames("rounded-circle", {
                        active: this.state.circledNavPills === 2
                    })}
                    onClick={e => this.newSetOfChat(e, true)}
                    href="#pablo"
                    role="tab"
                    >
                    <span className="nav-link-icon d-block">
                        <i className="fas fa-arrow-right" />
                    </span>
                    </NavLink>
                </NavItem>
            </Nav>
            <br />
            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                    <tr>
                    <th scope="col">Message</th>
                    <th scope="col">Time Sent</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.chat.length ?
                    this.state.chat.map(msg => (
                        <tr key={Math.floor(Math.random() * 60000) + 1  }>
                        <th scope="row" style={{whiteSpace: "normal"}}>
                            <span>{msg.message}</span>
                        </th>
                        <th scope="row">
                            <span>{moment(msg.time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</span>
                        </th>
                    </tr>
                    ))
                : null}
                </tbody>
            </Table>
            </>
        )
    }
    
  }
}

export default ChatTab;