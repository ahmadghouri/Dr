import React, { useState } from "react";

interface BookingPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const BookingPopup: React.FC<BookingPopupProps> = ({ isVisible, onClose }) => {
  const [appointmentType, setAppointmentType] = useState<"online" | "physical">(
    "online",
  );
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    serviceRequired: "",
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    // Handle form submission here
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 ">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl relative overflow-y-scroll max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] text-gray-600 text-3xl font-bold hover:text-gray-900 transition-colors"
        >
          &times;
        </button>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Book Appointment
          </h2>

          {/* Appointment Type Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setAppointmentType("online")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold transition-all ${
                appointmentType === "online"
                  ? "bg-[#9A3434]/10 border-[#9A3434] text-[#9A3434]"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Online
            </button>
            <button
              type="button"
              onClick={() => setAppointmentType("physical")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold transition-all ${
                appointmentType === "physical"
                  ? "bg-[#9A3434]/10 border-[#9A3434] text-[#9A3434]"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Physical Visit
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-[#9A3434] focus:outline-none focus:border-[#802929] text-lg"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Phone Number *
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+92 xxxxxxxxxx"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#9A3434] text-lg"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="emailAddress"
                  placeholder="your@email.com"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#9A3434] text-lg"
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00A78E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Service Required */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                Service Required *
              </label>
              <select
                name="serviceRequired"
                value={formData.serviceRequired}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#9A3434] text-lg appearance-none bg-white"
              >
                <option value="">Select a service</option>
                <option value="bariatric">Bariatric Surgery</option>
                <option value="laparoscopic">Laparoscopic Surgery</option>
                <option value="weight-loss">Weight Loss Consultation</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#9A3434] text-lg"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#9A3434] text-lg appearance-none bg-white"
                >
                  <option value="">Date first</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#9A3434] hover:bg-[#802929] text-white text-xl font-semibold py-4 px-8 rounded-xl transition-all duration-300 mt-4"
            >
              Book Appointment
            </button>

            {/* Social Links */}
            <div className="text-center pt-4">
              <p className="text-gray-600 font-medium mb-3">
                Follow us for updates:
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="#"
                  className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-[#1877F2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-[#FF0000]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPopup;
