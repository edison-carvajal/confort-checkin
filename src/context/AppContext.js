import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Definición del estado inicial
const initialState = {
  guests: [],
  checkins: [],
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

  // Cargar datos iniciales desde localStorage al inicio
  useEffect(() => {
    try {
      const savedGuests = localStorage.getItem('guests');
      const savedCheckins = localStorage.getItem('checkins');
      
      if (savedGuests) {
        dispatch({ 
          type: ActionTypes.SET_GUESTS, 
          payload: JSON.parse(savedGuests) 
        });
      }
      
      if (savedCheckins) {
        dispatch({ 
          type: ActionTypes.SET_CHECKINS, 
          payload: JSON.parse(savedCheckins) 
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
