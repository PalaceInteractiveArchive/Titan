import React from "react";
// node.js library that concatenates classes (strings)
import Cookies from 'universal-cookie';
// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Modal, FormGroup, Input } from "reactstrap";
import Header from "components/Headers/Header.js";
import EditTable from "./EditTable"
import Axios from "axios";

const cookies = new Cookies();

class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToggle: false,
      appName: ""
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.sendToAPI = this.sendToAPI.bind(this);
  }
  


  toggleModal() {
    if (this.state.modalToggle) {
      this.setState({ modalToggle: false})
    } else {
      this.setState({ modalToggle: true})
    }
  }

  sendToAPI() {
    Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/createNewType`, {
      accessToken: cookies.get('accessToken'),
      user: cookies.get('user'),
      appName: this.state.appName
    })
    .then((res) => {
      if (res.status === 200) {
        this.props.history.push("/dash/appEdit/" + res.data.id)
      }
    })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="align-items-center">
            <Col>
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Edit Applications</h3>
                </CardHeader>
                <CardBody>All Application types stored in the system are below</CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardHeader>
                  Create/Delete
                </CardHeader>
                <CardBody>
                  <span>Need one of the below deleted? Ask in <b>#dept-dev</b> in slack. For security reasons they cannot be auto deleted.</span>
                  <span className="clearfix" />
                  <Button className="btn-icon btn-2 mt-2" color="primary" type="button" onClick={() => this.toggleModal()}>Create new</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Card className=" shadow">
                <CardBody>
                  <EditTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
          className="modal-dialog-centered"
          isOpen={this.state.modalToggle}
          toggle={() => this.toggleModal()}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create new application type
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal()}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <FormGroup>
                <Input
                  id="appName"
                  placeholder="Name of the Application"
                  type="text"
                  onChange={(e) => (this.setState({ appName: e.target.value }))}
                />
              </FormGroup>
            </div>
            <div className="modal-footer">
              <Button
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal()}
              >
                Close
              </Button>
              <Button color="primary" type="button" onClick={() => this.sendToAPI()}>
                Create
              </Button>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default EditPage;
