import React, { Component } from 'react';
import { Badge, Navbar, Nav, NavDropdown, MenuItem, ProgressBar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
//import Clock from 'react-clock';

export default class NavBar extends Component {
  render() {
    return (
      <div>
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
            {/* <Navbar.Text>
               <span className="welcome">Signed in as: </span><span className="teal welcome-username">John Cooper </span><span className="welcome-date">22 September 2016</span>
            </Navbar.Text>
            <div className="clock-div"><Clock /></div> */}
            <Nav pullRight>
              <NavDropdown eventKey={1} title={<span  className=""><FontAwesome name="envelope" />
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
                  <strong>Read All Messages</strong> <span className="pull-right"><FontAwesome name="caret-right" /></span>
                </MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={2} title={<span className=""><FontAwesome name="tasks" />
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
                  <strong>See All Tasks</strong> <span className="pull-right"><FontAwesome name="caret-right" /></span>
                </MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={3} title={<span  className=""><FontAwesome name="bell" />
                <Badge className="navbar-badge">4</Badge></span>} id="notifications">
                <MenuItem eventKey="1" style={ { width: 300 } }>
                  <div> <span className=""><FontAwesome name="comment" /></span> &nbsp;New Comment <span className="pull-right text-muted small">4 minutes ago</span> </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="2">
                  <div> <span  className=""><FontAwesome name="tasks" /> </span> &nbsp;New Task <span className="pull-right text-muted small">12 minutes ago</span> </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="3">
                  <div> <span className=""> <FontAwesome name="envelope" /> </span> &nbsp;Message Sent <span className="pull-right text-muted small">24 minutes ago</span> </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4" style={ { width: 300 } }>
                  <div> <span className=""><FontAwesome name="comment" /></span> &nbsp;New Comment <span className="pull-right text-muted small">4 minutes ago</span> </div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="5">
                  <strong>See All Alerts</strong> <span className="pull-right"><FontAwesome name="caret-right" /></span>
                </MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={4} title={<span><FontAwesome name="user" /><span  className="teal profile-name">John Cooper</span></span>} id="profile">
                <MenuItem eventKey="1">
                  <FontAwesome name="user" /> User Profile
                </MenuItem>
                <MenuItem eventKey="2">
                  <FontAwesome name="cog" /> Settings
                </MenuItem>
                <MenuItem divider />
                <MenuItem eventKey="4">
                  <FontAwesome name="sign-out" /> Logout
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
                        <FontAwesome name="search" />
                      </button>
                    </span>
                  </div>
                </li>
                <li>
                  <Link to="/"><div className="sidebar-icon"><FontAwesome name="home" /></div> &nbsp; Dashboard</Link>
                </li>
                <li>
                  <Link to="/balances" className=""><div className="sidebar-icon"><FontAwesome name="usd" /></div> &nbsp; Cash balances</Link>
                </li>
                <li className="">
                  <Link to="/accounts"><div className="sidebar-icon"><FontAwesome name="user" /></div> &nbsp; Accounts</Link>
                </li>
                <li>
                  <Link to="/ref_data" className=""><div className="sidebar-icon"><FontAwesome name="line-chart" /></div> &nbsp; Prices</Link>
                </li>
                <li>
                  <Link to="/"><div className="sidebar-icon"><FontAwesome name="info" /></div> &nbsp; About</Link>
                </li>
              </ul>
            </div>
          </div>
        </Navbar>

        {this.props.children}

      </div>
    );
  }
}
