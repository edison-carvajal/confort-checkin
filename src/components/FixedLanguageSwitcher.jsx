import React from 'react';
import { Paper, Button, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FixedLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        position: 'fixed',
        top: '70px',
        right: '20px',
        padding: '8px 12px',
        zIndex: 1300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        border: `1px solid ${theme.palette.primary.main}`
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          variant={i18n.language === 'es' ? 'contained' : 'outlined'} 
          onClick={() => changeLanguage('es')}
          size="small"
          sx={{ fontWeight: 'bold' }}
        >
          ES
        </Button>
        <Button 
          variant={i18n.language === 'en' ? 'contained' : 'outlined'} 
          onClick={() => changeLanguage('en')}
          size="small"
          sx={{ fontWeight: 'bold' }}
        >
          EN
        </Button>
      </Box>
    </Paper>
  );
};

export default FixedLanguageSwitcher;
