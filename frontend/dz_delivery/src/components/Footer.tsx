import { Box, Container, Grid, Typography, Link } from "@mui/material";

function Footer() {
    return (
        <Box sx={{ backgroundColor: "#333333", py: 6 }}>
            <Container
                maxWidth="lg"
                className="text-white max-w-full overflow-x-hidden"
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            About Blitz
                        </Typography>
                        <Typography variant="body2">
                            Fast, reliable, and secure delivery services for all
                            your needs.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="#" color="inherit" display="block">
                            Home
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Services
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Track Package
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Become a Driver
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2">
                            1234 Delivery Street
                            <br />
                            Speedyville, Fast 56789
                            <br />
                            Email: info@blitz.com
                            <br />
                            Phone: (555) 123-4567
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Link href="#" color="inherit">
                                Facebook
                            </Link>
                            <Link href="#" color="inherit">
                                Twitter
                            </Link>
                            <Link href="#" color="inherit">
                                Instagram
                            </Link>
                            <Link href="#" color="inherit">
                                LinkedIn
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 4 }}
                >
                    © {new Date().getFullYear()} Blitz Delivery. All rights
                    reserved.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
