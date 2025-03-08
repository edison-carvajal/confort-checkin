import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  Switch, 
  Button, 
  Divider,
  useTheme 
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const SettingsPage = () => {
  const theme = useTheme();
  const [settings, setSettings] = React.useState({
    hotelName: 'Comfort Hotel',
    address: 'Av. Principal #123',
    email: 'info@comforthotel.com',
    phone: '555-123-4567',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    enableEmailNotifications: true,
    enableSmsNotifications: false,
    defaultCurrency: 'USD',
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings({
      ...settings,
      [name]: event.target.type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // En una implementación real, aquí se guardarían los ajustes
    alert('Configuración guardada correctamente');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Configuración
      </Typography>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Información del Hotel
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre del Hotel"
                  name="hotelName"
                  value={settings.hotelName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Horarios
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hora de Check-In"
                  name="checkInTime"
                  type="time"
                  value={settings.checkInTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Hora de Check-Out"
                  name="checkOutTime"
                  type="time"
                  value={settings.checkOutTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Notificaciones
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enableEmailNotifications}
                        onChange={handleChange}
                        name="enableEmailNotifications"
                        color="primary"
                      />
                    }
                    label="Habilitar notificaciones por email"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.enableSmsNotifications}
                        onChange={handleChange}
                        name="enableSmsNotifications"
                        color="primary"
                      />
                    }
                    label="Habilitar notificaciones por SMS"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Moneda predeterminada"
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="USD">USD - Dólar estadounidense</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="COP">COP - Peso colombiano</option>
                  <option value="MXN">MXN - Peso mexicano</option>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
                sx={{ px: 4 }}
              >
                Guardar Configuración
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
