import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("username") !== null) {
            setLoggedIn(true);
        }
    }, [])

    useEffect(() => {
        console.log("User logged in? " + loggedIn);
    }, [loggedIn])

    function NavBarLoggedIn() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand href="/">Toronto Fitness Club</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><Link to={`/studio`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Studios</Link></Nav.Link>
                    <Nav.Link><Link to={`/preview`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Plans</Link></Nav.Link>
                </Nav>
                <Nav>
                <NavDropdown title="Profile" id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                        <Link to={`/accounts/edit`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Edit Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={`/accounts/password`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Change Password</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={`/accounts/class/schedule`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Class Schedule</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={`/accounts/class/history`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Class History</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={`/accounts/subscription`} style={{ color: 'inherit', textDecoration: 'inherit'}}>My Subscription</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                        <Link to={`/accounts/payment`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Payment History</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <Link to={`/logout`}>Logout</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
    }

    function NavBarLoggedOut() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Container>
              <Navbar.Brand href="/">Toronto Fitness Club</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><Link to={`/studio`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Studios</Link></Nav.Link>
                    <Nav.Link><Link to={`/preview`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Plans</Link></Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link><Link to={`/register`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Register</Link></Nav.Link>
                    <Nav.Link><Link to={`/login`} style={{ color: 'inherit', textDecoration: 'inherit'}}>Login</Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
    }

    if (loggedIn) {
        return (
            <div>
                <NavBarLoggedIn></NavBarLoggedIn>
            </div>
        )
    }

    return (
        <div>
            <NavBarLoggedOut></NavBarLoggedOut>
        </div>
    );
}

export default NavBar;