import React from "react";
import styled from "styled-components";

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
`;

const TitleSection = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
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
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
`;
