import { CheckCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

function Track() {
    return(
        <Box sx={{display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#D3EE98'}}>
            <Box sx={{display: 'flex', gap: 0, width: '90vw', height: '90vh', backgroundColor: '#FFFFFF', margin: 'auto', borderRadius: 15}}>
                <Box sx={{flex: 1, borderRadius: 12, backgroundColor: 'lightGrey', margin: 2}}>
                    MAP
                </Box>
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column',gap: 4, margin: 4, marginTop: 6}}>
                    <Box sx={{fontSize: 40}}>
                        Title
                    </Box>
                    <Box sx={{fontSize: 25}}>
                        Description
                    </Box>
                    <Box sx={{fontSize: 20}}>
                        <CheckCircle sx={{ color: '#A0D683', mr: 1 }} />
                        Departure
                    </Box>
                    <Box sx={{fontSize: 20}}>
                        <CheckCircle sx={{ color: '#A0D683', mr: 1 }} />
                        Arrival
                    </Box>
                    <Box sx={{fontSize: 20}}>
                        <CheckCircle sx={{ color: '#A0D683', mr: 1 }} />
                        Status: 
                    </Box>
                    <Box sx={{fontSize: 20}}>
                        <CheckCircle sx={{ color: '#A0D683', mr: 1 }} />
                        Estimated time till arrival: 
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Track;