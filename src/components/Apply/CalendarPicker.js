import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styled from "styled-components";

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <CalendarWrapper>
      <Calendar
        onChange={setSelectedDate}
        value={new Date(selectedDate)}
        minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
      />
    </CalendarWrapper>
  );
};

export default CalendarPicker;

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    max-width: 350px;
    border: none;
    background: white;
    border-radius: 10px;
  }
`;
