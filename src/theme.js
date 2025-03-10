import { createTheme } from '@mui/material/styles';

// Creando un tema personalizado con colores de la marca
const theme = createTheme({
  palette: {
    primary: {
      // Un tono de morado más fuerte para mejor contraste
      main: '#5e35b1', // Deep Purple 700
      light: '#7e57c2', // Deep Purple 400
      dark: '#4527a0', // Deep Purple 800
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  components: {
    // Personalización de los botones para tener texto blanco
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Color blanco para el texto de los botones
          '&.MuiButton-contained': {
            color: '#ffffff', // Aseguramos que los botones con fondo también tengan texto blanco
          },
          '&.MuiTab-root': {
            color: '#ffffff', // Aseguramos que las pestañas tengan texto blanco
            opacity: 0.7,
            '&.Mui-selected': {
              color: '#ffffff',
              opacity: 1,
            },
          },
        },
      },
    },
    // Personalización de los inputs para tener texto negro
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#000000', // Color negro para el texto de los inputs
          '&::placeholder': {
            color: 'rgba(0, 0, 0, 0.6)', // Color semi-transparente para los placeholder
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5e35b1', // Color de borde al pasar el mouse
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5e35b1', // Color de borde cuando está enfocado
          },
        },
        input: {
          color: '#000000', // Aseguramos que el texto sea negro en los inputs con borde
          fontWeight: 500, // Un poco más de peso para mejorar la legibilidad
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#000000', // Color negro para el texto de los selects
          fontWeight: 500, // Un poco más de peso para mejorar la legibilidad
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(94, 53, 177, 0.1)', // Fondo del item seleccionado
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(94, 53, 177, 0.2)', // Fondo del item seleccionado al pasar el mouse
          },
          '&:hover': {
            backgroundColor: 'rgba(94, 53, 177, 0.1)', // Fondo al pasar el mouse
          },
          color: '#000000', // Color negro para el texto de los items
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#5e35b1', // Aplicamos el mismo tono de morado a la barra
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export default theme;
