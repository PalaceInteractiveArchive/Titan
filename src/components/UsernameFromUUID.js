import React from "react";
import Axios from "axios";

class UserToUUID extends React.Component {
  state = {
    name: ""
  };
  
  componentDidMount() {
    Axios.get(`https://api.ashcon.app/mojang/v2/user/${this.props.uuid}`)
    .then((res) => {
        this.setState({name: res.data.username})
    })
  }

  render() {
    return this.state.name;
}

}

export default UserToUUID;