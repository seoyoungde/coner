import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarPicker from "../../components/Apply/CalendarPicker";
import TimeSlotPicker from "../../components/Apply/TimeSlotPicker";
import styled from "styled-components";
import FormLayout from "../../components/Apply/FormLayout";
import { GrFormCalendar } from "react-icons/gr";
import Popup from "../../components/Apply/Popup";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRequest } from "../../context/context";
import { IoIosArrowBack } from "react-icons/io";
import StepProgressBar from "../../components/Apply/StepProgressBar";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";

const SelectServiceDate = () => {
  const navigate = useNavigate();
  const { updateRequestData } = useRequest();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { scale, height, ref } = useScaleLayout();
  const { requestData } = useRequest();

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      setIsPopupOpen(true);
      return;
    }
    const formattedDate = selectedDate.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    updateRequestData("hopeDate", formattedDate);
    updateRequestData("hopeTime", selectedTime);
    navigate("/requestbasicinfo", {

      state: {
        selectedDate,
        selectedTime,
        selectedService: requestData.service,
      },

    });
  };

  const formatDate = (date) =>
    date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <Header>

          <BackButton onClick={() => navigate("/addresspage")}>

            <BackIcon>
              <IoIosArrowBack size={32} color="#333" />
            </BackIcon>
          </BackButton>
        </Header>
        <StepProgressBar currentStep={2} totalSteps={4} />

        <FormLayout
          title="서비스 희망 날짜 선택"
          subtitle="원하시는 서비스 날짜를 선택해주세요."
          onNext={handleNext}
        >
          <InfoText>오늘 날짜로부터 2일 이후부터 예약이 가능합니다.</InfoText>

          <DateBox>
            <SelectedContainer>
              <CalendarIcon>
                <GrFormCalendar />
              </CalendarIcon>
              <SelectedText>{formatDate(selectedDate)}</SelectedText>
            </SelectedContainer>
            <CalendarPicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </DateBox>
          <TimeBox>
            <SelectedContainer>
              <TimeIcon>
                <AiOutlineClockCircle />
              </TimeIcon>
              <SelectedText>
                {selectedTime || "시간을 선택해주세요"}
              </SelectedText>
            </SelectedContainer>
            <InfoText>선택하신 시간대 사이에 기사님이 방문해요</InfoText>
            <TimeSlotPicker
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </TimeBox>

          {isPopupOpen && (
            <Popup onClose={() => setIsPopupOpen(false)}>
              <PopupText>모든 옵션을 선택해주세요.</PopupText>
              <PopupButton onClick={() => setIsPopupOpen(false)}>
                닫기
              </PopupButton>
            </Popup>
          )}
        </FormLayout>
      </Container>
    </ScaleWrapper>
  );
};
export default SelectServiceDate;

const ScaleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 20px;
  padding-top: 10px;
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:50px;
`;
const InfoText = styled.p`
  font-size: 14px;
  color: #888;
  @media ${device.mobile} {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

const DateBox = styled.div`
  background: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
`;

const TimeBox = styled.div`
  background: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
`;
const TimeIcon = styled(AiOutlineClockCircle)`
  font-size: 1.3rem;
  @media ${device.mobile} {
    font-size: 2.1rem;
  }
`;
const CalendarIcon = styled(GrFormCalendar)`
  font-size: 1.8rem;
  @media ${device.mobile} {
    font-size: 3rem;
  }
`;
const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const SelectedText = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #333;
  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

const PopupText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
  margin-top: 40px;
  padding: 30px 50px 30px 50px;
`;

const PopupButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 0px 0px 8px 8px;
  font-size: 16px;
  font-weight: bold;
  background: #00e6fd;
  color: white;
  cursor: pointer;
`;
