import React from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';

// Esquema de validación
const CheckInSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Nombre demasiado corto')
    .max(50, 'Nombre demasiado largo')
    .required('El nombre es obligatorio'),
  lastName: Yup.string()
    .min(2, 'Apellido demasiado corto')
    .max(50, 'Apellido demasiado largo')
    .required('El apellido es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Solo se permiten números')
    .min(7, 'Número de teléfono demasiado corto')
    .max(15, 'Número de teléfono demasiado largo')
    .required('El teléfono es obligatorio'),
  idNumber: Yup.string()
    .required('El número de identificación es obligatorio'),
  idType: Yup.string()
    .required('El tipo de identificación es obligatorio'),
  roomNumber: Yup.string()
    .required('El número de habitación es obligatorio'),
  checkInDate: Yup.date()
    .required('La fecha de check-in es obligatoria'),
  checkOutDate: Yup.date()
    .min(
      Yup.ref('checkInDate'),
      'La fecha de check-out debe ser posterior a la fecha de check-in'
    )
    .required('La fecha de check-out es obligatoria'),
  numberOfGuests: Yup.number()
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .required('El número de huéspedes es obligatorio')
});

const idTypes = [
  { value: 'passport', label: 'Pasaporte' },
  { value: 'nationalId', label: 'Documento de Identidad' },
  { value: 'driverLicense', label: 'Licencia de Conducir' }
];

const CheckInForm = () => {
  const { state, actions } = useAppContext();
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('success');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idNumber: '',
      idType: 'nationalId',
      roomNumber: '',
      checkInDate: new Date().toISOString().slice(0, 10),
      checkOutDate: '',
      numberOfGuests: 1
    },
    validationSchema: CheckInSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        // Crear el objeto de huésped
        const guestId = uuidv4();
        const guest = {
          id: guestId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          idNumber: values.idNumber,
          idType: values.idType
        };

        // Crear el objeto de check-in
        const checkIn = {
          id: uuidv4(),
          guestId,
          roomNumber: values.roomNumber,
          checkInDate: values.checkInDate,
          checkOutDate: values.checkOutDate,
          numberOfGuests: values.numberOfGuests,
          status: 'active',
          createdAt: new Date().toISOString()
        };

        // Guardar en el contexto
        actions.addGuest(guest);
        actions.addCheckin(checkIn);

        // Mostrar mensaje de éxito
        setAlertMessage('Check-in realizado con éxito');
        setAlertSeverity('success');
        setShowAlert(true);

        // Resetear el formulario
        resetForm();
      } catch (error) {
        console.error('Error al realizar el check-in:', error);
        setAlertMessage('Error al realizar el check-in');
        setAlertSeverity('error');
        setShowAlert(true);
      }
    },
  });

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Formulario de Check-In
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="Nombre"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Apellido"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Teléfono"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="idType"
                name="idType"
                select
                label="Tipo de Identificación"
                value={formik.values.idType}
                onChange={formik.handleChange}
                error={formik.touched.idType && Boolean(formik.errors.idType)}
                helperText={formik.touched.idType && formik.errors.idType}
              >
                {idTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="idNumber"
                name="idNumber"
                label="Número de Identificación"
                value={formik.values.idNumber}
                onChange={formik.handleChange}
                error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
                helperText={formik.touched.idNumber && formik.errors.idNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="roomNumber"
                name="roomNumber"
                label="Número de Habitación"
                value={formik.values.roomNumber}
                onChange={formik.handleChange}
                error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                helperText={formik.touched.roomNumber && formik.errors.roomNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="numberOfGuests"
                name="numberOfGuests"
                label="Número de Huéspedes"
                type="number"
                value={formik.values.numberOfGuests}
                onChange={formik.handleChange}
                error={formik.touched.numberOfGuests && Boolean(formik.errors.numberOfGuests)}
                helperText={formik.touched.numberOfGuests && formik.errors.numberOfGuests}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="checkInDate"
                name="checkInDate"
                label="Fecha de Check-In"
                type="date"
                value={formik.values.checkInDate}
                onChange={formik.handleChange}
                error={formik.touched.checkInDate && Boolean(formik.errors.checkInDate)}
                helperText={formik.touched.checkInDate && formik.errors.checkInDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="checkOutDate"
                name="checkOutDate"
                label="Fecha de Check-Out"
                type="date"
                value={formik.values.checkOutDate}
                onChange={formik.handleChange}
                error={formik.touched.checkOutDate && Boolean(formik.errors.checkOutDate)}
                helperText={formik.touched.checkOutDate && formik.errors.checkOutDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Registrar Check-In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CheckInForm;
