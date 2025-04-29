import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormLayout from "../../components/Apply/FormLayout";
import DropdownSelector from "../../components/Apply/DropdownSelector";
import styled from "styled-components";
import { GrApps, GrUserSettings, GrBookmark } from "react-icons/gr";
import Popup from "../../components/Apply/Popup";
import { useRequest } from "../../context/context";
import StepProgressBar from "../../components/Apply/StepProgressBar";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";

const RequestBasicInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestData, updateRequestData } = useRequest();
  const { scale, height, ref } = useScaleLayout();
  const [selectedService, setSelectedService] = useState(
    requestData.service || location.state?.selectedService
  );
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  useEffect(() => {
    if (selectedService) {
      updateRequestData("service", selectedService);
    }
  }, [selectedService]);

  const handleNext = () => {
    if (!selectedService || !selectedType || !selectedBrand) {
      setIsPopupOpen(true);
      return;
    }
    updateRequestData("service", selectedService);
    updateRequestData("aircon", selectedType);
    updateRequestData("brand", selectedBrand);

    navigate("/additionalrequest");
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
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon>
              <IoIosArrowBack size={32} color="#333" />
            </BackIcon>
          </BackButton>
        </Header>
        <StepProgressBar currentStep={3} totalSteps={4} />
        <FormLayout
          title={`"의뢰서 기본 정보"- ${selectedService || "서비스 미선택"}`}
          subtitle="희망 서비스와 에어컨 종류를 선택해주세요."
          onNext={handleNext}
        >
          <DropdownSelector
            title={selectedService}
            icon={<GrUserSettings />}
            options={["청소", "설치", "이전", "수리", "철거"]}
            selected={selectedService}
            setSelected={setSelectedService}
            isOpen={false}
            setIsOpen={setIsServiceOpen}
            optionWidths={["70px", "70px", "70px", "70px", "70px"]}
            disabled
          />

          <DropdownSelector
            title="에어컨 종류 선택하기"
            icon={<GrApps />}
            options={["벽걸이형", "스탠드형", "천장형", "창문형", "항온항습기"]}
            selected={selectedType}
            setSelected={setSelectedType}
            isOpen={isTypeOpen}
            setIsOpen={setIsTypeOpen}
            optionWidths={["90px", "90px", "90px", "90px", "110px"]}
          />

          <DropdownSelector
            title="브랜드 선택하기"
            icon={<GrBookmark />}
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

export default RequestBasicInfo;
const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
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
