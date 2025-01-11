import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../assets/logo.svg"; 
import { Button } from "@mui/material";
<<<<<<< Updated upstream
import React from "react";
=======
>>>>>>> Stashed changes

function NavBar() {
  return (
    <>
    <Navbar bg="light" expand="lg" style={{ margin: 0, padding: 0}}>
      <Container fluid style={{backgroundColor: "#FFFFFF", width: '98.7vw', height: "10vh"}}>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" style={{ display: "flex", alignItems: "center", marginTop: '0px', paddingLeft: '10px' }}>
          <img src={Logo} alt="Logo" width={110} />
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="navbar-nav">

          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/action1" className="mx-2">
              About us
            </Nav.Link>
            <Nav.Link as={Link} to="/action2" className="mx-2">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/action2" className="mx-2">
              Tracking
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/Login" className="mx-2">
            <Button
              variant="contained"
              color="primary"
              className="mx-2"
              sx={{
                color: 'black',
                backgroundColor: '#FFFFFF', 
                border: '2px solid #A0D683',
                borderRadius: '20px',
                width: '110px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '2px',
                  border: '2px solid #A0D683',
                },
              }}
            >
              Log In
            </Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/Signup">
            <Button
              variant="contained"
              color="primary"
              className="mx-2"
              sx={{
                backgroundColor: '#A0D683', 
                border: '0px solid #ff5722',
                borderRadius: '20px',
                width: '110px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '2px'
                },
              }}
            >
              Sign Up
            </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar;




{/*             <NavDropdown title="A propos" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Tracking</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}