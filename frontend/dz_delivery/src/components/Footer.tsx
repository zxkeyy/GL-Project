import { Box, Typography, IconButton } from '@mui/material';
import { Email, Phone, LocationOn, Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import Logo from "../assets/logo.svg"; 
import React from 'react';


const Footer = (): JSX.Element => {
  return (
    <Box
      sx={{
        width: '80%',
        backgroundColor: '#D3EE98',
        p: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'space-between',
      }}
    >
      {/* Logo Section */}
      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
        <img src={Logo} alt="Logo" style={{ width: '150px', marginBottom: '16px' }} />
      </Box>

      {/* Contact Info Section */}
      <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Contact Us
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton disableRipple>
            <LocationOn />
          </IconButton>
          <Typography> Amizour, Bejaia</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton disableRipple>
            <Phone />
          </IconButton>
          <Typography>+123 456-7890</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton disableRipple>
            <Email />
          </IconButton>
          <Typography>info@blitz.com</Typography>
        </Box>
      </Box>

      {/* Social Media Section */}
      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Follow Us
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <IconButton
            href="https://facebook.com"
            target="_blank"
            sx={{ color: '#4267B2', mr: 1 }}
          >
            <Facebook />
          </IconButton>
          <Typography>Facebook</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            sx={{ color: '#8134af', mr: 1 }}
          >
            <Instagram />
          </IconButton>
          <Typography>Instagram</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
            href="https://linkedin.com"
            target="_blank"
            sx={{ color: '#0077B5', mr: 1 }}
          >
            <LinkedIn />
          </IconButton>
          <Typography>LinkedIn</Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default Footer;

