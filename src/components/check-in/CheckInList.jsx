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
  useTheme,
  TablePagination
} from '@mui/material';
import { 
  Search as SearchIcon, 
  CheckCircle as CheckCircleIcon, 
  Cancel as CancelIcon, 
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const CheckInList = () => {
  const { state, actions } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCheckin, setSelectedCheckin] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  
  // Estado para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Estado para el modo de edición
  const [editMode, setEditMode] = useState(false);
  const [editedCheckin, setEditedCheckin] = useState(null);

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
    setPage(0); // Resetear a la primera página cuando se busca
  };

  // Manejadores para la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (checkin) => {
    setSelectedCheckin(checkin);
    setEditedCheckin(null);
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setEditedCheckin(null);
  };
  
  // Iniciar modo de edición
  const handleEnterEditMode = () => {
    setEditMode(true);
    setEditedCheckin({...selectedCheckin});
  };
  
  // Cancelar la edición
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCheckin(null);
  };
  
  // Manejar cambios en el formulario de edición
  const handleEditChange = (field, value) => {
    setEditedCheckin(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Guardar los cambios del check-in
  const handleSaveChanges = () => {
    // Actualizar el check-in en el contexto global
    actions.updateCheckin(editedCheckin);
    
    // Actualizar la lista local
    const updatedCheckins = checkinsWithGuestInfo.map(checkin => 
      checkin.id === editedCheckin.id ? {...checkin, ...editedCheckin} : checkin
    );
    
    // Actualizar el check-in seleccionado para ver los cambios inmediatamente
    setSelectedCheckin(editedCheckin);
    
    // Salir del modo edición
    setEditMode(false);
    setEditedCheckin(null);
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
                (rowsPerPage > 0
                  ? filteredCheckins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredCheckins
                ).map((checkin) => (
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredCheckins.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
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
              {!editMode ? (
                // Modo visualización
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
              ) : (
                // Modo edición
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>Editar información de estancia</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Habitación"
                      value={editedCheckin.roomNumber}
                      onChange={(e) => handleEditChange('roomNumber', e.target.value)}
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Número de huéspedes"
                      type="number"
                      value={editedCheckin.numberOfGuests}
                      onChange={(e) => handleEditChange('numberOfGuests', parseInt(e.target.value))}
                      variant="outlined"
                      margin="dense"
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Fecha Check-In"
                      type="date"
                      value={editedCheckin.checkInDate.split('T')[0]}
                      onChange={(e) => handleEditChange('checkInDate', e.target.value)}
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Fecha Check-Out"
                      type="date"
                      value={editedCheckin.checkOutDate.split('T')[0]}
                      onChange={(e) => handleEditChange('checkOutDate', e.target.value)}
                      variant="outlined"
                      margin="dense"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Estado"
                      value={editedCheckin.status}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                      variant="outlined"
                      margin="dense"
                    >
                      <option value="active">Activo</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </TextField>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              {!editMode ? (
                // Botones en modo visualización
                <>
                  <Button onClick={handleCloseDialog} color="primary">
                    Cerrar
                  </Button>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={handleEnterEditMode}
                  >
                    Editar
                  </Button>
                </>
              ) : (
                // Botones en modo edición
                <>
                  <Button onClick={handleCancelEdit} color="primary">
                    Cancelar
                  </Button>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={handleSaveChanges}
                  >
                    Guardar Cambios
                  </Button>
                </>
              )}
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
