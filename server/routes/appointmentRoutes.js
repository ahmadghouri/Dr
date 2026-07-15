const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getDoctorAppointments,
  getBookedSlots,
} = require('../controllers/appointmentController');

// Book an appointment (public)
router.post('/book', bookAppointment);

// Get all appointments (admin only)
router.get('/', protect, admin, getAllAppointments);

// Cancel an appointment (admin only)
router.patch('/:id/cancel', protect, admin, cancelAppointment);

router.get("/booked-slots", getBookedSlots);

module.exports = router;
