import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Stack, Paper, useTheme } from '@mui/material';
import { 
  People as PeopleIcon, 
  HotelOutlined as HotelIcon, 
  CheckCircleOutline as CheckInIcon, 
  EventOutlined as EventIcon 
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const StatCard = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', boxShadow: 3 }}>
      <CardContent>
        <Box 
          sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            gap: 2
          }}
        >
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography 
              variant="h6" 
              component="div" 
              color="text.secondary" 
              gutterBottom
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                whiteSpace: 'normal',
                wordBreak: 'break-word'
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              component="div" 
              fontWeight="bold"
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { state } = useAppContext();
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Cálculo de estadísticas
  const totalGuests = state.guests.length;
  const activeCheckins = state.checkins.filter(checkin => checkin.status === 'active').length;
  
  // Cálculo de habitaciones ocupadas (asumiendo que cada check-in activo corresponde a una habitación)
  const occupiedRooms = state.checkins.filter(checkin => checkin.status === 'active').length;
  
  // Obtener check-ins para hoy
  const today = new Date().toISOString().slice(0, 10);
  const checkinsToday = state.checkins.filter(checkin => checkin.checkInDate === today).length;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        {t('dashboard.title')}
      </Typography>
      
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 5 } }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title={t('dashboard.stats.totalGuests')} 
            value={totalGuests} 
            icon={<PeopleIcon sx={{ color: 'white', fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />} 
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title={t('dashboard.stats.activeCheckins')} 
            value={activeCheckins} 
            icon={<CheckInIcon sx={{ color: 'white', fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />} 
            color="#2e7d32" // verde
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title={t('dashboard.stats.occupiedRooms')} 
            value={occupiedRooms} 
            icon={<HotelIcon sx={{ color: 'white', fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />} 
            color="#1976d2" // azul
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard 
            title={t('dashboard.stats.checkinsToday')} 
            value={checkinsToday} 
            icon={<EventIcon sx={{ color: 'white', fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />} 
            color="#ed6c02" // naranja
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {t('dashboard.upcomingCheckins')}
              </Typography>
              
              {state.checkins.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  {state.checkins
                    .filter(checkin => new Date(checkin.checkInDate) >= new Date())
                    .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate))
                    .slice(0, 5)
                    .map(checkin => {
                      const guest = state.guests.find(g => g.id === checkin.guestId);
                      return (
                        <Paper 
                          key={checkin.id} 
                          sx={{ 
                            p: 2, 
                            mb: 1, 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center' 
                          }}
                          elevation={1}
                        >
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {guest ? `${guest.firstName} ${guest.lastName}` : t('common.unknownGuest')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {t('common.room')}: {checkin.roomNumber}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {new Date(checkin.checkInDate).toLocaleDateString()}
                          </Typography>
                        </Paper>
                      );
                    })}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {t('dashboard.noUpcomingCheckins')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {t('dashboard.upcomingCheckouts')}
              </Typography>
              
              {state.checkins.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  {state.checkins
                    .filter(checkin => 
                      checkin.status === 'active' && 
                      new Date(checkin.checkOutDate) >= new Date()
                    )
                    .sort((a, b) => new Date(a.checkOutDate) - new Date(b.checkOutDate))
                    .slice(0, 5)
                    .map(checkin => {
                      const guest = state.guests.find(g => g.id === checkin.guestId);
                      return (
                        <Paper 
                          key={checkin.id} 
                          sx={{ 
                            p: 2, 
                            mb: 1, 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center' 
                          }}
                          elevation={1}
                        >
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {guest ? `${guest.firstName} ${guest.lastName}` : t('common.unknownGuest')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {t('common.room')}: {checkin.roomNumber}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {new Date(checkin.checkOutDate).toLocaleDateString()}
                          </Typography>
                        </Paper>
                      );
                    })}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {t('dashboard.noUpcomingCheckouts')}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
