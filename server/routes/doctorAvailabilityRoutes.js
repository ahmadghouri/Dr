const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  addAvailability,
  getDoctorSlots,
  getAllAvailabilities,
  getDoctorAvailabilities,
  deleteAvailability,
} = require("../controllers/doctorAvailabilityController");
const {
  getDoctorAppointments,
} = require("../controllers/appointmentController");

// Add doctor availability (admin only)
router.post("/availability", protect, admin, addAvailability);

// Get all availabilities (admin only)
router.get("/availabilities", protect, admin, getAllAvailabilities);

// Get doctor availabilities (admin only)
router.get(
  "/:doctorId/availabilities",
  protect,
  admin,
  getDoctorAvailabilities,
);

// Delete availability (admin only)
router.delete("/availability/:id", protect, admin, deleteAvailability);

// Get doctor slots by date (public)
router.get("/:doctorId/slots", getDoctorSlots);

// Get doctor's appointments (admin only)
router.get("/:doctorId/appointments", protect, admin, getDoctorAppointments);

module.exports = router;
