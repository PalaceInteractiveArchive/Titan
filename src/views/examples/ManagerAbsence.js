import React from "react";
//import ReactDatetime from "react-datetime";
import Cookies from "universal-cookie";
import Axios from "axios";
import moment from "moment";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const cookies = new Cookies();


class SupportAdmin extends React.Component {

    state = {
      current: [],
      all: []
    }

    componentDidMount() {
        Axios.post(`https://internal-api.palace.network/titan/support/currentAbsence`, {
            accessToken: cookies.get('accessToken'),
            user: cookies.get('user')
        })
        .then(res => {
          console.log("current")
          console.log(res)
            Axios.post(`https://internal-api.palace.network/titan/support/allAbsence`, {
              accessToken: cookies.get('accessToken'),
              user: cookies.get('user')
            })
            .then(res1 => {
              console.log("all")
              console.log(res1.data)
                this.setState({current: res.data, all: res1.data})
            })
        })
        .catch(err => {
          console.log(err.response.status)
          if (err.response.status === 401) {
            window.location.replace('/dash')
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
                  <h3 className=" mb-0">Palace Support Centre</h3>
                </CardHeader>
                <CardBody>
                    <h1>Hey, {cookies.get('user').name}</h1>
                    <h3>All Current Absences are listed below. You can also see all of them submitted in the last 3 months.</h3>
                </CardBody>
              </Card>
            </div>
          </Row>
          <Row className="mt-5">
              <div className="col-md">
                  <Card className=" bg-default shadow">
                      <CardHeader className=" bg-transparent border-0">
                          <h3 className="text-white mb-0">Current Absences</h3>
                      </CardHeader>
                  </Card>
              </div>
          </Row>
          <Row className="mt-3">
            {this.state.current.length ?
            this.state.current.map(curr => (
              <div className="col-md-4">
              <Card className="shadow">
                <CardHeader className=" bg-transparent border-0">
                  <center>
                  <h2 className="text-black mb-1">{curr.name}</h2>
                  <h4 className="text-primary mb-1">{moment(curr.startDate * 1000).format('MMMM Do YYYY, h:mm:ss a')}</h4>
                  <h4 className="text-black mb-1">Until</h4>
                  <h4 className="text-primary mb-1">{moment(curr.endDate * 1000).format('MMMM Do YYYY, h:mm:ss a')}</h4>
                  <h4 className="text-black">Reason: {curr.reason}</h4>
                  </center>
                </CardHeader>
              </Card>
              </div>
            ))
            : null}
          </Row>
          <Row className="mt-5">
              <div className="col-md">
                  <Card className=" bg-default shadow">
                      <CardHeader className=" bg-transparent border-0">
                          <h3 className="text-white mb-0">Last 3 Months</h3>
                      </CardHeader>
                  </Card>
              </div>
          </Row>
          <Row className="mt-3">
            {this.state.all.length ?
            this.state.all.map(all => (
              <div className="col-md-4">
              <Card className="shadow">
                <CardHeader className=" bg-transparent border-0">
                  <center>
                  <h2 className="text-black mb-1">{all.name}</h2>
                  <h4 className="text-primary mb-1">{moment(all.startDate * 1000).format('MMMM Do YYYY, h:mm:ss a')}</h4>
                  <h4 className="text-black mb-1">Until</h4>
                  <h4 className="text-primary mb-1">{moment(all.endDate * 1000).format('MMMM Do YYYY, h:mm:ss a')}</h4>
                  <h4 className="text-black">Reason: {all.reason}</h4>
                  </center>
                </CardHeader>
              </Card>
              </div>
            ))
            : null}
          </Row>
        </Container>
      </>
    );
  }
}

export default SupportAdmin;