import React from "react";
import ReactDatetime from "react-datetime";
import Cookies from "universal-cookie";
import Axios from "axios";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

import Header from "components/Headers/Header.js";

const cookies = new Cookies();


class SupportCentre extends React.Component {
    constructor(props) {
        super(props);
        this.sendAbsenceForm = this
            .sendAbsenceForm
            .bind(this);
    }

    sendAbsenceForm() {
        let start = new Date(document.getElementById('absenceStartDate').value).getTime() / 1000;
        let end = new Date(document.getElementById('absenceEndDate').value).getTime() / 1000

          Axios.post(`https://internal-api.palace.network/titan/support/submitAbsence`, {
            accessToken: cookies.get('accessToken'),
            user: cookies.get('user'),
            name: document.getElementById('absenceName').value,
            startDate: start,
            endDate: end,
            reason: document.getElementById('absenceReason').value
          })
          .then(function (response) {
            if (response.data === true) {
                alert('Absence Submitted. Thanks!')
            } else {
                alert('Error!')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
                    <h3>Life can be a lot, let's talk.</h3>
                    <p>The wellbeing of yourself and everyone is important, and breaks are equally as important. You'll never be penalised, we just ask you submit a form to let us know you'd like some time away from Palace. Below are some general resources and the absence form. If you have any questions, consider speaking to a Lead+.</p>
                </CardBody>
              </Card>
            </div>
          </Row>
          <Row className="mt-5">
              <div className="col-md">
                  <Card className=" bg-default shadow">
                      <CardHeader className=" bg-transparent border-0">
                          <h3 className="text-white mb-0">Absence Form</h3>
                      </CardHeader>
                      <CardBody>
                          <p className="text-white">Please fill this out to submit an absence.</p>
                        <Form>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Input
                                        id="absenceName"
                                        value={cookies.get('user').name}
                                        type="email"
                                        disabled
                                        required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            htmlFor="absenceStartDate"
                                        >
                                            <span className="text-white">Leave Start Date</span>
                                        </label>
                                        <InputGroup className="input-group-alternative" required>
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-calendar-grid-58" />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <ReactDatetime 
                                            inputProps={{
                                                placeholder: "Click Here",
                                                id: "absenceStartDate",
                                                name: "absenceStartDate"
                                            }}
                                            timeFormat={false}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <label
                                            htmlFor="absenceEndDate"
                                        >
                                            <span className="text-white">Leave Return Date</span>
                                        </label>
                                        <InputGroup className="input-group-alternative" required>
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-calendar-grid-58" />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <ReactDatetime
                                            inputProps={{
                                                placeholder: "Click Here",
                                                id: "absenceEndDate",
                                                name: "absenceEndDate"
                                            }}
                                            timeFormat={false}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                         <label
                                            htmlFor="absenceReason"
                                        >
                                            <span className="text-white">Leave Reason</span>
                                        </label>
                                        <Input
                                        id="absenceReason"
                                        placeholder="If you prefer not to answer the next question (for personal reasons), put 'Personal or 'Prefer not to answer'"
                                        type="textarea"
                                        required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                    <Button color="primary" type="button" onClick={this.sendAbsenceForm}>Submit</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                      </CardBody>
                  </Card>
              </div>
              <div className="col-md">
                  <Card className=" bg-default shadow">
                      <CardHeader className=" bg-transparent">
                          <h3 className="text-white mb-0">Batman's Recommendations</h3>
                      </CardHeader>
                      <CardBody>
                        <p className="text-white">Hi there, below are some links that Batman recommends for some Zen/Wellbeing! (Batman pls help idk what to put here)<br></br>
                        <br></br><span><a href="https://www.disneyplus.com/series/zenimation/6hSv4CBT2Q3N">Zenimation (requires Disney+)</a></span>
                        <br></br><span><a href="https://www.youtube.com/watch?v=g8NVwN0_mks">Relaxing Disney Piano</a></span>
                        <br></br><span><a href="https://thehappiestblogonearth.com/disneyland-guided-meditation/">Disneyland Guided Meditation</a></span></p>
                      </CardBody>
                  </Card>
                  <div className="mt-5">
                  
                  </div>
              </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default SupportCentre;
