import React, { useState, useEffect } from "react";
import BookingPopup from "./BookingPopup";

const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      setIsVisible(true);
      sessionStorage.setItem("hasSeenWelcomePopup", "true");
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  const openBooking = () => {
    setIsVisible(false);
    setShowBooking(true);
  };

  const closeBooking = () => {
    setShowBooking(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 ">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl relative overflow-hidden my-8">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-[10000] bg-teal-100/20 rounded-lg p-2 text-2xl font-bold text-white border-2 border-white hover:bg-white/30"
            >
              &times;
            </button>

            {/* Top Teal Section */}
            <div className="bg-[#00A78E] p-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-2xl p-3">
                  <svg
                    className="w-10 h-10 text-white"
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
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Book Your Appointment
                  </h2>
                  <p className="text-teal-100 text-lg">
                    Expert Bariatric & Weight Loss Care
                  </p>
                </div>
              </div>

              {/* Doctor Info Card */}
              <div className="mt-6 bg-white/15 rounded-3xl p-5 flex items-center gap-5">
                <div className="relative">
                  <img
                    src="/hero1-thumb.jpg"
                    alt="Dr. Shahzad Alam"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white/30"
                  />
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold">Dr. Shahzad Alam</h3>
                  <p className="text-lg text-teal-100 mt-1">
                    Bariatric & Laparoscopic Surgeon
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-semibold">5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom White Section */}
            <div className="bg-gray-50 p-6">
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="bg-teal-100 rounded-full p-3">
                    <svg
                      className="w-8 h-8 text-[#00A78E]"
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
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Available Mon - Sat
                    </h4>
                    <p className="text-lg text-gray-500 mt-1">
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="bg-teal-100 rounded-full p-3">
                    <svg
                      className="w-8 h-8 text-[#00A78E]"
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
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Call Now
                    </h4>
                    <p className="text-lg text-[#00A78E] mt-1 font-medium">
                      0300-426-9681
                    </p>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={openBooking}
                    className="w-full bg-[#9A3434] hover:bg-[#802929] text-white text-xl font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg
                      className="w-7 h-7"
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
                    Book Appointment Now
                  </button>

                  <button
                    onClick={closePopup}
                    className="w-full bg-transparent border-2 border-[#00A78E] text-[#00A78E] hover:bg-teal-50 text-lg font-semibold py-3 px-8 rounded-xl transition-all duration-300"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <BookingPopup isVisible={showBooking} onClose={closeBooking} />
    </>
  );
};

export default WelcomePopup;
