import React from 'react';
import { Box, Toolbar, Container } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
  const drawerWidth = 10;
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 0.5, sm: 1 }, // Padding reducido significativamente
          pl: { md: '0px' }, // Sin espaciado entre drawer y contenido
          pr: { xs: 0.5, sm: 1 },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px - 10px)` }, // Ajustar ancho por el espaciado
          ml: { xs: 0, md: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        <Toolbar /> {/* Espacio para que el contenido no quede debajo del AppBar */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            mt: { xs: 1, sm: 2 }, // Reducido el margen superior
            mb: { xs: 2, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: { xs: '100%', sm: '98%', md: '96%', lg: '94%' }, // Aumentado el ancho máximo
            px: { xs: 1, sm: 2 }, // Padding horizontal reducido
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1600px' }}>
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
