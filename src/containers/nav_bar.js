import React, { Component } from 'react'; 
import {Navbar, Nav, NavItem } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span className="teal">Digital Business Platform</span>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Settings</NavItem>
          <NavItem eventKey={2} href="#">Logout</NavItem>
        </Nav>
      </Navbar>
    );
  }
}