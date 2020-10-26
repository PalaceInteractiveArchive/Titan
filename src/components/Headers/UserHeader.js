import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";


class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.png") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">{this.props.greeting} {this.props.uName}</h1>
                <p className="text-white mt-0 mb-5">
                  This is a profile page. In future you might be able to do stuff here,
                  but for now it's just a cool page.
                </p>
                <Button
                  color="info"
                  href="#pablo"
                  disabled
                  onClick={e => e.preventDefault()}
                >
                  Edit profile
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
