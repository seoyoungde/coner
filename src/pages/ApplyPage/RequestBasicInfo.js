import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
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

const imageMap = {
  청소: require("../../assets/images/price/clean_inspection_price.png"),
  설치: require("../../assets/images/price/install_move_price.png"),
  이전: require("../../assets/images/price/install_move_price.png"),
  수리: require("../../assets/images/price/repair_price.png"),
  점검: require("../../assets/images/price/clean_inspection_price.png"),
  철거: require("../../assets/images/price/demolish_price.png"),
  냉매충전: require("../../assets/images/price/gas_price.png"),
};

const RequestBasicInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestData, updateRequestData } = useRequest();
  const { scale, height, ref } = useScaleLayout();

  const [searchParams] = useSearchParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  useEffect(() => {
    const restoredService =
      location.state?.selectedService || searchParams.get("service_type");

    if (restoredService && !requestData.service_type) {
      updateRequestData("service_type", restoredService);
    }
  }, [location.state, searchParams]);

  const handleNext = () => {
    const { service_type, aircon_type, brand } = requestData;
    if (!service_type || !aircon_type || !brand) {
      setIsPopupOpen(true);
      return;
    }
    navigate("/additionalrequest", {
      state: { service_type, aircon_type, brand },
    });
  };

  const priceKey = `${requestData.service_type}-${requestData.aircon_type}-${requestData.brand}`;

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
          <BackButton onClick={() => navigate("/selectservicedate")}>
            <BackIcon>
              <IoIosArrowBack size={32} color="#333" />
            </BackIcon>
          </BackButton>
        </Header>
        <InnerWrapper>
          <StepProgressBar currentStep={3} totalSteps={4} />
          <FormLayout
            title={`"의뢰서 기본 정보"- ${
              requestData.service_type || "서비스 미선택"
            }`}
            subtitle="희망 서비스와 에어컨 종류를 선택해주세요."
            onNext={handleNext}
          >
            <DropdownSelector
              title={requestData.service_type || "서비스 선택"}
              icon={<GrUserSettings />}
              options={[
                "청소",
                "설치",
                "이전",
                "수리",
                "철거",
                "냉매충전",
                "점검",
              ]}
              selected={requestData.service_type}
              setSelected={(value) => updateRequestData("service_type", value)}
              isOpen={false}
              setIsOpen={() => {}}
              optionWidths={["70px", "70px", "70px", "70px", "70px"]}
              disabled
            />

            <DropdownSelector
              title="에어컨 종류 선택하기"
              icon={<GrApps />}
              options={[
                "벽걸이형",
                "스탠드형",
                "천장형",
                "창문형",
                "항온항습기",
              ]}
              selected={requestData.aircon_type}
              setSelected={(value) => updateRequestData("aircon_type", value)}
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
              selected={requestData.brand}
              setSelected={(value) => updateRequestData("brand", value)}
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

            {requestData.service_type && imageMap[requestData.service_type] && (
              <ImageBox>
                <img
                  src={imageMap[requestData.service_type]}
                  alt={`${requestData.service_type} 이미지`}
                />
              </ImageBox>
            )}

            <StyledLink to="/pricing" state={{ from: "request-basic-info" }}>
              서비스비용이 궁금하신가요?
            </StyledLink>
            {isPopupOpen && (
              <Popup onClose={() => setIsPopupOpen(false)}>
                <PopupMessage>모든 옵션을 선택해주세요.</PopupMessage>
                <CloseButton onClick={() => setIsPopupOpen(false)}>
                  닫기
                </CloseButton>
              </Popup>
            )}
          </FormLayout>
        </InnerWrapper>
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
const InnerWrapper = styled.div`
  width: 95%;
  margin: auto;
  @media ${device.mobile} {
    width: 86%;
    margin: auto;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding-left: 20px;
  }
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:40px;
`;
const ImageBox = styled.div`
  margin-top: 10px;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;
const StyledLink = styled(Link)`
  margin-left: 30px;
  margin-bottom: 10px;
  color: #a0a0a0;
  font-size: ${({ theme }) => theme.fonts.sizes.small};

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
    font-weight: ${({ theme }) => theme.fonts.weights.smallmedium};
    margin-left: 20px;
  }
`;
