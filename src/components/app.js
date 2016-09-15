import React, { Component } from 'react';
import NavBar from './nav_bar';
import Dashboard from './dashboard';
import "../style/style.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="pageWrapper">
          <Dashboard />
        </div>
      </div>
    );
  }
}
