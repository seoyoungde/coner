import React from "react";
import styled from "styled-components";

const timeSlots = [
  "9:00 ~ 11:00",
  "11:00 ~ 13:00",
  "13:00 ~ 15:00",
  "15:00 ~ 17:00",
  "17:00 ~ 19:00",
];

const TimeSlotPicker = ({ selectedTime, setSelectedTime }) => {
  return (
    <TimeSlotContainer>
      {timeSlots.map((time) => (
        <TimeSlotButton
          key={time}
          isSelected={selectedTime === time}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </TimeSlotButton>
      ))}
    </TimeSlotContainer>
  );
};

export default TimeSlotPicker;

const TimeSlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const TimeSlotButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #00e6fd" : "1px solid #ccc"};
  background: ${({ isSelected }) => (isSelected ? "#d0f7ff" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#00e6fd" : "#333")};
  cursor: pointer;
`;
