import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

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
          $isSelected={selectedTime === time}
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: auto;
  margin-top: 20px;
  width: 400px;
  @media ${device.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TimeSlotButton = styled.button`
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  border: ${({ $isSelected }) =>
    $isSelected ? "2px solid #00e6fd" : "1px solid #d6d6d6"};
  background: ${({ $isSelected }) => ($isSelected ? "#00e6fd" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
  cursor: pointer;
  text-align: center;
  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;
