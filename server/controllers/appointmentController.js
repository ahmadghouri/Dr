const Appointment = require("../models/Appointment");
const DoctorAvailability = require("../models/DoctorAvailability");
const Doctor = require("../models/Doctor");
const sendEmail = require("../utils/sendEmail");
const sendWhatsApp = require("../utils/sendWhatsApp");

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const buildDateTime = (date, time) => {
  // Combine date and time into an ISO-like string, then parse it as local time
  const dateTimeString = `${date}T${time}`;
  // Create date from ISO string to avoid time zone issues
  const dateParts = date.split("-").map(Number);
  const timeParts = time.split(":").map(Number);
  return new Date(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2],
    timeParts[0],
    timeParts[1],
    0,
    0,
  );
};

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      visitType,
      patientName,
      patientPhone,
      patientEmail,
      serviceRequired,
      date,
      time,
    } = req.body;

    if (
      !doctorId ||
      !visitType ||
      !patientName ||
      !patientPhone ||
      !patientEmail ||
      !serviceRequired ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!["online", "physical"].includes(visitType)) {
      return res.status(400).json({
        message: "Visit type must be online or physical",
      });
    }

    const startAt = buildDateTime(date, time);

    if (isNaN(startAt.getTime())) {
      return res.status(400).json({
        message: "Invalid date or time",
      });
    }

    // Disable past date check for testing purposes
    // const now = new Date();
    // now.setMilliseconds(0);
    // if (startAt < now) {
    //   return res.status(400).json({
    //     message: "You cannot book an appointment in the past",
    //   });
    // }

    const dayOfWeek = startAt.getDay();

    const availability = await DoctorAvailability.findOne({
      doctorId,
      dayOfWeek,
      isActive: true,
    });

    if (!availability) {
      return res.status(400).json({
        message: "Doctor is not available on this date",
      });
    }

    const requestedStartMinutes = timeToMinutes(time);
    const availabilityStartMinutes = timeToMinutes(availability.startTime);
    const availabilityEndMinutes = timeToMinutes(availability.endTime);

    const slotDuration = availability.slotDuration || 30;
    const requestedEndMinutes = requestedStartMinutes + slotDuration;

    if (
      requestedStartMinutes < availabilityStartMinutes ||
      requestedEndMinutes > availabilityEndMinutes
    ) {
      return res.status(400).json({
        message: "Selected time is outside doctor's availability",
      });
    }

    const isValidSlot =
      (requestedStartMinutes - availabilityStartMinutes) % slotDuration === 0;

    if (!isValidSlot) {
      return res.status(400).json({
        message: "Invalid slot time. Please select a valid slot",
      });
    }

    const endAt = new Date(startAt);
    endAt.setMinutes(endAt.getMinutes() + slotDuration);

    const appointment = await Appointment.create({
      doctorId,
      visitType,
      patientName,
      patientPhone,
      patientEmail,
      serviceRequired,
      startAt,
      endAt,
      status: "booked",
      active: true,
    });

    // Populate doctor
    const populatedAppointment = await Appointment.findById(
      appointment._id,
    ).populate("doctorId", "name");

    // Get doctor details for notifications
    const doctor = await Doctor.findById(doctorId).select(
      "name email phoneNumber",
    );

    const patientMessage = `Dear ${patientName},

Your appointment has been booked successfully.

Visit Type: ${visitType}
Service: ${serviceRequired}
Date: ${date}
Time: ${time}

Thank you.`;

    const doctorMessage = `Hello ${doctor?.name || "Doctor"},

A new appointment has been booked.

Patient Details:
Name: ${patientName}
Phone: ${patientPhone}
Email: ${patientEmail}

Appointment Details:
Visit Type: ${visitType}
Service Required: ${serviceRequired}
Date: ${date}
Time: ${time}

Thank you.`;

    // Send email to patient
    sendEmail({
      to: patientEmail,
      subject: "Appointment Confirmed",
      text: patientMessage,
    }).catch((emailError) => {
      console.error("Patient email failed:", emailError.message);
    });

    // Send WhatsApp to patient
    sendWhatsApp({
      to: patientPhone,
      message: patientMessage,
    }).catch((whatsappError) => {
      console.error("Patient WhatsApp failed:", whatsappError.message);
    });

    // Send email to doctor
    if (doctor && doctor.email) {
      sendEmail({
        to: doctor.email,
        subject: "New Appointment Booked",
        text: doctorMessage,
      }).catch((emailError) => {
        console.error("Doctor email failed:", emailError.message);
      });
    }

    // Send WhatsApp to doctor
    if (doctor && doctor.phoneNumber) {
      sendWhatsApp({
        to: doctor.phoneNumber,
        message: doctorMessage,
      }).catch((whatsappError) => {
        console.error("Doctor WhatsApp failed:", whatsappError.message);
      });
    }

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This slot is already booked. Please select another time.",
      });
    }

    console.error("Error booking appointment:", error);

    const response = { message: error.message };

    if (process.env.NODE_ENV !== "production") {
      response.stack = error.stack;
    }

    return res.status(500).json(response);
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate(
      "doctorId",
      "name",
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "cancelled";
    appointment.active = false;
    await appointment.save();
    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments (admin only)
const getAllAppointments = async (req, res) => {
  try {
    let query = {};
    const { doctorId, status, startDate, endDate, visitType } = req.query;

    if (doctorId) {
      query.doctorId = doctorId;
    }

    if (status) {
      query.status = status;
    }

    if (visitType) {
      query.visitType = visitType;
    }

    if (startDate || endDate) {
      query.startAt = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.startAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.startAt.$lte = end;
      }
    }

    const appointments = await Appointment.find(query)
      .populate("doctorId", "name")
      .sort({ startAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get doctor's appointments (admin only)
const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, status, startDate, endDate } = req.query;
    let query = { doctorId, active: true };

    if (status) {
      query.status = status;
    }

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.startAt = { $gte: startOfDay, $lte: endOfDay };
    } else if (startDate || endDate) {
      query.startAt = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.startAt.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.startAt.$lte = end;
      }
    }

    const appointments = await Appointment.find(query).populate("doctorId", "name expertise").sort({ startAt: 1 });
    res.json(appointments);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getDoctorAppointments,
};
