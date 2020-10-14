import React, { Component } from 'react';
import logo from '../logo.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../App.css';

export default class App extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = { description: '' };
}

render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <Form>
            <Form.Group as={Row} controlId="formUsername">
              <Form.Label column sm={4}>Minecraft Username</Form.Label>
              <Col sm={6} className='my-auto'>
              <Form.Control className="text-center" type="text" placeholder="Enter username" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPass">
              <Form.Label column sm={4}>Staff Password</Form.Label>
              <Col sm={6} className='my-auto'>
                <Form.Control className="text-center" type="password" placeholder="Enter password" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" className='btn-primary'>Sign in</Button>
              </Col>
            </Form.Group>
          </Form>
      </header>
    </div>
  );
}

}
