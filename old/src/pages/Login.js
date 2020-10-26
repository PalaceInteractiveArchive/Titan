import React, { Component } from 'react';
import logo from '../logo.png';
import axios from 'axios';
import {Session} from 'bc-react-session';
import '../App.css';

export default class App extends Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = { loginStatus: "failed", user: {} };
  }

  getLoginWindow() {
    axios.get('/titan/auth/login')
    .then((response) => {
    console.log(response.data)
    var win = window.open(
      response.data, 
      "Login", "height=700,width=600,resizable=no");

      window.addEventListener('message',function(event) {
        if(event.origin !== 'https://internal-api.palace.network') return;
          console.log(event.data);
          this.loginStatus = event.data.loginStatus;
          this.user = event.data.user;
        },false);
        var waitClose = setInterval(function() {
          if (win.closed) {
              clearInterval(waitClose);
              if (this.loginStatus === "success") {
                Session.start({ 
                  payload: {
                      user: this.user
                  },
                  expiration: 86400000 // (optional) defaults to 1 day
              });
              } else {
                
              }
          }
      }, 500);
    })
  }


render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Titan</h2>
        <a class="btn btn-primary" onClick={this.getLoginWindow} role="button">Sign In via IPB</a>
      </header>
    </div>
  );
}

}
