import Box from '@mui/material/Box';
import { Container, CssBaseline, Typography} from "@mui/material";
import React from "react";

function Pincode() {
    return(
        <Container style={{height: '60vh', backgroundColor: '#FFFFFF'}}>
        <Box sx={{width: '500px', margin: 'auto', paddingTop: '40px', fontSize: '30px'}}>
        Track Your Package
        </Box>
        <Box sx={{width: '500px', margin: 'auto', paddingTop: '20px'}}>
            <form style={{display: 'grid', gap: '15px'}}>
            <input
                type="text"
                name="PIN Code"
                placeholder="PIN Code"
                required
                style={{ flex: 1 , height: '55px', width: '100%',borderWidth: '1.5px', borderColor: '#191A1057',
                     borderRadius: '5px'}}
            />
            <button type="submit" style={{ width: '100%' , borderRadius: '10px', backgroundColor: '#191A10',
                color: 'white'
                }}>
                Submit
            </button>
            </form>
        </Box>
    </Container>
    )
}
export default Pincode;