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
    CardHeader,
    Button
} from "reactstrap";
import Axios from "axios";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { ReactFormGenerator } from "react-form-builder2";
import Cookies from "universal-cookie";
import Header from "components/Headers/ApplyHeader.js";

const cookies = new Cookies();


class SingleApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: {},
            layout: {},
            ready: false,
            responseBox: EditorState.createEmpty()
        }
        this.sendToApi = this.sendToApi.bind(this);
    }
    

    responseChange = (responseBox) => this.setState({responseBox});

    componentDidMount() {
        console.log(cookies.get("applyCookie"))
        const {
            match: { params },
        } = this.props;
        Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/getMyApplication/${params.id}`, {
            user: cookies.get("applyCookie"),
        })
            .then((res) => {
                Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/get/${res.data.appId}`, {
                    user: cookies.get("applyCookie")
                })
                    .then((res2) => {
                        this.setState({ layout: res2.data, application: res.data, ready: true })
                        console.log(res2.data)
                    })
            })
    }

    sendToApi() {
        let response = convertToRaw(this.state.responseBox.getCurrentContent());
        let sender = `${cookies.get("applyCookie").username} (Applicant)`;
        let objToSend = { message: response, sender: sender};
        Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/sendGuestResponse/${this.state.application.id}`, {
          accessToken: cookies.get('accessToken'),
          user: cookies.get('applyCookie'),
          response: objToSend,
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
            console.error(err)
        })
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
            if (this.state.ready) {
                return (
                    <>
                        <Header name={cookies.get("applyCookie").username} />
                        {/* Page content */}
                        <Container className="mt--7" fluid>
                            <Row className="align-items-center">
                                <Col>
                                    <Card className=" shadow">
                                        <CardHeader className=" bg-transparent">
                                            <h3 className=" mb-0">Welcome to Titan</h3>
                                        </CardHeader>
                                        <CardBody>
                                            Your <b>{this.state.application.appName}</b> application is below
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
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
                            <Row className="mt-3">
                                <Col>
                                    <Card className=" shadow mt-3">
                                        <CardHeader className=" bg-transparent">
                                            <h3 className=" mb-0">Your Application</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <ReactFormGenerator
                                                className="mt-3"
                                                data={this.state.layout.applicationLayout}
                                                read_only={true}
                                                hide_actions={true}
                                                answer_data={this.state.application.application}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className=" shadow mt-3">
                                        <CardHeader className=" bg-transparent">
                                            <h3 className=" mb-0">Conversation</h3>
                                        </CardHeader>
                                        <CardBody>
                                            Current Conversation with management.
                                            {this.state.application.openToResponse ?
                                            <>
                                            <span className="clearfix" />
                                            Responses have been opened. You can use the box below to send a message.
                                            <Editor
                                                editorState={this.state.responseBox}
                                                onEditorStateChange={this.responseChange}
                                                wrapperClassName={'outerResponseBox mt-2'}
                                            />
                                            <Button className="btn-icon btn-2 mt-3" color="primary" type="button" onClick={this.sendToApi}>Send response</Button>
                                            </> : null}
                                        </CardBody>
                                    </Card>
                                    {this.state.application.responses.slice(0).reverse().map((response, index) => (
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
                            </Row>
                        </Container>
                    </>
                );
            } else {
                return (<></>)
            }
        }
    }
}

export default SingleApp;
