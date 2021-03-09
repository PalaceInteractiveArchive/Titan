import React from "react";
import {
    Button,
    Modal,
    FormGroup,
    Label,
    Input
  } from "reactstrap";
import Axios from "axios";
import Cookies from "universal-cookie"
const cookies = new Cookies();


class AppSelectModal extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
        selectModal: false,
        groupValues: [],
        tagValues: []
        };

        this.closeModal = this.closeModal.bind(this);
    }

    handleGroupChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        this.setState({groupValues: value});
    }

    handleTagChange = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        this.setState({tagValues: value});
    }

    submitNewSelected = () => {
        let allSelected = this.state.groupValues.concat(this.state.tagValues);
        Axios.post(`${process.env.REACT_APP_API_URL}/titan/application/updateStatus/${this.props.appId}/selected`, {
            accessToken: cookies.get('accessToken'),
            user: cookies.get('user'),
            selected: allSelected
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
            window.location.reload();
            }
        })
    }

    toggleModal = state => {
        this.setState({
        [state]: !this.state[state]
        });
    };


    closeModal() {
        this.setState({selectModal: false})
        this.props.handler();
    }

    render() {

        return(<Modal
            className="modal-dialog-centered"
            isOpen={this.state.selectModal}
            toggle={() => this.toggleModal("selectModal")}
          >
            <div className="modal-header">
              <h2 className="modal-title" id="modal-title-default">
                Select The Groups/Tags to open this application to:
              </h2>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("selectModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
                <div className="mb-2">Hint. Hold Ctrl/Cmd to select multiple. A user must have one of the selected groups or tags to submit an application.</div>
                <FormGroup>
                    <Label for="groupSelect">Groups</Label>
                    <Input type="select" name="groupSelect" id="groupSelect" multiple onChange={this.handleGroupChange}>
                    <option value="1">All Guests</option>
                    <option value="2">Trainee Ranks</option>
                    <option value="3">Moderator/Builder/Technician</option>
                    <option value="4">Coordinator</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="tagSelect">Tags</Label>
                    <Input type="select" name="tagSelect" id="tagSelect" multiple onChange={this.handleTagChange}>
                    <option value="5">Guide Tag</option>
                    <option value="6">Creator Tag</option>
                    </Input>
                </FormGroup>
            </div>
            <div className="modal-footer">
              <Button color="primary" type="button" onClick={this.submitNewSelected}>
                Save changes
              </Button>
              <Button
                className="ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("selectModal")}
              >
                Close
              </Button>
            </div>
          </Modal>)
    }
}

export default AppSelectModal;