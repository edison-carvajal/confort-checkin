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
  useTheme,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  TablePagination
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Visibility as VisibilityIcon, 
  PersonAdd as PersonAddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const GuestsPage = () => {
  const { state, actions } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNewGuestDialog, setOpenNewGuestDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Estado para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Estado para el nuevo huésped
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'CC',
    idNumber: ''
  });

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

  const handleViewDetails = (guest) => {
    setSelectedGuest(guest);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Manejar apertura del diálogo de nuevo huésped
  const handleOpenNewGuestDialog = () => {
    setOpenNewGuestDialog(true);
  };

  // Manejar cierre del diálogo de nuevo huésped
  const handleCloseNewGuestDialog = () => {
    setOpenNewGuestDialog(false);
    // Resetear el formulario
    setNewGuest({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idType: 'CC',
      idNumber: ''
    });
  };

  // Manejar cambios en el formulario de nuevo huésped
  const handleNewGuestChange = (e) => {
    const { name, value } = e.target;
    setNewGuest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar guardado de nuevo huésped
  const handleSaveNewGuest = () => {
    // Validar campos requeridos
    if (!newGuest.firstName || !newGuest.lastName || !newGuest.idNumber) {
      setSnackbar({
        open: true,
        message: t('guests.newGuest.requiredFields'),
        severity: 'error'
      });
      return;
    }

    // Crear un nuevo ID único para el huésped
    const newGuestData = {
      ...newGuest,
      id: `guest-${Date.now()}`, // Crear un ID único basado en timestamp
    };

    // Añadir el nuevo huésped al estado global
    actions.addGuest(newGuestData);

    // Cerrar el diálogo y mostrar mensaje de éxito
    handleCloseNewGuestDialog();
    setSnackbar({
      open: true,
      message: t('guests.newGuest.successMessage'),
      severity: 'success'
    });
  };

  // Manejar cierre del snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Función para obtener el texto del tipo de ID
  const getIdTypeText = (idType) => {
    return t(`guests.idTypes.${idType}`) || idType;
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
          {t('guests.title')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<PersonAddIcon />}
          sx={{ height: 40 }}
          onClick={handleOpenNewGuestDialog}
        >
          {t('guests.addGuest')}
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t('guests.search')}
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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('guests.columns.name')}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('guests.columns.email')}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('guests.columns.phone')}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('guests.columns.idNumber')}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('guests.columns.stays')}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{t('guests.columns.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGuests.length > 0 ? (
                  (rowsPerPage > 0
                    ? filteredGuests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredGuests
                  ).map((guest) => {
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredGuests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={t('pagination.rowsPerPage')}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to} ${t('pagination.of')} ${count}`;
              }}
            />
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
                  <Typography variant="h6" gutterBottom>{t('guests.dialog.personalInfo')}</Typography>
                  <Typography><strong>Nombre:</strong> {`${selectedGuest.firstName} ${selectedGuest.lastName}`}</Typography>
                  <Typography><strong>Email:</strong> {selectedGuest.email}</Typography>
                  <Typography><strong>Teléfono:</strong> {selectedGuest.phone}</Typography>
                  <Typography><strong>Identificación:</strong> {getIdTypeText(selectedGuest.idType)} - {selectedGuest.idNumber}</Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>{t('guests.dialog.checkInHistory')}</Typography>
                  
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
                      {t('guests.dialog.noCheckIns')}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                {t('guests.dialog.close')}
              </Button>
              <Button color="primary" variant="contained">
                Editar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Diálogo para agregar nuevo huésped */}
      <Dialog 
        open={openNewGuestDialog} 
        onClose={handleCloseNewGuestDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
          {t('guests.newGuest.title')}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`${t('guests.newGuest.firstName')} *`}
                name="firstName"
                value={newGuest.firstName}
                onChange={handleNewGuestChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`${t('guests.newGuest.lastName')} *`}
                name="lastName"
                value={newGuest.lastName}
                onChange={handleNewGuestChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('guests.newGuest.email')}
                name="email"
                type="email"
                value={newGuest.email}
                onChange={handleNewGuestChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('guests.newGuest.phone')}
                name="phone"
                value={newGuest.phone}
                onChange={handleNewGuestChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="id-type-label">{`${t('guests.newGuest.idType')} *`}</InputLabel>
                <Select
                  labelId="id-type-label"
                  name="idType"
                  value={newGuest.idType}
                  onChange={handleNewGuestChange}
                  label={`${t('guests.newGuest.idType')} *`}
                  required
                >
                  <MenuItem value="CC">{t('guests.idTypes.CC')}</MenuItem>
                  <MenuItem value="TI">{t('guests.idTypes.TI')}</MenuItem>
                  <MenuItem value="CE">{t('guests.idTypes.CE')}</MenuItem>
                  <MenuItem value="PP">{t('guests.idTypes.PP')}</MenuItem>
                  <MenuItem value="RC">{t('guests.idTypes.RC')}</MenuItem>
                  <MenuItem value="PEP">{t('guests.idTypes.PEP')}</MenuItem>
                  <MenuItem value="PPT">{t('guests.idTypes.PPT')}</MenuItem>
                  <MenuItem value="NIT">{t('guests.idTypes.NIT')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={`${t('guests.newGuest.idNumber')} *`}
                name="idNumber"
                value={newGuest.idNumber}
                onChange={handleNewGuestChange}
                margin="normal"
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleCloseNewGuestDialog} 
            startIcon={<CancelIcon />}
          >
            {t('guests.newGuest.cancel')}
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveNewGuest}
            startIcon={<SaveIcon />}
          >
            {t('guests.newGuest.save')}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar para notificaciones */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          elevation={6} 
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GuestsPage;
