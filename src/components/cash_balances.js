import React, { Component } from 'react';
import NavBar from '../containers/nav_bar';
import Query from '../containers/balances_query'
import List from '../containers/balances_list'
// Base styling
import "../style/style.css";

export default class Balances extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Query />
        <List />
      </div>
    );
  }
}
