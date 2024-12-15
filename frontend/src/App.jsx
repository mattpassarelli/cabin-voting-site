import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import UserForm from "./components/UserForm";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const isLoggedIn =
    sessionStorage.getItem("accessToken") && sessionStorage.getItem("refreshToken");
  /**
   * this is NOT an okay logout mechanism
   * but i don't have a proper logout endpoint
   * yet and I'm writing this whole thing in
   * 3 hours
   */
  const signOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("firstName");

    window.history.go(window.location.host);
    window.reload();
  };

  return (
    <>
      {/* TODO: navbar styling (like padding and shadows) */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Cabin Planner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="home">
                Home
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link as={Link} to="trips">
                  Trips
                </Nav.Link>
              )}
              {process.env.NODE_ENV === "development" && (
                <div>
                  Running {process.env.NODE_ENV} mode. Will use {process.env.REACT_APP_BACKEND_URL}{" "}
                  for URL calls
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <Navbar.Text>
                <Dropdown as={ButtonGroup} data-bs-theme="dark">
                  <Button variant="secondary">{`Hello, ${localStorage.getItem(
                    "firstName"
                  )}`}</Button>

                  <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Navbar.Text>
            ) : (
              <>
                <Dropdown as={ButtonGroup} data-bs-theme="dark">
                  <Button variant="secondary" onClick={() => setShowSignIn(true)}>
                    Sign In
                  </Button>

                  <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowSignUp(true)}>Sign Up</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <UserForm show={showSignUp} setShow={setShowSignUp} register />
      <UserForm show={showSignIn} setShow={setShowSignIn} />

      <Outlet />
    </>
  );
};

export default App;
