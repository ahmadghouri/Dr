const DoctorAvailability = require("../models/DoctorAvailability");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const generateSlots = require("../utils/generateSlots");

const isValidTime = (time) => {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const parseLocalDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Add or update doctor availability
const addAvailability = async (req, res) => {
  try {
    const { doctorId, dayOfWeek, startTime, endTime, slotDuration } = req.body;

    if (!doctorId || dayOfWeek === undefined || !startTime || !endTime) {
      return res.status(400).json({
        message: "doctorId, dayOfWeek, startTime and endTime are required",
      });
    }

    const numericDay = Number(dayOfWeek);

    if (numericDay < 0 || numericDay > 6) {
      return res.status(400).json({
        message: "dayOfWeek must be between 0 and 6",
      });
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
      return res.status(400).json({
        message: "startTime and endTime must be in HH:mm format",
      });
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (endMinutes <= startMinutes) {
      return res.status(400).json({
        message: "endTime must be greater than startTime",
      });
    }

    const duration = Number(slotDuration) || 30;

    if (duration <= 0) {
      return res.status(400).json({
        message: "slotDuration must be greater than 0",
      });
    }

    const availability = await DoctorAvailability.findOneAndUpdate(
      {
        doctorId,
        dayOfWeek: numericDay,
      },
      {
        doctorId,
        dayOfWeek: numericDay,
        startTime,
        endTime,
        slotDuration: duration,
        isActive: true,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    ).populate("doctorId", "name");

    return res.status(200).json({
      message: "Availability saved successfully",
      availability,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Availability already exists for this doctor and day",
      });
    }

    console.error("Error saving availability:", error);

    const response = { message: error.message };

    if (process.env.NODE_ENV !== "production") {
      response.stack = error.stack;
    }

    return res.status(500).json(response);
  }
};

// Get all availabilities (admin)
const getAllAvailabilities = async (req, res) => {
  try {
    const availabilities = await DoctorAvailability.find().populate(
      "doctorId",
      "name",
    );
    res.status(200).json(availabilities);
  } catch (error) {
    console.error("Error getting availabilities:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get availabilities by doctor (admin)
const getDoctorAvailabilities = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const availabilities = await DoctorAvailability.find({ doctorId }).populate(
      "doctorId",
      "name",
    );
    res.status(200).json(availabilities);
  } catch (error) {
    console.error("Error getting doctor availabilities:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete availability (admin)
const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const availability = await DoctorAvailability.findByIdAndDelete(id);
    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }
    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (error) {
    console.error("Error deleting availability:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get doctor slots by date
const getDoctorSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!doctorId) {
      return res.status(400).json({
        message: "doctorId is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Date query parameter is required",
      });
    }

    const requestedDate = parseLocalDate(date);

    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD",
      });
    }

    const dayOfWeek = requestedDate.getDay();

    const availability = await DoctorAvailability.findOne({
      doctorId,
      dayOfWeek,
      isActive: true,
    });

    if (!availability) {
      return res.json({
        success: true,
        slots: [],
      });
    }

    const slots = generateSlots(
      date,
      availability.startTime,
      availability.endTime,
      availability.slotDuration,
    );

    const startOfDay = parseLocalDate(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = parseLocalDate(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      doctorId,
      active: true,
      startAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).select("startAt");

    const bookedStartTimes = new Set(
      bookedAppointments.map((appt) => appt.startAt.getTime()),
    );

    const slotsWithStatus = slots.map((slot) => ({
      startAt: slot.startAt,
      endAt: slot.endAt,
      isBooked: bookedStartTimes.has(new Date(slot.startAt).getTime()),
    }));

    return res.json({
      success: true,
      slots: slotsWithStatus,
    });
  } catch (error) {
    console.error("Error getting slots:", error);

    const response = { message: error.message };

    if (process.env.NODE_ENV !== "production") {
      response.stack = error.stack;
    }

    return res.status(500).json(response);
  }
};

module.exports = {
  addAvailability,
  getDoctorSlots,
  getAllAvailabilities,
  getDoctorAvailabilities,
  deleteAvailability,
};
