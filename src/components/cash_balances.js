import React, { Component } from 'react';
import NavBar from '../containers/nav_bar';

// Base styling
import "../style/style.css";

export default class Balances extends Component {
  render() {
    return (
      <div>
        <NavBar />
        Cash Balances
      </div>
    );
  }
}
