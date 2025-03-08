import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  useTheme 
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  HelpOutline as HelpIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Hotel as HotelIcon 
} from '@mui/icons-material';

const HelpPage = () => {
  const theme = useTheme();

  const faqs = [
    {
      question: '¿Cómo registrar un nuevo check-in?',
      answer: 'Para registrar un nuevo check-in, navega a la sección "Check-In" en el menú lateral y completa el formulario con los datos del huésped. Todos los campos marcados son obligatorios. Una vez completado, haz clic en "Registrar Check-In" para finalizar el proceso.'
    },
    {
      question: '¿Cómo buscar a un huésped registrado?',
      answer: 'Puedes buscar huéspedes de dos formas: 1) En la sección "Check-In", selecciona la pestaña "Huéspedes Registrados" y utiliza el buscador. 2) Accede directamente a la sección "Huéspedes" en el menú lateral y utiliza el buscador para filtrar por nombre, email o número de identificación.'
    },
    {
      question: '¿Cómo modificar los datos de un check-in ya realizado?',
      answer: 'Para modificar un check-in, navega a la sección "Check-In", selecciona la pestaña "Huéspedes Registrados", busca el registro que deseas modificar y haz clic en el icono de edición (lápiz). Realiza los cambios necesarios y guarda.'
    },
    {
      question: '¿Cómo cambiar la configuración del sistema?',
      answer: 'Accede a la sección "Configuración" en el menú lateral. Allí podrás modificar la información del hotel, horarios predeterminados, configuración de notificaciones y otros ajustes del sistema. Recuerda guardar los cambios al finalizar.'
    },
    {
      question: '¿Puedo exportar los datos de los huéspedes?',
      answer: 'Esta funcionalidad estará disponible en próximas actualizaciones. Por ahora, puedes ver todos los registros en la sección "Huéspedes".'
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Ayuda y Soporte
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Preguntas Frecuentes
              </Typography>
              
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      backgroundColor: theme.palette.primary.light,
                      color: 'white'
                    }}
                  >
                    <Typography fontWeight="medium">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Guía Rápida
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Check-In" 
                    secondary="Registro de entrada de huéspedes" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Huéspedes" 
                    secondary="Gestión de datos de los huéspedes" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <HotelIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dashboard" 
                    secondary="Resumen y estadísticas generales" 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Configuración" 
                    secondary="Ajustes del sistema y preferencias" 
                  />
                </ListItem>
              </List>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2, 
                  mt: 3, 
                  backgroundColor: theme.palette.primary.light,
                  color: 'white'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <HelpIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Soporte Técnico</Typography>
                </Box>
                <Typography variant="body2">
                  ¿Necesitas ayuda adicional? Contacta a nuestro equipo de soporte:
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Email: soporte@comfortcheckin.com
                </Typography>
                <Typography variant="body2">
                  Teléfono: +1 (555) 123-4567
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Ajuste para el componente no importado
const Grid = ({ container, item, xs, md, spacing, children, ...props }) => {
  return (
    <Box 
      sx={{ 
        display: container ? 'flex' : 'block',
        flexWrap: container ? 'wrap' : 'nowrap',
        width: item ? (xs === 12 ? '100%' : `${(xs || md) * 8.33}%`) : '100%',
        padding: spacing ? `${spacing * 4}px` : 0,
        flexBasis: item ? (
          md ? { xs: `${xs * 8.33}%`, md: `${md * 8.33}%` } : `${xs * 8.33}%`
        ) : 'auto',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default HelpPage;
