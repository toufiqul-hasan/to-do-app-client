import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.init";
import { signOut } from "firebase/auth";
import logo from "../../Assets/Images/logo.png";
import "./Header.css";

const Header = () => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              className="d-inline-block align-top"
              width={30}
              height={30}
              src={logo}
              alt="Royal Auto Logo"
            /> <span>To Do App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav className="nav">
              <Nav.Link as={Link} to="home">
                Home
              </Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="mytask">
                  My Task
                </Nav.Link>
              ) : (
                <Nav.Link />
              )}
              {user ? (
                <Nav.Link as={Link} to="addtask">
                  Add Task
                </Nav.Link>
              ) : (
                <Nav.Link />
              )}
              {user ? (
                <Nav.Link as={Link} to="login" onClick={handleSignOut}>
                  Log Out
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;