import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoggedInUser } from '../actions/user-auth';

/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Dropdown, NavDropdown, Image } from 'react-bootstrap'

/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlusSquare, faListOl, faSignOutAlt, faCross, faUnlink } from '@fortawesome/free-solid-svg-icons'



class MainNav extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setLoggedInUser(null);
  };

  render() {
    const { authorizedUser, users } = this.props;

    return (

      /* Main Menu */
      <Navbar className="nav-container" collapseOnSelect expand="md" bg="light" variant="light">
        <Container>

          <Navbar.Brand as={NavLink} to="/" exact ><Image src="../../images/blue-pill-red-pill.png" width={40} /></Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" exact><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
              <Nav.Link as={NavLink} to="/add" ><FontAwesomeIcon icon={faPlusSquare} /> Create New Poll</Nav.Link>
              <Nav.Link as={NavLink} to="/leaderboard"><FontAwesomeIcon icon={faListOl} /> View Leaderboard</Nav.Link>
            </Nav>
            <Nav>
              <div className="logged-in-as d-inline-flex">
                <Image
                  className="my-auto me-2"
                  src={users[authorizedUser].avatarURL}
                  width={20}
                  height={20}
                  draggable="false" />
                <NavDropdown className="text-white" title={users[authorizedUser].name} id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    onClick={this.handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </NavDropdown.Item>

                  <Dropdown.Divider />

                  <NavDropdown.Item as={NavLink} to="/non-existent-page">
                    <small><FontAwesomeIcon icon={faUnlink} /> Test Error 404 Page</small>
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="/questions/a-broken-question-am8ehyc8byjqgar0jgpub93i">
                    <small><FontAwesomeIcon icon={faUnlink} /> Test Broken Question</small>
                  </NavDropdown.Item>

                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
  }
}


function mapStateToProps({ users, authorizedUser }) {
  return {
    authorizedUser,
    users
  };
}


export default connect(
  mapStateToProps,
  { setLoggedInUser }
)(MainNav);