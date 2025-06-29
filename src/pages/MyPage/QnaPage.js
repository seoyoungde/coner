import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Qna from "../../components/Homesections/Qna";
import { IoIosArrowBack } from "react-icons/io";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";

const QnaPage = () => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
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
          <Header>
            <BackButton onClick={() => navigate("/mypage")}>
              <BackIcon>
                <IoIosArrowBack size={32} color="#333" />
              </BackIcon>
            </BackButton>
            <Title>자주 묻는 질문</Title>
          </Header>
          <Qna />
        </InnerWrapper>
      </Container>
    </ScaleWrapper>
  );
};
export default QnaPage;

const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
`;
const InnerWrapper = styled.div`
  width: 95%;
  margin: auto;
  @media ${device.mobile} {
    width: 86%;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile} {
    font-size: 40px;
  }
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
  font-weight: ${({ theme }) => theme.fonts.weights.smallmedium};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.mediumlarge};
  }
`;
