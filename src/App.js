import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

// Tema personalizado
import theme from './theme';

// Contexto de la aplicación
import { AppProvider } from './context/AppContext';

// Componentes de layout
import Layout from './components/layout/Layout';

// Páginas
import Dashboard from './pages/Dashboard';
import CheckInPage from './pages/CheckInPage';
import GuestsPage from './pages/GuestsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/check-in" element={<CheckInPage />} />
              <Route path="/guests" element={<GuestsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
