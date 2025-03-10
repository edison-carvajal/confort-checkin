import React from 'react';
import { Button, Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button 
        variant={i18n.language === 'es' ? 'contained' : 'outlined'} 
        onClick={() => changeLanguage('es')}
        size="small"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: i18n.language === 'es' ? theme.palette.secondary.main : 'transparent',
          border: '1px solid white',
          '&:hover': {
            backgroundColor: i18n.language === 'es' ? theme.palette.secondary.dark : 'rgba(255,255,255,0.2)'
          }
        }}
      >
        ES
      </Button>
      <Button 
        variant={i18n.language === 'en' ? 'contained' : 'outlined'} 
        onClick={() => changeLanguage('en')}
        size="small"
        sx={{
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: i18n.language === 'en' ? theme.palette.secondary.main : 'transparent',
          border: '1px solid white',
          '&:hover': {
            backgroundColor: i18n.language === 'en' ? theme.palette.secondary.dark : 'rgba(255,255,255,0.2)'
          }
        }}
      >
        EN
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
