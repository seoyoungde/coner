import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormLayout = ({ title, subtitle, children, onNext }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={32} color="#333" />
        </BackButton>
      </Header>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const TitleSection = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-top: 5px;
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
  margin-top: 30px;
`;
