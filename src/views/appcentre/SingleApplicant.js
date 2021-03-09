import React from "react";
// node.js library that concatenates classes (strings)
//import Cookies from 'universal-cookie';
// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader, Button, FormGroup, Input } from "reactstrap";
import Header from "components/Headers/Header.js";
import Axios from "axios";
import Cookies from "universal-cookie";
import { ReactFormGenerator } from "react-form-builder2";
import ModerationTabs from "../../components/ModerationTabs"
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../assets/css/app-editor.css'

const cookies = new Cookies();

class SingleApplicant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      ready: false,
      application: {},
      responseBox: EditorState.createEmpty(),
      checked: false,
      status: "1",
      openResponse: false
    }
    this.sendToApi = this.sendToApi.bind(this);
    this.changeTickbox = this.changeTickbox.bind(this);
    this.changeOpenToResponse = this.changeOpenToResponse.bind(this);
  }

  responseChange = (responseBox) => this.setState({responseBox});

  changeTickbox() {
    if (this.state.checked) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
    }
  }

  changeOpenToResponse() {
    if (this.state.openResponse) {
      this.setState({ openResponse: false });
    } else {
      this.setState({ openResponse: true });
    }
  }

  sendToApi() {
    let response = convertToRaw(this.state.responseBox.getCurrentContent());
    let sender;
    if (this.state.checked) {
      sender = "Palace Network Administration";
    } else {
      sender = cookies.get("user").name + " (Leadership)";
    }
    let objToSend = { message: response, sender: sender};
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/sendAdminResponse/${this.state.appId}`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      response: objToSend,
      status: this.state.status,
      openToResponse: this.state.openResponse
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    })
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.setState({ appId: params.id });

    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getSingleApplicationAdmin`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      id: params.id
    })
    .then((res) => {
      let data = res.data;
      // this.setState({ data: res.data});
      Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getAllTypes`, {
        accessToken: cookies.get('accessToken'),
        user: cookies.get('user'),
      })
      .then((res2) => {
        let selected = res2.data.find(o => o.appId === parseInt(data.appId));
        data.appName = selected.name;
        Axios.get(`https://api.ashcon.app/mojang/v2/user/${data.uuid}`)
        .then((res) => {
            data.username = res.data.username;
            data.outcome = data.outcome[0].toUpperCase() + data.outcome.substring(1);
            this.setState({ data: data, application: selected, ready: true});
        })
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    if (!this.state.ready) {
      return (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="align-items-center">
              <Col>
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Loading...</h3>
                  </CardHeader>
                  <CardBody>One moment please!</CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    } else {
      console.log(this.state.data.responses)
      return (
        <>
          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="align-items-center">
              <Col>
                <Card className=" shadow">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Viewing Application</h3>
                  </CardHeader>
                  <CardBody>
                    You are viewing: {this.state.data.username} - {this.state.data.appName}<br></br>
                    Current Status: {this.state.data.outcome[0].toUpperCase() + this.state.data.outcome.substring(1)}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                  <Card className=" shadow mt-5">
                    <CardHeader className=" bg-transparent">
                      <h3 className=" mb-0">Application Form</h3>
                    </CardHeader>
                    <CardBody>
                        <ReactFormGenerator
                            className="mt-3"
                            data={this.state.application.applicationLayout}
                            read_only={true}
                            hide_actions={true}
                            answer_data={this.state.data.application}
                        />
                    </CardBody>
                  </Card>
              </Col>
                  <Col sm={6}>
                  <Card className=" shadow mt-5">
                    <CardHeader className=" bg-transparent">
                      <h3 className=" mb-0">Moderation Log</h3>
                    </CardHeader>
                    <CardBody>
                      <ModerationTabs
                        uuid={this.state.data.uuid}
                      />
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Card className=" shadow mt-3">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Conversation</h3>
                  </CardHeader>
                  <CardBody>
                    Current Conversation with the applicant
                  </CardBody>
                </Card>
                {this.state.data.responses.slice(0).reverse().map((response, index) => (
                  <Card className=" shadow mt-3">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">{response.sender}</h3>
                  </CardHeader>
                  <CardBody>
                    <Editor
                      readOnly={true}
                      toolbarHidden={true}
                      editorState={EditorState.createWithContent(convertFromRaw(response.message))}
                     />
                  </CardBody>
                </Card>
                ))}
              </Col>
              <Col>
                <Card className=" shadow mt-3">
                  <CardHeader className=" bg-transparent">
                    <h3 className=" mb-0">Send response</h3>
                  </CardHeader>
                  <CardBody>
                    <Editor
                      editorState={this.state.responseBox}
                      onEditorStateChange={this.responseChange}
                      wrapperClassName={'outerResponseBox'}
                     />
                    <span>Send anonymously?</span>
                    <span className="clearfix" />
                    <label className="custom-toggle">
                      <input type="checkbox" onChange={this.changeTickbox} />
                      <span className="custom-toggle-slider rounded-circle" />
                    </label>
                    <span className="clearfix" />
                    <span>Allow Applicant Response?</span>
                    <span className="clearfix" />
                    <label className="custom-toggle">
                      <input type="checkbox" onChange={this.changeOpenToResponse} />
                      <span className="custom-toggle-slider rounded-circle" />
                    </label>
                    <span className="clearfix" />
                    <span>New Status</span>
                    <FormGroup>
                      <Input type="select" name="select" id="appStatus" onChange={(e) => { this.setState({ status: e.target.value})}}>
                        <option value="1">Waiting Response</option>
                        <option value="2">Accepted</option>
                        <option value="3">Declined</option>
                      </Input>
                    </FormGroup>
                    <Button className="btn-icon btn-2" color="primary" type="button" onClick={this.sendToApi}>Send response</Button>
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

export default SingleApplicant;
