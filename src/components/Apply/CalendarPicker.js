import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { device } from "../../styles/theme";
import styled from "styled-components";

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <CalendarWrapper>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate ? new Date(selectedDate) : null}
        minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
        tileDisabled={({ date }) =>
          date.toDateString() === new Date().toDateString()
        }
      />
    </CalendarWrapper>
  );
};

export default CalendarPicker;

const CalendarWrapper = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    background: white;
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
    @media ${device.mobile} {
      font-size: 1.6rem;
    }
  }

  .react-calendar__navigation__label {
    font-size: 20px;

    @media ${device.mobile} {
      font-size: 24px;
    }
  }

  .react-calendar__navigation__arrow {
    font-size: 20px;

    @media ${device.mobile} {
      font-size: 28px;
    }
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0 !important;
    color: #ccc !important;
    cursor: not-allowed !important;
    border-radius: 0 !important;
  }
  .react-calendar__tile--active {
    background-color: #01e6ff !important;
    color: white !important;
    border-radius: 10px !important;
  }
`;
