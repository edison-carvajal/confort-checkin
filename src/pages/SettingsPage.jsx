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
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
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
    alert(t('settings.settingsSaved'));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        {t('settings.title')}
      </Typography>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              {t('settings.hotelInfo')}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.hotelName')}
                  name="hotelName"
                  value={settings.hotelName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.address')}
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.email')}
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.phone')}
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              {t('settings.schedules')}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('settings.checkInTime')}
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
                  label={t('settings.checkOutTime')}
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
              {t('settings.notifications')}
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
                    label={t('settings.enableEmailNotifications')}
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
                    label={t('settings.enableSmsNotifications')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label={t('settings.defaultCurrency')}
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="USD">{t('settings.currencies.usd')}</option>
                  <option value="EUR">{t('settings.currencies.eur')}</option>
                  <option value="COP">{t('settings.currencies.cop')}</option>
                  <option value="MXN">{t('settings.currencies.mxn')}</option>
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
                {t('settings.saveSettings')}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
