import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Datos estáticos de huéspedes para demostración
const demoGuests = [
  {
    id: 'guest-1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '+57 315 123 4567',
    idType: 'CC',
    idNumber: '1234567890'
  },
  {
    id: 'guest-2',
    firstName: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@ejemplo.com',
    phone: '+57 310 987 6543',
    idType: 'PP',
    idNumber: 'AP123456CO'
  },
  {
    id: 'guest-3',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    email: 'carlos.rodriguez@ejemplo.com',
    phone: '+57 320 456 7890',
    idType: 'CE',
    idNumber: 'E987654321'
  },
  {
    id: 'guest-4',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana.martinez@ejemplo.com',
    phone: '+57 300 567 8912',
    idType: 'TI',
    idNumber: '0987654321'
  },
  {
    id: 'guest-5',
    firstName: 'Pedro',
    lastName: 'Sánchez',
    email: 'pedro.sanchez@ejemplo.com',
    phone: '+57 311 234 5678',
    idType: 'PEP',
    idNumber: 'PEP12345678'
  },
  {
    id: 'guest-6',
    firstName: 'Laura',
    lastName: 'Ortiz',
    email: 'laura.ortiz@ejemplo.com',
    phone: '+57 321 876 5432',
    idType: 'PPT',
    idNumber: 'PPT87654321'
  },
  {
    id: 'guest-7',
    firstName: 'Restaurante',
    lastName: 'El Buen Sabor',
    email: 'info@buensabor.co',
    phone: '+57 1 234 5678',
    idType: 'NIT',
    idNumber: '900.123.456-7'
  },
  {
    id: 'guest-8',
    firstName: 'Santiago',
    lastName: 'López',
    email: 'santiago.lopez@ejemplo.com',
    phone: '+57 316 789 0123',
    idType: 'RC',
    idNumber: '12345678'
  },
  {
    id: 'guest-9',
    firstName: 'Daniela',
    lastName: 'Restrepo',
    email: 'daniela.restrepo@ejemplo.com',
    phone: '+57 314 234 5678',
    idType: 'CC',
    idNumber: '1098765432'
  },
  {
    id: 'guest-10',
    firstName: 'Miguel',
    lastName: 'Ángel',
    email: 'miguel.angel@ejemplo.com',
    phone: '+57 300 876 5432',
    idType: 'CE',
    idNumber: 'E234567890'
  },
  {
    id: 'guest-11',
    firstName: 'Valentina',
    lastName: 'García',
    email: 'valentina.garcia@ejemplo.com',
    phone: '+57 317 345 6789',
    idType: 'TI',
    idNumber: '1001234567'
  },
  {
    id: 'guest-12',
    firstName: 'Andrés',
    lastName: 'Medina',
    email: 'andres.medina@ejemplo.com',
    phone: '+57 312 567 8901',
    idType: 'CC',
    idNumber: '1234987650'
  },
  {
    id: 'guest-13',
    firstName: 'Gabriela',
    lastName: 'Soto',
    email: 'gabriela.soto@ejemplo.com',
    phone: '+57 319 876 5432',
    idType: 'PP',
    idNumber: 'AP567890CO'
  },
  {
    id: 'guest-14',
    firstName: 'Camilo',
    lastName: 'Díaz',
    email: 'camilo.diaz@ejemplo.com',
    phone: '+57 318 234 5678',
    idType: 'CC',
    idNumber: '1094567890'
  },
  {
    id: 'guest-15',
    firstName: 'Isabella',
    lastName: 'Ramírez',
    email: 'isabella.ramirez@ejemplo.com',
    phone: '+57 315 890 1234',
    idType: 'PPT',
    idNumber: 'PPT12345678'
  },
  {
    id: 'guest-16',
    firstName: 'Javier',
    lastName: 'Herrera',
    email: 'javier.herrera@ejemplo.com',
    phone: '+57 301 456 7890',
    idType: 'CE',
    idNumber: 'E876543210'
  },
  {
    id: 'guest-17',
    firstName: 'Natalia',
    lastName: 'Quintero',
    email: 'natalia.quintero@ejemplo.com',
    phone: '+57 310 123 4567',
    idType: 'CC',
    idNumber: '1075432198'
  },
  {
    id: 'guest-18',
    firstName: 'Héctor',
    lastName: 'Silva',
    email: 'hector.silva@ejemplo.com',
    phone: '+57 302 890 1234',
    idType: 'PP',
    idNumber: 'AP789012CO'
  },
  {
    id: 'guest-19',
    firstName: 'Carolina',
    lastName: 'Castillo',
    email: 'carolina.castillo@ejemplo.com',
    phone: '+57 313 567 8901',
    idType: 'CC',
    idNumber: '1023456789'
  },
  {
    id: 'guest-20',
    firstName: 'Roberto',
    lastName: 'Vargas',
    email: 'roberto.vargas@ejemplo.com',
    phone: '+57 321 234 5678',
    idType: 'PEP',
    idNumber: 'PEP87654321'
  },
  {
    id: 'guest-21',
    firstName: 'Empresa',
    lastName: 'Constructora ABC',
    email: 'info@constructoraabc.co',
    phone: '+57 1 987 6543',
    idType: 'NIT',
    idNumber: '901.234.567-8'
  },
  {
    id: 'guest-22',
    firstName: 'Alejandra',
    lastName: 'Torres',
    email: 'alejandra.torres@ejemplo.com',
    phone: '+57 316 123 4567',
    idType: 'TI',
    idNumber: '1001987654'
  },
  {
    id: 'guest-23',
    firstName: 'Mauricio',
    lastName: 'López',
    email: 'mauricio.lopez@ejemplo.com',
    phone: '+57 305 678 9012',
    idType: 'RC',
    idNumber: '98765432'
  },
  {
    id: 'guest-24',
    firstName: 'Sofía',
    lastName: 'Vanegas',
    email: 'sofia.vanegas@ejemplo.com',
    phone: '+57 319 012 3456',
    idType: 'CC',
    idNumber: '1087654321'
  },
  {
    id: 'guest-25',
    firstName: 'Fernando',
    lastName: 'Arias',
    email: 'fernando.arias@ejemplo.com',
    phone: '+57 304 567 8901',
    idType: 'PPT',
    idNumber: 'PPT98765432'
  }
];

// Datos estáticos de check-ins para demostración
const demoCheckins = [
  {
    id: 'checkin-1',
    guestId: 'guest-1',
    roomNumber: '101',
    checkInDate: '2025-03-08',
    checkOutDate: '2025-03-15',
    status: 'active'
  },
  {
    id: 'checkin-2',
    guestId: 'guest-2',
    roomNumber: '205',
    checkInDate: '2025-03-05',
    checkOutDate: '2025-03-12',
    status: 'active'
  },
  {
    id: 'checkin-3',
    guestId: 'guest-3',
    roomNumber: '304',
    checkInDate: '2025-03-10',
    checkOutDate: '2025-03-14',
    status: 'pending'
  }
];

// Definición del estado inicial
const initialState = {
  guests: demoGuests,
  checkins: demoCheckins,
  isLoading: false,
  error: null,
  currentGuest: null,
};

// Tipos de acciones para el reducer
export const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_GUESTS: 'SET_GUESTS',
  ADD_GUEST: 'ADD_GUEST',
  UPDATE_GUEST: 'UPDATE_GUEST',
  SET_CURRENT_GUEST: 'SET_CURRENT_GUEST',
  SET_CHECKINS: 'SET_CHECKINS',
  ADD_CHECKIN: 'ADD_CHECKIN',
  UPDATE_CHECKIN: 'UPDATE_CHECKIN',
};

// Reducer para manejar las acciones
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ActionTypes.SET_GUESTS:
      return { ...state, guests: action.payload, isLoading: false };
    case ActionTypes.ADD_GUEST:
      return { 
        ...state, 
        guests: [...state.guests, action.payload],
        isLoading: false 
      };
    case ActionTypes.UPDATE_GUEST:
      return { 
        ...state, 
        guests: state.guests.map(guest => 
          guest.id === action.payload.id ? action.payload : guest
        ),
        isLoading: false 
      };
    case ActionTypes.SET_CURRENT_GUEST:
      return { ...state, currentGuest: action.payload };
    case ActionTypes.SET_CHECKINS:
      return { ...state, checkins: action.payload, isLoading: false };
    case ActionTypes.ADD_CHECKIN:
      return { 
        ...state, 
        checkins: [...state.checkins, action.payload],
        isLoading: false 
      };
    case ActionTypes.UPDATE_CHECKIN:
      return { 
        ...state, 
        checkins: state.checkins.map(checkin => 
          checkin.id === action.payload.id ? action.payload : checkin
        ),
        isLoading: false 
      };
    default:
      return state;
  }
}

// Crear el contexto
const AppContext = createContext();

// Proveedor del contexto
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar datos iniciales desde localStorage al inicio o usar datos de demo
  useEffect(() => {
    try {
      const savedGuests = localStorage.getItem('guests');
      const savedCheckins = localStorage.getItem('checkins');
      
      if (savedGuests) {
        // Si ya hay datos guardados, usarlos
        dispatch({ 
          type: ActionTypes.SET_GUESTS, 
          payload: JSON.parse(savedGuests) 
        });
      } else {
        // Si no hay datos guardados, usar los datos de demo
        localStorage.setItem('guests', JSON.stringify(demoGuests));
        dispatch({ 
          type: ActionTypes.SET_GUESTS, 
          payload: demoGuests 
        });
      }
      
      if (savedCheckins) {
        // Si ya hay datos guardados, usarlos
        dispatch({ 
          type: ActionTypes.SET_CHECKINS, 
          payload: JSON.parse(savedCheckins) 
        });
      } else {
        // Si no hay datos guardados, usar los datos de demo
        localStorage.setItem('checkins', JSON.stringify(demoCheckins));
        dispatch({ 
          type: ActionTypes.SET_CHECKINS, 
          payload: demoCheckins 
        });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('guests', JSON.stringify(state.guests));
    localStorage.setItem('checkins', JSON.stringify(state.checkins));
  }, [state.guests, state.checkins]);

  // Objeto con acciones para manipular el estado
  const actions = {
    setLoading: (isLoading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
    },
    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },
    setGuests: (guests) => {
      dispatch({ type: ActionTypes.SET_GUESTS, payload: guests });
    },
    addGuest: (guest) => {
      dispatch({ type: ActionTypes.ADD_GUEST, payload: guest });
    },
    updateGuest: (guest) => {
      dispatch({ type: ActionTypes.UPDATE_GUEST, payload: guest });
    },
    setCurrentGuest: (guest) => {
      dispatch({ type: ActionTypes.SET_CURRENT_GUEST, payload: guest });
    },
    setCheckins: (checkins) => {
      dispatch({ type: ActionTypes.SET_CHECKINS, payload: checkins });
    },
    addCheckin: (checkin) => {
      dispatch({ type: ActionTypes.ADD_CHECKIN, payload: checkin });
    },
    updateCheckin: (checkin) => {
      dispatch({ type: ActionTypes.UPDATE_CHECKIN, payload: checkin });
    },
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
}
