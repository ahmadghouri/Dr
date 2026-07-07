const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  addAvailability,
  getDoctorSlots,
  getAllAvailabilities,
  getDoctorAvailabilities,
  deleteAvailability,
} = require('../controllers/doctorAvailabilityController');

// Add doctor availability (admin only)
router.post('/doctor/availability', protect, admin, addAvailability);

// Get all availabilities (admin only)
router.get('/doctor/availabilities', protect, admin, getAllAvailabilities);

// Get doctor availabilities (admin only)
router.get('/doctor/:doctorId/availabilities', protect, admin, getDoctorAvailabilities);

// Delete availability (admin only)
router.delete('/doctor/availability/:id', protect, admin, deleteAvailability);

// Get doctor slots by date (public)
router.get('/doctors/:doctorId/slots', getDoctorSlots);

module.exports = router;
