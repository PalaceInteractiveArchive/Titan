import React from "react";
import {
    Button,
    Modal,
  } from "reactstrap";

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationModal: false
    };

    this.closeModal = this.closeModal.bind(this);
}

  

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };


  closeModal() {
    this.setState({notificationModal: false})
    this.props.handler();
  }

    render() {

        return(
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={this.state.notificationModal}
              toggle={this.closeModal}
              backdrop="static"
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Your attention is required #{this.props.id}
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={this.closeModal}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">You should read this!</h4>
                  <p>
                    {this.props.text}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={this.closeModal}>
                  Ok, Got it
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={this.closeModal}
                >
                  Close
                </Button>
              </div>
            </Modal>
        )
    }
}

export default Notification;