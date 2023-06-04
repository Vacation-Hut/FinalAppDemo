import * as React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';
import { Email } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import "./styles.css";


function Footer() {
  return (
    <Box sx={{ 
      background: 'linear-gradient(to right,#ffffff, #ECDACD,  #E6C4AC)', 
      color: 'black', py: 3, mt: '50px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Company Logo" style={{ width: 'auto', height: '100px' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography component="h2" sx={{ mb: 2 }}>
                Home <br />
                Packages <br />
                Booking <br />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography component="h2" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Phone: 077 6850360<br />
              Email: vacationapk@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ pl: '80px' }}>
            <Typography component="h2" sx={{ mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <WhatsApp fontSize="large" color="white" />
              <Instagram fontSize="large" color="white" />
              <Email fontSize="large" color="white" />
              <Facebook fontSize="large" color="white" />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} Vacation Hut. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
