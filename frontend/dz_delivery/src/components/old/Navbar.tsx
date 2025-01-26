// import type React from "react";
// import { Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { useAuth } from "../hooks/useAuth";

// const Navbar: React.FC = () => {
//     const { user, logout } = useAuth();

//     return (
//         <AppBar position="static" color="transparent" elevation={0}>
//             <Toolbar sx={{ justifyContent: "space-between" }}>
//                 <Typography
//                     variant="h6"
//                     component={Link}
//                     to="/"
//                     sx={{
//                         textDecoration: "none",
//                         color: "inherit",
//                         fontWeight: 700,
//                     }}
//                 >
//                     Blitz
//                 </Typography>
//                 <Box>
//                     {user ? (
//                         <>
//                             <Button
//                                 color="inherit"
//                                 component={Link}
//                                 to={`/${user.role}`}
//                                 sx={{ mr: 2 }}
//                             >
//                                 Dashboard
//                             </Button>
//                             <Button
//                                 color="inherit"
//                                 onClick={logout}
//                                 variant="outlined"
//                             >
//                                 Logout
//                             </Button>
//                         </>
//                     ) : (
//                         <>
//                             <Button
//                                 color="inherit"
//                                 component={Link}
//                                 to="/login"
//                                 sx={{ mr: 2 }}
//                             >
//                                 Login
//                             </Button>
//                             <Button
//                                 color="inherit"
//                                 component={Link}
//                                 to="/signup"
//                                 variant="outlined"
//                             >
//                                 Sign Up
//                             </Button>
//                         </>
//                     )}
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Navbar;
