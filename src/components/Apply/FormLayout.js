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
  padding: 20px;
  text-align: center;
  width: 100%;
  @media ${device.mobile} {
    width: 92%;
    margin: auto;
  }
`;

const TitleSection = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: 1.4rem;
    font-weight: 500;
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
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: white;
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
  }
`;
