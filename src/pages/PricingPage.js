import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useScaleLayout } from "../hooks/useScaleLayout";
import { IoIosArrowBack } from "react-icons/io";
import { device } from "../styles/theme";
import pricingchartIcon from "../assets/images/price/pricing-chart.png";
import pricingchartoptionsIcon from "../assets/images/price/pricing-chart-options.png";

const PricingPage = () => {
  const { scale, height, ref } = useScaleLayout();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const [showExtraImage, setShowExtraImage] = useState(false);

  const handleShowExtra = () => {
    if (!showExtraImage) setShowExtraImage(true);
  };
  const handleClose = () => {
    navigate("/requestbasicinfo", {
      state: { selectedService: location.state?.selectedService || "" },
    });
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
        <InnerWrapper>
          {from === "request-basic-info" ? (
            <CloseButton onClick={handleClose}>x</CloseButton>
          ) : (
            <BackButton onClick={() => navigate("/")}>
              <BackIcon>
                <IoIosArrowBack size={32} color="#333" />
              </BackIcon>
            </BackButton>
          )}
          <Spacer />
          <Title>서비스 비용 안내</Title>
          <Spacer />
        </InnerWrapper>

        <ImageWrapper>
          <img src={pricingchartIcon} alt="서비스 비용 도표" />
        </ImageWrapper>

        <ExtraButton onClick={handleShowExtra}>추가비용안내</ExtraButton>

        {showExtraImage && (
          <ImageWrapper>
            <img src={pricingchartoptionsIcon} alt="추가 비용 도표" />
          </ImageWrapper>
        )}
      </Container>
    </ScaleWrapper>
  );
};

export default PricingPage;

const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
  box-sizing: border-box;
  @media ${device.mobile} {
    width: 86%;
  }
`;
const Spacer = styled.div`
  width: 22px;
`;
const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.large};
  }
`;
const ImageWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
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
    font-size: 40px;
  }
`;

const ExtraButton = styled.button`
  background: none;
  border: none;
  color: #a0a0a0;
  font-size: 0.9rem;
  margin-left: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: underline;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  color: #a0a0a0;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  cursor: pointer;
  margin-left: 10px;
`;
