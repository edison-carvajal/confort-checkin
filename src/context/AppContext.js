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
