import React, { Component } from 'react';
import logo from '../logo.png';
import axios from 'axios';
import Iframe from 'react-iframe';
import '../App.css';

export default class App extends Component {
  
  constructor(props, context) {
    super(props, context);

  }



render() {
  return (
    <Iframe url="/titan/auth/login"
        width="100%"
        height="100%"
        id="loginFrame"
        display="initial"
        position="relative"/>
  );
}

}
