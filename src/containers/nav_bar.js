import React, { Component } from 'react';
import { Badge, Navbar, Nav, NavItem } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <span className="teal">Digital Business Platform</span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Notifications <Badge>0</Badge></NavItem>
            <NavItem eventKey={2} href="#">Logged in as: <span className="teal">Jeff Bezos (hl666)</span></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}