import React, { Component } from 'react';
import NavBar from '../containers/nav_bar';
import Dashboard from '../containers/dashboard';

// Base styling
import "../style/style.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Dashboard />
      </div>
    );
  }
}