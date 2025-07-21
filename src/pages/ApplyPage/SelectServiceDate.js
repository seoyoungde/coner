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
  const [isDateTouched, setIsDateTouched] = useState(false);

  const disabledDates = [
    // new Date(2025, 5, 14),
    // new Date(2025, 5, 15),
    // new Date(2025, 5, 17),
    // new Date(2025, 5, 18),
    // new Date(2025, 5, 21),
    // new Date(2025, 5, 24),
    // new Date(2025, 5, 25),
    // new Date(2025, 5, 26),
    // new Date(2025, 5, 27),
    // new Date(2025, 5, 28),
    // new Date(2025, 5, 29),
  ];
  const handleNext = () => {
    if (!isDateTouched) {
      setIsPopupOpen(true);
      return;
    }
    const formattedDate = formatDate(selectedDate);

    updateRequestData("service_date", formattedDate);
    updateRequestData("service_time", selectedTime);
    navigate("/requestbasicinfo", {
      state: {
        selectedDate,
        selectedTime,
        selectedService: requestData.service_type,
      },
    });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };

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
        <InnerWrapper>
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
                setSelectedDate={(date) => {
                  setSelectedDate(date);
                  setIsDateTouched(true);
                }}
                excludeDates={disabledDates}
              />
            </DateBox>

            <InfoText2>
              <strong />
              안내드립니다 <br />
              현재 LG U+ 프로젝트 진행으로 인해 일부 일정에 변동이 생길 수
              있습니다.
              <br />
              최상의 서비스 제공을 위해 조율이 필요한 점 너른 양해 부탁드립니다.
              <br />더 나은 일정으로 찾아뵐 수 있도록 최선을
              다하겠습니다.감사합니다.
            </InfoText2>
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
          </FormLayout>
        </InnerWrapper>
        {isPopupOpen && (
          <Popup onClose={() => setIsPopupOpen(false)}>
            <PopupMessage>날짜를 선택해주세요.</PopupMessage>
            <CloseButton onClick={() => setIsPopupOpen(false)}>
              닫기
            </CloseButton>
          </Popup>
        )}
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
const InnerWrapper = styled.div`
  width: 95%;
  margin: auto;
  @media ${device.mobile} {
    width: 86%;
    margin: auto;
  }
`;
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
  @media ${device.mobile} {
    padding-left: 20px;
  }
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:40px;
`;
const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: #888;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    margin-bottom: 14px;
  }
`;
const InfoText2 = styled.p`
  text-align: left;
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: #888;
  margin-bottom: 16px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
  }
`;

const DateBox = styled.div`
  background: white;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
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
  margin-top: 10px;
  border: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;
`;
const TimeIcon = styled(AiOutlineClockCircle)`
  font-size: 1.3rem;
  @media ${device.mobile} {
    font-size: 24px;
  }
`;
const CalendarIcon = styled(GrFormCalendar)`
  font-size: 1.8rem;
  @media ${device.mobile} {
    font-size: 2rem;
  }
`;
const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const SelectedText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  color: #333;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
  }
`;

const PopupMessage = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  padding: 30px 30px 50px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    padding: 30px 10px 20px 20px;
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    padding: 15px;
  }
`;
