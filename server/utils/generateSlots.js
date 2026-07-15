const parseLocalDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const generateSlots = (date, startTime, endTime, durationMinutes = 30) => {
  const slots = [];

  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const baseDate = parseLocalDate(date);

  if (isNaN(baseDate.getTime())) {
    return slots;
  }

  const startDateTime = new Date(baseDate);
  startDateTime.setHours(startHour, startMin, 0, 0);

  const endDateTime = new Date(baseDate);
  endDateTime.setHours(endHour, endMin, 0, 0);

  let current = new Date(startDateTime);

  while (current < endDateTime) {
    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + durationMinutes);

    // Important: slot doctor ke end time se bahar nahi jana chahiye
    if (slotEnd <= endDateTime) {
      slots.push({
        startAt: new Date(current),
        endAt: new Date(slotEnd),
      });
    }

    current = slotEnd;
  }

  return slots;
};

module.exports = generateSlots;
