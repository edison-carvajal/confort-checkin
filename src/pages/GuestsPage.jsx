import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Grid, 
  Divider,
  useTheme 
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Visibility as VisibilityIcon, 
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';

const GuestsPage = () => {
  const { state } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  // Filtrar huéspedes según el término de búsqueda
  const filteredGuests = state.guests.filter(guest =>
    guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.idNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener check-ins relacionados con un huésped específico
  const getGuestCheckIns = (guestId) => {
    return state.checkins.filter(checkin => checkin.guestId === guestId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (guest) => {
    setSelectedGuest(guest);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Función para obtener el texto del tipo de ID
  const getIdTypeText = (idType) => {
    switch (idType) {
      case 'passport':
        return 'Pasaporte';
      case 'nationalId':
        return 'Documento de Identidad';
      case 'driverLicense':
        return 'Licencia de Conducir';
      default:
        return idType;
    }
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Huéspedes
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PersonAddIcon />}
          sx={{ height: 40 }}
        >
          Nuevo Huésped
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nombre, email o número de ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Teléfono</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Identificación</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estancias</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGuests.length > 0 ? (
                  filteredGuests.map((guest) => {
                    const guestCheckIns = getGuestCheckIns(guest.id);
                    return (
                      <TableRow key={guest.id} hover>
                        <TableCell>{`${guest.firstName} ${guest.lastName}`}</TableCell>
                        <TableCell>{guest.email}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>{`${getIdTypeText(guest.idType)}: ${guest.idNumber}`}</TableCell>
                        <TableCell>{guestCheckIns.length}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            size="small" 
                            onClick={() => handleViewDetails(guest)}
                            aria-label="ver detalles"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" sx={{ py: 3 }}>
                        {searchTerm ? 'No se encontraron resultados para la búsqueda' : 'No hay huéspedes registrados'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Diálogo de detalles del huésped */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedGuest && (
          <>
            <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
              Detalles del Huésped
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información Personal</Typography>
                  <Typography><strong>Nombre:</strong> {`${selectedGuest.firstName} ${selectedGuest.lastName}`}</Typography>
                  <Typography><strong>Email:</strong> {selectedGuest.email}</Typography>
                  <Typography><strong>Teléfono:</strong> {selectedGuest.phone}</Typography>
                  <Typography><strong>Identificación:</strong> {getIdTypeText(selectedGuest.idType)} - {selectedGuest.idNumber}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>Historial de Check-ins</Typography>
                  
                  {getGuestCheckIns(selectedGuest.id).length > 0 ? (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table size="small">
                        <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
                          <TableRow>
                            <TableCell sx={{ color: 'white' }}>Habitación</TableCell>
                            <TableCell sx={{ color: 'white' }}>Check-In</TableCell>
                            <TableCell sx={{ color: 'white' }}>Check-Out</TableCell>
                            <TableCell sx={{ color: 'white' }}>Estado</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {getGuestCheckIns(selectedGuest.id).map((checkin) => (
                            <TableRow key={checkin.id} hover>
                              <TableCell>{checkin.roomNumber}</TableCell>
                              <TableCell>{formatDate(checkin.checkInDate)}</TableCell>
                              <TableCell>{formatDate(checkin.checkOutDate)}</TableCell>
                              <TableCell>{checkin.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      No hay registros de check-in para este huésped
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cerrar
              </Button>
              <Button color="primary" variant="contained">
                Editar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default GuestsPage;
