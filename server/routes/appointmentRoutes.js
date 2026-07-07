const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getDoctorAppointments,
} = require('../controllers/appointmentController');

// Book an appointment (public)
router.post('/appointments/book', bookAppointment);

// Get all appointments (admin only)
router.get('/appointments', protect, admin, getAllAppointments);

// Cancel an appointment (admin only)
router.patch('/appointments/:id/cancel', protect, admin, cancelAppointment);

// Get doctor's appointments (admin only)
router.get('/doctors/:doctorId/appointments', protect, admin, getDoctorAppointments);

module.exports = router;
