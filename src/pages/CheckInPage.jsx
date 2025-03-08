import React from 'react';
import { Box, Typography, Tabs, Tab, Paper, useTheme } from '@mui/material';
import CheckInForm from '../components/check-in/CheckInForm';
import CheckInList from '../components/check-in/CheckInList';

const CheckInPage = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Gestión de Check-In
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              fontSize: '1rem',
              py: 2,
            },
            backgroundColor: theme.palette.primary.light,
            color: 'white',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Tab label="Nuevo Check-In" />
          <Tab label="Huéspedes Registrados" />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <CheckInForm />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <CheckInList />
      </TabPanel>
    </Box>
  );
};

// Componente auxiliar para el contenido de las pestañas
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`check-in-tabpanel-${index}`}
      aria-labelledby={`check-in-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default CheckInPage;
