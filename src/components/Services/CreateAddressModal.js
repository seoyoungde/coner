import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { IoIosArrowBack } from "react-icons/io";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";

const SERVICE_AREAS = [
  "서울 강북구",
  "서울 광진구",
  "서울 노원구",
  "서울 도봉구",
  "서울 동대문구",
  "서울 성북구",
  "서울 종로구",
  "서울 중랑구",
];

const CreateAddressModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scale, height, ref } = useScaleLayout();
  const [popupMessage, setPopupMessage] = useState("");
  const [postcodeKey, setPostcodeKey] = useState(0);

  const handleAddressSelect = (data) => {
    const selectedAddress = data.address;
    const isServiceArea = SERVICE_AREAS.some((area) =>
      selectedAddress.includes(area)
    );
    if (!isServiceArea) {
      setPopupMessage(
        "해당 지역은 서비스 제공이 불가능합니다. 다른 주소를 선택해주세요."
      );
      setTimeout(() => {
        setPostcodeKey((prev) => prev + 1);
      }, 0);
    } else {
      const prevPath = location.state?.prevPath || "/";
      navigate(prevPath, {
        state: {
          ...location.state,
          selectedAddress,
        },
      });
    }
  };

  const handleClosePopup = () => {
    setPopupMessage("");
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
          <BackButton
            onClick={() => navigate(-1, { state: { address: "선택한주소" } })}
          >
            <BackIcon />
          </BackButton>
        </Header>
        <PostcodeWrapper>
          <DaumPostcode
            key={postcodeKey}
            onComplete={handleAddressSelect}
            style={{
              width: "100%",
              height: "800px",
              transform: window.innerWidth <= 500 ? "scale(1.3)" : "scale(1)",
              transformOrigin: "top center",
            }}
          />

          {popupMessage && (
            <Popup>
              <PopupContent>
                <PopupMessage>{popupMessage}</PopupMessage>
                <CloseButton onClick={handleClosePopup}>닫기</CloseButton>
              </PopupContent>
            </Popup>
          )}
        </PostcodeWrapper>
      </Container>
    </ScaleWrapper>
  );
};

const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
`;

const PostcodeWrapper = styled.div`
  width: 100%;
  position: relative;
  flex: 1;
  min-height: 600px;

  @media ${device.mobile} {
    width: 73%;
    margin: auto;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;

  @media ${device.mobile} {
    font-size: 50px;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const PopupMessage = styled.p`
  font-size: 15px;
  padding: 30px 30px 70px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;
`;

export default CreateAddressModal;
