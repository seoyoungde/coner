import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

const timeSlots = [
  "오전9시 ~ 오후12시",
  "오후12시 ~ 오후3시",
  "오후3시 ~ 오후6시",
  "오후6시 ~ 이후",
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
  width: 460px;
  @media ${device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    width: 400px;
  }
`;

const TimeSlotButton = styled.button`
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  border: ${({ $isSelected }) =>
    $isSelected ? "2px solid #0080FF" : "1px solid #d6d6d6"};
  background: ${({ $isSelected }) => ($isSelected ? "#0080FF" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
  cursor: pointer;
  text-align: center;
  @media ${device.mobile} {
    font-size: 16px;
  }
`;
