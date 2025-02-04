import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../../components/Apply/FormLayout";
import DropdownSelector from "../../components/Apply/DropdownSelector";
import styled from "styled-components";

const RequestBasicInfo = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleNext = () => {
    if (!selectedService || !selectedType || !selectedBrand) {
      setIsPopupOpen(true);
      return;
    }
    navigate("/selectservicedate", {
      state: { selectedService, selectedType, selectedBrand },
    });
  };

  return (
    <FormLayout
      title="의뢰서 기본 정보"
      subtitle="희망 서비스와 에어컨 종류를 선택해주세요."
      onNext={handleNext}
    >
      <DropdownSelector
        title="청소"
        options={["청소", "설치", "이전", "수리", "철거"]}
        selected={selectedService}
        setSelected={setSelectedService}
        isOpen={isServiceOpen}
        setIsOpen={setIsServiceOpen}
        optionWidths={["70px", "70px", "70px", "70px", "70px"]}
      />

      <DropdownSelector
        title="에어컨 종류 선택하기"
        options={["벽걸이형", "스탠드형", "천장형", "창문형", "항온항습기"]}
        selected={selectedType}
        setSelected={setSelectedType}
        isOpen={isTypeOpen}
        setIsOpen={setIsTypeOpen}
        optionWidths={["90px", "90px", "90px", "90px", "110px"]}
      />

      <DropdownSelector
        title="브랜드 선택하기"
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

      {isPopupOpen && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>모든 옵션을 선택해주세요.</PopupText>
            <PopupButton onClick={() => setIsPopupOpen(false)}>
              닫기
            </PopupButton>
          </PopupContainer>
        </PopupOverlay>
      )}
    </FormLayout>
  );
};

export default RequestBasicInfo;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 10px;
  text-align: center;
  width: 280px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const PopupText = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  margin-bottom: 40px;
  margin-top: 40px;
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
