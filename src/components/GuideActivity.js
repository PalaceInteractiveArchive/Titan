import React from "react";
import Axios from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class GuideActivity extends React.Component {
  state = {
    day: 0,
    week: 0,
    month: 0,
    total: 0
  };

  componentDidMount() {
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/lookup/glog`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      uuid: this.props.uuid
    })
    .then(res => {
      if (Object.keys(res.data).length === 0 && res.data.constructor === Object) {
        window.location.replace('/dash')
      } else {
        this.setState({day: res.data.day, week: res.data.week, month: res.data.month, total: res.data.total})
      }
    })
  }

  render() {
    var restricted = [8, 33, 4, 7]
    let sGroupCheck = false;
        let secondaries = cookies.get("sGroups")
        secondaries.forEach(element => {
          if (restricted.includes(element)) {
            sGroupCheck = true;
          }
        });
    if (restricted.includes(cookies.get("user").pgroup) | sGroupCheck) {
      return (
        <>
          <h2>Guide Activity</h2>
          <span>Last Day: {this.state.day}</span><br />
          <span>Last Week: {this.state.week}</span><br />
          <span>Last Month: {this.state.month}</span><br />
          <span>All Time: {this.state.total}</span><br />
        </>
      );
    } else {
      return (
        <>
          You do not have permission to view this.
        </>
      );
    }
  }
}

export default GuideActivity;
