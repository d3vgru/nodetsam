import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './app/styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="app-intro">
          To get started, edit <code>src/app.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
