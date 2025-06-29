import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { device } from "../../styles/theme";
import styled from "styled-components";

const CalendarPicker = ({ selectedDate, setSelectedDate, excludeDates }) => {
  return (
    <CalendarWrapper>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate ? new Date(selectedDate) : null}
        minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
        excludeDates={excludeDates}
        tileDisabled={({ date }) => {
          const disabled = excludeDates?.some(
            (excluded) =>
              date.toDateString() === new Date(excluded).toDateString()
          );
          return disabled;
        }}
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
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    }
  }

  .react-calendar__navigation__label {
    font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};

    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
    }
  }

  .react-calendar__navigation__arrow {
    font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};

    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
    }
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0 !important;
    color: #ccc !important;
    cursor: not-allowed !important;
    border-radius: 0 !important;
  }
  .react-calendar__tile--active {
    background-color: #0080ff !important;
    color: white !important;
    border-radius: 10px !important;
  }
`;
