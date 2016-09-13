import React, { Component } from 'react';
import NavBar from '../containers/nav_bar';
import Query from '../containers/accounts_query'
import List from '../containers/accounts_list'
// Base styling
import "../style/style.css";

export default class Accounts extends Component {
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
