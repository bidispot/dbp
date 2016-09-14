import React, { Component } from 'react';
import { Badge, Glyphicon, Navbar, Nav, NavDropdown, MenuItem, ProgressBar } from "react-bootstrap";
import { Link } from 'react-router';

export default class NavBar extends Component {
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span className="teal">Digital Business Platform</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={1} title={<span className="teal"><Glyphicon glyph="tasks" />
              <Badge className="navbar-badge">3</Badge></span> } id="tasks">
              <MenuItem eventKey="1" style={ { width: 300 } }>
                <div>
                  <p> <strong>Task 1</strong> <span className="pull-right text-muted">80% Complete</span> </p>
                  <div>
                    <ProgressBar striped bsStyle="success" now={80} />
                  </div>
                </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="2">
                <div>
                  <p> <strong>Task 2</strong> <span className="pull-right text-muted">20% Complete</span> </p>
                  <div>
                    <ProgressBar striped bsStyle="warning" now={20} />
                  </div>
                </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3">
                <div>
                  <p> <strong>Task 3</strong> <span className="pull-right text-muted">60% Complete</span> </p>
                  <div>
                    <ProgressBar striped bsStyle="info" now={60} />
                  </div>
                </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">
                <strong>See All Tasks</strong> <span className="pull-right"><Glyphicon glyph="triangle-right" /></span>
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title={<span  className="teal"><Glyphicon glyph="envelope" />
              <Badge className="navbar-badge">3</Badge></span>} id="messages">
              <MenuItem eventKey="1">
                <div> <strong>John Smith</strong> <span className="pull-right text-muted"> <em>Yesterday</em> </span> </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque eleifend...</div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="2">
                <div> <strong>John Smith</strong> <span className="pull-right text-muted"> <em>Yesterday</em> </span> </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque eleifend...</div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3">
                <div> <strong>John Smith</strong> <span className="pull-right text-muted"> <em>Yesterday</em> </span> </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque eleifend...</div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">
                <strong>Read All Messages</strong> <span className="pull-right"><Glyphicon glyph="triangle-right" /></span>
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title={<span  className="teal"><Glyphicon glyph="bell" />
              <Badge className="navbar-badge">4</Badge></span>} id="notifications">
              <MenuItem eventKey="1" style={ { width: 300 } }>
                <div> <span className="teal"><Glyphicon bsStyle="info" glyph="comment" /></span> New Comment <span className="pull-right text-muted small">4 minutes ago</span> </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="2">
                <div> <span  className="orange"> <Glyphicon glyph="tasks" /> </span> New Task <span className="pull-right text-muted small">12 minutes ago</span> </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3">
                <div> <span className="green"> <Glyphicon glyph="envelope" /> </span> Message Sent <span className="pull-right text-muted small">24 minutes ago</span> </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4" style={ { width: 300 } }>
                <div> <span className="teal"><Glyphicon bsStyle="info" glyph="comment" /></span> New Comment <span className="pull-right text-muted small">4 minutes ago</span> </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="5">
                <strong>See All Alerts</strong> <span className="pull-right"><Glyphicon glyph="triangle-right" /></span>
              </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title={<span  className="teal"><Glyphicon glyph="user" /></span>} id="profile">
              <MenuItem eventKey="1">
                <Glyphicon glyph="user" /> User Profile
              </MenuItem>
              <MenuItem eventKey="2">
                <Glyphicon glyph="cog" /> Settings
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">
                <Link to="/">
                  <Glyphicon glyph="log-out" /> Logout
                </Link>
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <div className="navbar-default sidebar" style={ { 'marginLeft': '-20px' } } role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <ul className="nav in" id="side-menu">
              <li className="sidebar-search">
                <div className="input-group custom-search-form">
                  <input type="text" className="form-control" placeholder="Search..." />
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <Glyphicon glyph="search" />
                    </button>
                  </span>
                </div>
              </li>
              <li>
                <Link to="/"><Glyphicon glyph="dashboard" /> &nbsp; Dashboard</Link>
              </li>
              <li>
                <Link to="/balances" className="balances_primary_color"><Glyphicon glyph="usd" /> &nbsp; Cash balances</Link>
              </li>
              <li>
                <Link to="/indicators" className="indicators_primary_color"><Glyphicon glyph="time" /> &nbsp; Indicators</Link>
              </li>
              <li className="accounts_primary_color">
                <Link to="/accounts"><Glyphicon glyph="user" /> &nbsp; Accounts</Link>
              </li>
              <li>
                <Link to="/ref_data" className="ref_data_primary_color"><Glyphicon glyph="stats" /> &nbsp; Reference Data</Link>
              </li>
              <li>
                <Link to="/ref_data"> &nbsp; About</Link>
              </li>
            </ul>
          </div>
        </div>

      </Navbar>
    );
  }
}
