import React from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const CheckInForm = () => {
  const { state, actions } = useAppContext();
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('success');

  // Esquema de validación
  const CheckInSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, t('validation.nameMinLength'))
      .max(50, t('validation.nameMaxLength'))
      .required(t('validation.nameRequired')),
    lastName: Yup.string()
      .min(2, t('validation.lastNameMinLength'))
      .max(50, t('validation.lastNameMaxLength'))
      .required(t('validation.lastNameRequired')),
    email: Yup.string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t('validation.phoneOnlyNumbers'))
      .min(7, t('validation.phoneMinLength'))
      .max(15, t('validation.phoneMaxLength'))
      .required(t('validation.phoneRequired')),
    idNumber: Yup.string()
      .required(t('validation.idNumberRequired')),
    idType: Yup.string()
      .required(t('validation.idTypeRequired')),
    roomNumber: Yup.string()
      .required(t('validation.roomNumberRequired')),
    checkInDate: Yup.date()
      .required(t('validation.checkInDateRequired')),
    checkOutDate: Yup.date()
      .min(
        Yup.ref('checkInDate'),
        t('validation.checkOutDateAfterCheckIn')
      )
      .required(t('validation.checkOutDateRequired')),
    numberOfGuests: Yup.number()
      .positive(t('validation.positiveNumber'))
      .integer(t('validation.integerNumber'))
      .required(t('validation.guestsRequired'))
  });

  const idTypes = [
    { value: 'passport', label: t('idTypes.passport') },
    { value: 'nationalId', label: t('idTypes.nationalId') },
    { value: 'driverLicense', label: t('idTypes.driverLicense') }
  ];

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
        setAlertMessage(t('checkIn.successMessage'));
        setAlertSeverity('success');
        setShowAlert(true);

        // Resetear el formulario
        resetForm();
      } catch (error) {
        console.error('Error al realizar el check-in:', error);
        setAlertMessage(t('checkIn.errorMessage'));
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
          {t('checkIn.formTitle')}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label={t('checkIn.firstName')}
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
                label={t('checkIn.lastName')}
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
                label={t('checkIn.email')}
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
                label={t('checkIn.phone')}
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
                label={t('checkIn.idType')}
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
                label={t('checkIn.idNumber')}
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
                label={t('checkIn.roomNumber')}
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
                label={t('checkIn.numberOfGuests')}
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
                label={t('checkIn.checkInDate')}
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
                label={t('checkIn.checkOutDate')}
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
                {t('checkIn.register')}
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
