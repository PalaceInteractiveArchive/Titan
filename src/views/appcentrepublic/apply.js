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
  CardHeader
} from "reactstrap";
import Axios from "axios";
import Cookies from "universal-cookie";
import Header from "components/Headers/ApplyHeader.js";
import { ReactFormGenerator, ElementStore } from 'react-form-builder2';
import "react-form-builder2/dist/app.css";


const cookies = new Cookies();


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: {applicationLayout: []},
            time: "",
            data: [],
            previewVisible: false,
            shortPreviewVisible: false,
            roPreviewVisible: false,
        }

        this._onSubmit = this._onSubmit.bind(this);
        const update = this._onChange.bind(this);
        ElementStore.subscribe(state => update(state.data));
    }
  state = {
      application: {applicationLayout: []},
      time: ""
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  _onSubmit(data) {
    console.log(data);
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/submit/${this.state.application.appId}`, {
        formData: data,
        user: cookies.get("applyCookie")
    })
    .then(res => {
        if (res.status === 200) {
            this.props.history.push(`/apply/submitted/200`)
        } else {
            this.props.history.push(`/apply/submitted/${res.status}`)
        }
    })
    .catch(err => {
        this.props.history.push(`/apply/submitted/${err.status}`)
    })
  }

  componentDidMount() {
    const {
        match: { params },
      } = this.props;
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/get/${params.id}`, {
        user: cookies.get("applyCookie")
    })
    .then((res) => {
      this.setState({ application: res.data})
    })
    var date = new Date(cookies.get("applyCookie").loginCode.expires * 1000);
    this.setState({ time: date.toString()})
  }

  checkForum = () => {
      if (cookies.get("applyCookie").forums.member_id !== null) {
          return false
      } else {
          return true
      }
  }

  render() {
      if (!cookies.get("applyCookie")) {
        return (
            <>
                <Col>
                    <Card className=" shadow">
                        <CardHeader className=" bg-transparent">
                        <h3 className=" mb-0">Please use /apply to access this website</h3>
                        </CardHeader>
                    </Card>
                </Col>
            </>
        );
      } else {
    return (
      <>
        <Header name={cookies.get("applyCookie").username} />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {(this.checkForum === true) ?
          <Row className="mt-3 align-items-center">
          <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0 text-danger">Please link your forums profile!</h3>
                </CardHeader>
                <CardBody>
                    To Continue with your application please link your Forum Account in game and re-authorize.
                </CardBody>
              </Card>
            </Col>
          </Row> 
          : null}
          <Row className="align-items-center">
          <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">{this.state.application.name}</h3>
                </CardHeader>
                <CardBody>
                    Fill out the Applicaiton Below. Your session expires at {this.state.time}. Writing answers in a Google Doc first so you don't lose anything is a smart idea!
                    <ReactFormGenerator
                        className="mt-3"
                        form_method="POST"
                        onSubmit={this._onSubmit}
                        data={this.state.application.applicationLayout} // Question data
                    />
                </CardBody>
              </Card>
            </Col>
          </Row>
         </Container>
      </>
    );
    }
  }
}

export default Index;
