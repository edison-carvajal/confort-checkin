import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  IconButton, 
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  useTheme
} from '@mui/material';
import { 
  Search as SearchIcon, 
  CheckCircle as CheckCircleIcon, 
  Cancel as CancelIcon, 
  Visibility as VisibilityIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const CheckInList = () => {
  const { state } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCheckin, setSelectedCheckin] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  // Combinar datos de huéspedes y check-ins
  const checkinsWithGuestInfo = state.checkins.map(checkin => {
    const guest = state.guests.find(g => g.id === checkin.guestId);
    return {
      ...checkin,
      guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Huésped Desconocido',
      email: guest ? guest.email : 'N/A',
      phone: guest ? guest.phone : 'N/A',
      idType: guest ? guest.idType : 'N/A',
      idNumber: guest ? guest.idNumber : 'N/A',
    };
  });

  // Filtrar datos según el término de búsqueda
  const filteredCheckins = checkinsWithGuestInfo.filter(checkin => 
    checkin.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checkin.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checkin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (checkin) => {
    setSelectedCheckin(checkin);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Formatear fecha para mostrar
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Obtener el color del chip según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };

  // Obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Huéspedes Registrados
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por nombre, habitación o email..."
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
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Huésped</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Habitación</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check-In</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check-Out</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCheckins.length > 0 ? (
                filteredCheckins.map((checkin) => (
                  <TableRow key={checkin.id} hover>
                    <TableCell>{checkin.guestName}</TableCell>
                    <TableCell>{checkin.roomNumber}</TableCell>
                    <TableCell>{formatDate(checkin.checkInDate)}</TableCell>
                    <TableCell>{formatDate(checkin.checkOutDate)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={getStatusText(checkin.status)} 
                        color={getStatusColor(checkin.status)}
                        size="small"
                        icon={checkin.status === 'active' ? <CheckCircleIcon /> : checkin.status === 'cancelled' ? <CancelIcon /> : null}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary" 
                        size="small" 
                        onClick={() => handleViewDetails(checkin)}
                        aria-label="ver detalles"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        size="small" 
                        aria-label="editar"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body1" sx={{ py: 3 }}>
                      {searchTerm ? 'No se encontraron resultados para la búsqueda' : 'No hay check-ins registrados'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Diálogo de detalles */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedCheckin && (
          <>
            <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
              Detalles del Check-In
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información del Huésped</Typography>
                  <Typography><strong>Nombre:</strong> {selectedCheckin.guestName}</Typography>
                  <Typography><strong>Email:</strong> {selectedCheckin.email}</Typography>
                  <Typography><strong>Teléfono:</strong> {selectedCheckin.phone}</Typography>
                  <Typography><strong>Identificación:</strong> {getIdTypeText(selectedCheckin.idType)} - {selectedCheckin.idNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Información de Estancia</Typography>
                  <Typography><strong>Habitación:</strong> {selectedCheckin.roomNumber}</Typography>
                  <Typography><strong>Fecha Check-In:</strong> {formatDate(selectedCheckin.checkInDate)}</Typography>
                  <Typography><strong>Fecha Check-Out:</strong> {formatDate(selectedCheckin.checkOutDate)}</Typography>
                  <Typography><strong>Número de Huéspedes:</strong> {selectedCheckin.numberOfGuests}</Typography>
                  <Typography sx={{ mt: 1 }}>
                    <strong>Estado:</strong> 
                    <Chip 
                      label={getStatusText(selectedCheckin.status)} 
                      color={getStatusColor(selectedCheckin.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
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
    </Card>
  );
};

// Función auxiliar para mostrar el tipo de ID de forma legible
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

export default CheckInList;
