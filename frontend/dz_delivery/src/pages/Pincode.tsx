import Box from '@mui/material/Box';
import { autocompleteClasses, Container, CssBaseline, Typography} from "@mui/material";
import pack from '../assets/package.svg';
import React from "react";

function Pincode() {
    return(
        <Box style={{height: '100vh', width: '100vw', padding: 30}}>
            <Box sx={{backgroundColor: '#FEFF9F', borderRadius: 20, padding: 2 }}>

            <Box sx={{width: '340px', height: '150px', margin: 'auto'}}>
                <img src={pack} alt="package" style={{ marginBottom: 4 }} />
            </Box>
            <Box sx={{width: '500px', margin: 'auto', paddingTop: 15, fontSize: '40px', textAlign: 'center', fontWeight: 'bold'}}>
            Track Your Package
            </Box>
            <Box sx={{width: '500px', margin: 'auto', paddingTop: 2, paddingBottom: 4}}>
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
            </Box>
        </Box>
    )
}
export default Pincode; 