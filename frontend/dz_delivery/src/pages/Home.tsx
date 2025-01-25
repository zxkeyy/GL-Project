import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Box, Button, Card, CardContent, CssBaseline, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Code, DesignServices, Build, Download } from "@mui/icons-material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import package2 from '../assets/package2.svg';
import React from "react";

function Home() {

    const services = [
        { title: 'Development', description: 'We build robust applications.', icon: <Code /> },
        { title: 'Design', description: 'We create stunning designs.', icon: <DesignServices /> },
        { title: 'Maintenance', description: 'We ensure smooth operations.', icon: <Build /> },
      ];

    const items = [
        'Fastest delivery',
        'Real Time package tracking',
        'Security and transparency',
        'Freelance opportunity',
    ]
      
    return (
        <>
        <CssBaseline/>
        <div className="h-[100vh]">
            <NavBar/>
            <Container className="p-0" style={{display: 'flex',gap: 2, width:'100vw', height: '85vh', flexWrap: 'wrap', margin: 'auto', marginTop: 10}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: '52 0 0 '}}>
                <Box sx={{ pt: 5,
                    borderRadius: 2,
                    textAlign: 'left'}}>
                    <Box sx={{ p: 2}}>
                    <Typography sx={{fontSize: 54, fontWeight: 'bold'}}>
                        With Blitz Everything is{' '}
                        <Typography component="span" sx={{ color: '#A0D683', fontSize: 54, fontWeight: 'bold'}}>
                        Super Fast
                        </Typography>
                    </Typography>
                    </Box>
                </Box>
                <Box sx={{p: 2}}>
                    Your key to the fastest most comfortable delivery
                </Box>
                <Box sx={{ mt: 8}}>
                    <Link to='/Package'>
                    <Button
                        variant="contained"
                        color="primary"
                        className="mx-2"
                        sx={{
                            color: 'white',
                            backgroundColor: '#A0D683', 
                            border: '2px solid #A0D683',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            '&:hover': {
                            boxShadow: '2px',
                            border: '2px solid #A0D683',
                            },
                        }}
                        >
                        Track Your Package
                </Button>
            </Link>
                </Box>
            </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: '48 0 0 '}}>
                    <Box sx={{flex: 1, p: 2, backgroundColor: '#FEFF9F', borderRadius: '20px'}}>
                        <img src={package2} alt="package2" style={{ paddingLeft: 50 }} />
                    </Box>
                </Box>
            </Container>

            <Container className="p-0" style={{width: '100vw', height: '90vh'}}>
            <Box style={{display: 'flex', height: '70vh', backgroundColor: '#FEFF9F', borderRadius: 40, margin: 20, marginTop: 50}}>
                <Box sx={{display: 'flex', flex: '50% 0 0'}}>
                    pic 
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', marginTop: 7}}>
                    <Box sx={{ textAlign: 'left'}}>
                        <Typography sx={{fontSize: 45, fontWeight: 'bold'}}>
                            Interested In Being A {' '} 
                            <Typography component='span' style={{color: '#A0D683', fontSize: 45, fontWeight: 'bold'}}>
                                Freelance Driver{' '}
                            </Typography>
                            ? Get Our App !
                        </Typography>
                    </Box>
                    <Box sx={{marginTop: 3}}>
                        <Button
                            variant="contained" // Use "outlined" or "text" for other styles
                            color="primary"
                            style={{ marginTop: '15px', borderRadius: '10px', backgroundColor: '#191A10',
                                color: 'white'}}
                            endIcon={<Download />} // Icon on the right
                            >
                            Download
                        </Button>
                    </Box>
                </Box>
            </Box>
            </Container>

            <Container className="p-0" style={{ display: 'flex', gap: 2, width: '100vw', height: '90vh'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flex: '55% 0 0', padding: 8}}>
                    <Box sx={{textAlign: 'left', marginTop: 5}}>
                        <Typography sx={{fontSize: 50, fontWeight: 'bold'}}>
                            Why Choose{' '}
                            <Typography component='span' sx={{color: '#A0D683', fontSize: 46, fontWeight: 'bold'}}>
                                Us
                            </Typography>
                        </Typography>
                    </Box>
                    <Box sx={{marginTop: 5 }}>
                        {items.map((item, index) => (
                            <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 2,
                            }}
                            >
                            <CheckCircle sx={{ color: '#A0D683', mr: 1 }} />
                            <Typography variant="body1" sx={{fontSize: 20, color: "text.primary"}}>
                                {item}
                            </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flex: '45% 0 0', backgroundColor: '#A0D683', margin: 2, borderRadius: 10, padding: 3}}>
                    pic
                </Box>
            </Container>

            <Container className="p-0" style={{ height: '90vh'}}>
            <Box
                sx={{
                    textAlign: 'center',
                    py: 4,
                    backgroundColor: '#f9f9f9',
                    margin: 'auto'
                }}
                >
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Our Services
                </Typography>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 3,
                    justifyContent: 'center',
                    }}
                >
                    {services.map((service, index) => (
                    <Card
                        key={index}
                        sx={{
                        maxWidth: 345,
                        flex: '1 1 30%',
                        boxShadow: 0,
                        borderRadius: 2,
                        textAlign: 'center',
                        }}
                    >
                        <Box sx={{fontsize: 64, color: 'primary.main', mb: 2}}>
                            {service.icon}
                        </Box>
                        <CardContent>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                            {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {service.description}
                        </Typography>
                        </CardContent>
                    </Card>
                    ))}
                </Box>
                </Box>
            </Container>

            <Box className="p-0 m-0 " style={{width: '100%',height: '60vh', backgroundColor: '#D3EE98'}}>
                <Footer/>
            </Box>
        </div>
        </>
    )
}
export default Home;