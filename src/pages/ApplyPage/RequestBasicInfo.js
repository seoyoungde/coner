import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../../components/Apply/FormLayout";
import DropdownSelector from "../../components/Apply/DropdownSelector";
import styled from "styled-components";
import { GrApps, GrUserSettings, GrBookmark } from "react-icons/gr";
import Popup from "../../components/Apply/Popup";

const RequestBasicInfo = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

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
        icon={<GrUserSettings size="18" />}
        options={["청소", "설치", "이전", "수리", "철거"]}
        selected={selectedService}
        setSelected={setSelectedService}
        isOpen={isServiceOpen}
        setIsOpen={setIsServiceOpen}
        optionWidths={["70px", "70px", "70px", "70px", "70px"]}
      />

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

      {isPopupOpen && (
        <Popup onClose={() => setIsPopupOpen(false)}>
          <PopupText>모든 옵션을 선택해주세요.</PopupText>
          <PopupButton onClick={() => setIsPopupOpen(false)}>닫기</PopupButton>
        </Popup>
      )}
    </FormLayout>
  );
};

export default RequestBasicInfo;

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
