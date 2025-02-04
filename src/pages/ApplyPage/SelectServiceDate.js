import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarPicker from "../..//components/Apply/CalendarPicker";
import TimeSlotPicker from "../../components/Apply/TimeSlotPicker";
import styled from "styled-components";
import FormLayout from "../../components/Apply/FormLayout";

const SelectServiceDate = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleNext = () => {
    if (!selectedDate || !selectedTime) return;
    navigate("/additionalrequest", { state: { selectedDate, selectedTime } });
  };

  return (
    <FormLayout
      title="서비스 희망 날짜 선택"
      subtitle="원하시는 서비스 날짜를 선택해주세요."
      onNext={handleNext}
    >
      <InfoText>오늘 날짜로부터 2일 이후부터 예약이 가능합니다.</InfoText>
      <Container>
        <DateBox>
          <CalendarPicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </DateBox>

        <TimeBox>
          <TimeSlotPicker
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </TimeBox>
      </Container>
    </FormLayout>
  );
};

export default SelectServiceDate;

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
`;

const DateBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const TimeBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  color: white;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
`;
