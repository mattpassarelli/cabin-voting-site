import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserForm from "./components/UserForm";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* TODO: navbar styling (like padding and shadows) */}
      <UserForm />
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand href="/">Cabin Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="trips">
              Trips
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default App;
