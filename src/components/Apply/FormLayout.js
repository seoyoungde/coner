import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

const FormLayout = ({ title, subtitle, children, onNext }) => {
  return (
    <Container>
      <TitleSection>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleSection>
      <Content>{children}</Content>
      {onNext && <NextButton onClick={onNext}>다음으로</NextButton>}
    </Container>
  );
};

export default FormLayout;

const Container = styled.div`
  text-align: center;
  width: 100%;
  @media ${device.mobile} {
    margin: auto;
  }
`;

const TitleSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.mediumlarge};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: white;
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  @media ${device.mobile} {
    height: 60px;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;
