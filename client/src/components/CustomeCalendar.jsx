import React, { useState } from 'react';

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => handleDateChange(-1)}>Previous Day</button>
      <div className="mx-4">{selectedDate.toDateString()}</div>
      <button onClick={() => handleDateChange(1)}>Next Day</button>
    </div>
  );
};

export default CustomCalendar;
