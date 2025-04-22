import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { IoIosArrowBack } from "react-icons/io";

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

const AddressModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scale, setScale] = useState(1);
  const [popupMessage, setPopupMessage] = useState("");
  const [postcodeKey, setPostcodeKey] = useState(0);

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 500;
      const ratio = Math.min(window.innerWidth / baseWidth, 1);
      setScale(ratio);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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
      navigate(prevPath, { state: { selectedAddress } });
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
      }}
    >
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <IoIosArrowBack size={32} color="#333" />
          </BackButton>
        </Header>
        <PostcodeWrapper>
          <DaumPostcode
            key={postcodeKey}
            onComplete={handleAddressSelect}
            style={{ height: "100%" }}
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
  height: 100%;
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
  position: relative;
  flex: 1;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
export default AddressModal;
