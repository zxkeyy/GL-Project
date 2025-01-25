import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../assets/logo.svg";
import { Button } from "@mui/material";
import { MenuIcon } from "lucide-react";

function NavBar() {
    return (
        <>
            <Navbar bg="light" expand="lg" style={{ margin: 0, padding: 0 }}>
                <Container
                    fluid
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#333333",
                        width: "calc(100vw - 8px)",
                        height: "10vh",
                    }}
                >
                    {/* Brand Logo */}
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "0px",
                            paddingLeft: "10px",
                        }}
                        className="max-md:hidden max-md:max-w-0"
                    >
                        <img
                            src={Logo}
                            alt="Logo"
                            width={110}
                            className="max-md:hidden"
                        />
                    </Navbar.Brand>

                    {/* Toggle Button for Mobile View */}
                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        className="md:hidden !max-h-[55px]"
                    >
                        <MenuIcon size={24} color="white" />
                    </Navbar.Toggle>

                    {/* Navbar Collapse */}
                    <Navbar.Collapse
                        id="navbar-nav"
                        className="flex flex-1 items-center"
                    >
                        <Nav className="ms-auto d-flex align-items-center max-md:hidden">
                            <Nav.Link
                                as={Link}
                                to="/action1"
                                className="mx-2 text-white hover:text-[#72BF78] transition-all transition-300  "
                            >
                                About us
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/action2"
                                className="mx-2 text-white hover:text-[#72BF78] transition-all transition-500  "
                            >
                                Services
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/action2"
                                className="mx-2 text-white hover:text-[#72BF78] transition-all transition-300  "
                            >
                                Tracking
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto d-flex align-items-center mr-1 max-md:mr-3">
                            <Nav.Link as={Link} to="/Login" className="mx-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="mx-2"
                                    sx={{
                                        color: "white",
                                        backgroundColor: "#191A10",
                                        border: "2px solid #191A10",
                                        borderRadius: "20px",
                                        width: "110px",
                                        boxShadow: "none",
                                        "&:hover": {
                                            boxShadow: "2px",
                                            border: "2px solid white",
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
                                        color: "black",
                                        backgroundColor: "#A0D683",
                                        border: "2px solid #191A10",
                                        borderRadius: "20px",
                                        width: "110px",
                                        boxShadow: "none",
                                        "&:hover": {
                                            boxShadow: "2px",
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
