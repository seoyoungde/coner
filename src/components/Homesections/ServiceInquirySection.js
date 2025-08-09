import React, { useState } from "react";
import styled from "styled-components";
import { FaPhoneAlt, FaCommentDots, FaDollarSign } from "react-icons/fa";
import { device } from "../../styles/theme";

const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const ServiceInquirySection = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePhoneClick = (e) => {
    e.preventDefault();
    if (isMobileDevice()) {
      window.location.href = "tel:010-5543-0636";
    } else {
      setShowPopup(true);
    }
  };

  return (
    <Section>
      <Title>서비스 안내</Title>
      <Description>
        궁금한 점이 있으신가요? 지금 전화 또는 온라인으로 편하게 문의해 주세요!
      </Description>

      <Grid>
        <Card href="tel:010-5543-0636" onClick={handlePhoneClick}>
          <Label>전화 신청 및 상담</Label>
          <IconWrapper color="#007bff">
            <FaPhoneAlt />
          </IconWrapper>
        </Card>

        <Card
          href="https://talk.naver.com/ct/w7a8bh2#nafullscreen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Label>네이버 톡톡 상담</Label>
          <IconWrapper color="#03c75a">
            <FaCommentDots />
          </IconWrapper>
        </Card>

        <Card href="/pricing">
          <Label>서비스별 가격</Label>
          <IconWrapper color="#ff9900">
            <FaDollarSign />
          </IconWrapper>
        </Card>
      </Grid>

      {showPopup && (
        <PopupOverlay onClick={() => setShowPopup(false)}>
          <PopupBox onClick={(e) => e.stopPropagation()}>
            <PhoneTitle>전화 상담 안내</PhoneTitle>
            <PhoneText>010-5543-0636</PhoneText>
            <CloseButton onClick={() => setShowPopup(false)}>닫기</CloseButton>
          </PopupBox>
        </PopupOverlay>
      )}
    </Section>
  );
};

export default ServiceInquirySection;

// ----------- Styled Components -----------

const Section = styled.section`
  width: 100%;
  background-color: #ffffff;
`;

const Title = styled.h2`
  margin-left: 42px;
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  @media ${device.mobile} {
    font-size: 26px;
    padding-left: 10px;
    padding-right: 20px;
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.subtext};
  margin: 6px 0px 42px 42px;

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding-left: 10px;
    padding-right: 38px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  width: 520px;
  max-width: 600px;
  margin: 0 auto;

  @media ${device.mobile} {
    width: 460px;
  }
`;

const Card = styled.a`
  position: relative;
  display: block;
  padding: 16px;
  height: 100px;
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: left;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s;
  background: #fff;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 24px;
  color: ${({ color }) => color || "#000"};
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 605px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupBox = styled.div`
  background: #fff;
  padding: 20px 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  max-width: 280px;
  width: 80%;
  border: 1px solid #d6d6d6;
`;

const PhoneTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: 600;
`;

const PhoneText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 24px;
`;

const CloseButton = styled.button`
  padding: 6px 16px;
  background-color: #007bff;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #005bb5;
  }
`;
