import { CssBaseline, Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"
<<<<<<< Updated upstream
import React from "react"
=======
>>>>>>> Stashed changes

function Login() {
    return (
        <>
        <CssBaseline/>
        <Box sx={{ display: "flex", height: "100vh", width: "98vw",  paddingLeft: '20px', paddingRight: '20px'}}>
        <Box sx={{ flex: "0 0 50%", bgcolor: "#FEFF9F", marginTop: 2, marginBottom: 2, borderRadius: "15px",}} /> {/* Blank left side */}

        <Box sx={{flex: "0 0 50%", bgcolor: "#ffffff",fontFamily: "Sora", padding: 1, paddingTop: 6, margin: 3}}>
            <Box sx={{display: "flex", justifyContent: 'start', flexWrap: "wrap", gap: "1px",
                fontSize: "51px", fontWeight: "bold"
            }}>
                <Typography sx={{fontSize: 46, fontFamily: "Sora", fontWeight: "bold"}}>
                        Welcome Back to{' '}
                        <Typography component="span" sx={{ color: '#72BF78', fontSize: 46, fontWeight: "bold"}}>
                        Blitz{' '}
                        </Typography>
                    </Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: 'start', flexWrap: "wrap", gap: "4px",
                fontSize: "18px", fontWeight: "normal"}}>
                <Box>Haven't signed up yet ?</Box>
                <Box><Link to="/Signup" style={{ color: '#72BF78' }}>Sign up</Link></Box>
            </Box>
            <Box sx={{marginTop: '25px'}}>
                <LoginForm/>
            </Box>
        </Box>
        </Box>
        </>
    )
}
export default Login