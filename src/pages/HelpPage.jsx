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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const faqs = [
    {
      question: t('help.faq.q1'),
      answer: t('help.faq.a1')
    },
    {
      question: t('help.faq.q2'),
      answer: t('help.faq.a2')
    },
    {
      question: t('help.faq.q3'),
      answer: t('help.faq.a3')
    },
    {
      question: t('help.faq.q4'),
      answer: t('help.faq.a4')
    },
    {
      question: t('help.faq.q5'),
      answer: t('help.faq.a5')
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        {t('help.title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {t('help.faqs')}
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
                {t('help.quickGuide')}
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('help.guides.checkIn')} 
                    secondary={t('help.guides.checkInDesc')} 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('help.guides.guests')} 
                    secondary={t('help.guides.guestsDesc')} 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <HotelIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('help.guides.dashboard')} 
                    secondary={t('help.guides.dashboardDesc')} 
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t('help.guides.settings')} 
                    secondary={t('help.guides.settingsDesc')} 
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
                  <Typography variant="h6">{t('help.technicalSupport')}</Typography>
                </Box>
                <Typography variant="body2">
                  {t('help.needHelp')}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {t('help.email')}
                </Typography>
                <Typography variant="body2">
                  {t('help.phone')}
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
