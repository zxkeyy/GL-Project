import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Button } from "@mui/material";
import { MenuIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logoBLack from "/logo-black.svg";

function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="light" expand="lg" style={{ margin: 0, padding: 0 }}>
                <Container
                    fluid
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "transparent",
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
                            src={logoBLack}
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
                                to="/about"
                                className="mx-2 text-black hover:text-[#72BF78] transition-all transition-300  "
                            >
                                About us
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/services"
                                className="mx-2 text-black hover:text-[#72BF78] transition-all transition-500  "
                            >
                                Services
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/contact"
                                className="mx-2 text-black hover:text-[#72BF78] transition-all transition-300  "
                            >
                                Contact
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto d-flex align-items-center mr-1 max-md:mr-3">
                            {user ? (
                                <>
                                    <Button
                                        color="primary"
                                        component={Link}
                                        to={`/client`}
                                        sx={{ mr: 2 }}
                                    >
                                        Dashboard
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            logout();
                                            navigate("/login");
                                        }}
                                        variant="outlined"
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/Login"
                                        className="mx-2"
                                    >
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
                                                backgroundColor: "white",
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
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
