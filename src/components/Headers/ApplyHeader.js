import React from "react";

// reactstrap components
import { Card, CardBody, Container, CardHeader } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5">
          <Container fluid>
            <div className="header-body">
              <Card>
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Welcome to Titan Applications</h3>
                </CardHeader>
                <CardBody>
                  You are logged in as, {this.props.name}. This is the portal to submit applications across the Palace Community. You will be able to see applications you are eligible for below.
                </CardBody>
              </Card>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
