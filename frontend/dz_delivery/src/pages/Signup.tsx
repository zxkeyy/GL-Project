import SignupForm from "../components/SignupForm"
import Box from '@mui/material/Box';
import { CssBaseline, Typography} from "@mui/material";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
import React from "react";
=======
>>>>>>> Stashed changes


function Signup() {
    return (
        <>
        <CssBaseline/>
        <Box sx={{ display: "flex", height: "100vh", width: "98vw", paddingLeft: '20px', paddingRight: '20px'}}>
        {/* Left Section (Blank space) */}
        <Box sx={{ flex: "0 0 50%", bgcolor: "#FEFF9F", marginTop: 2, marginBottom: 2, borderRadius: "15px",}} /> {/* Blank left side */}

        {/* Right Section (Signup Form) */}
        <Box sx={{flex: "0 0 50%", bgcolor: "#ffffff", fontFamily: "Sora", padding: 1, margin: 3}}>
            <Box sx={{display: "flex", justifyContent: 'start', flexWrap: "wrap", gap: "1px",
                fontSize: "51px", fontWeight: "bold"
            }}>
                <Typography sx={{fontSize: 46, fontFamily: "Sora", fontWeight: "bold"}}>
                        Join{' '}
                        <Typography component="span" sx={{ color: '#72BF78', fontSize: 46, fontWeight: "bold"}}>
                        Blitz{' '}
                        </Typography>
                        family now !
                    </Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: 'start', flexWrap: "wrap", gap: "4px",
                fontSize: "18px", fontWeight: "normal"}}>
                <Box>Already have an account ?</Box>
                <Box><Link to="/Login" style={{ color: '#72BF78' }}>Log in</Link></Box>
            </Box>
            <Box sx={{marginTop: '25px'}}>
                <SignupForm/>
            </Box>
        </Box>
        </Box>
        </>
    )
}
export default Signup