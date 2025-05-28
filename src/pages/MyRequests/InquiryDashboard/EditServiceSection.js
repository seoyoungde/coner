import React from "react";
import CalendarPicker from "../../../components/Apply/CalendarPicker";
import TimeSlotPicker from "../../../components/Apply/TimeSlotPicker";
import DropdownSelector from "../../../components/Apply/DropdownSelector";
import { GrApps, GrUserSettings, GrBookmark } from "react-icons/gr";
import styled from "styled-components";
import { device } from "../../../styles/theme";

const EditServiceSection = (props) => {
  const {
    isEditing,
    selectedHopeDate,
    setSelectedHopeDate,
    selectedHopeTime,
    setSelectedHopeTime,
    selectedService,
    setSelectedService,
    selectedBrand,
    setSelectedBrand,
    selectedType,
    setSelectedType,
    isTypeOpen,
    setIsTypeOpen,
    isServiceOpen,
    setIsServiceOpen,
    isBrandOpen,
    setIsBrandOpen,
  } = props;

  return (
    <>
      <Section>
        <Label>방문 희망 일자</Label>
        {isEditing ? (
          <LabelBox>
            <CalendarPicker
              selectedDate={new Date(selectedHopeDate)}
              setSelectedDate={(date) => {
                const formattedDate = date.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
                setSelectedHopeDate(formattedDate);
              }}
            />
          </LabelBox>
        ) : (
          <Value>{selectedHopeDate || "없음"}</Value>
        )}
      </Section>

      <Section>
        <Label>방문 희망 시간</Label>
        {isEditing ? (
          <LabelBox>
            <TimeSlotPicker
              selectedTime={selectedHopeTime}
              setSelectedTime={setSelectedHopeTime}
            />
          </LabelBox>
        ) : (
          <Value>{selectedHopeTime || "없음"}</Value>
        )}
      </Section>

      <Section>
        <Label>서비스받을에어컨종류</Label>
        {isEditing ? (
          <DropdownSelector
            title="에어컨 종류 선택하기"
            icon={<GrApps size="18" />}
            options={["벽걸이형", "스탠드형", "천장형", "창문형", "항온항습기"]}
            selected={selectedType}
            setSelected={setSelectedType}
            isOpen={isTypeOpen}
            setIsOpen={setIsTypeOpen}
            optionWidths={["90px", "90px", "90px", "90px", "110px"]}
          />
        ) : (
          <Value>{selectedType || "없음"}</Value>
        )}
      </Section>

      <Section>
        <Label>원하는서비스</Label>
        {isEditing ? (
          <DropdownSelector
            title={selectedService}
            icon={<GrUserSettings size="18" />}
            options={[
              "설치",
              "점검",
              "청소",
              "수리",
              "냉매 충전",
              "이전",
              "철거",
            ]}
            selected={selectedService}
            setSelected={setSelectedService}
            isOpen={isServiceOpen}
            setIsOpen={setIsServiceOpen}
            optionWidths={[
              "70px",
              "70px",
              "70px",
              "70px",
              "90px",
              "70px",
              "70px",
            ]}
            disabled
          />
        ) : (
          <Value>{selectedService || "없음"}</Value>
        )}
      </Section>

      <Section>
        <Label>브랜드</Label>
        {isEditing ? (
          <DropdownSelector
            title="브랜드 선택하기"
            icon={<GrBookmark size="18" />}
            options={[
              "삼성전자",
              "LG전자",
              "캐리어",
              "센추리",
              "귀뚜라미",
              "SK매직",
              "기타(추천 또는 모름)",
            ]}
            selected={selectedBrand}
            setSelected={setSelectedBrand}
            isOpen={isBrandOpen}
            setIsOpen={setIsBrandOpen}
            optionWidths={[
              "100px",
              "90px",
              "90px",
              "90px",
              "100px",
              "100px",
              "150px",
            ]}
          />
        ) : (
          <Value>{selectedBrand || "없음"}</Value>
        )}
      </Section>
    </>
  );
};

export default EditServiceSection;

const LabelBox = styled.div`
  width: 100%;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  background: white;
  padding: 20px 10px 30px 20px;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  margin-bottom: 5px;
  @media ${device.mobile} {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;
const Value = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  @media ${device.mobile} {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 15px;
    margin-top: 5px;
  }
`;
