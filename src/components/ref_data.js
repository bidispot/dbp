import React, { Component } from 'react';
import NavBar from '../containers/nav_bar';
import Query from '../containers/ref_data_query'
import List from '../containers/ref_data_list'
// Base styling
import "../style/style.css";

export default class ReferenceData extends Component {
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
