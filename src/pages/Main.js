import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import ServicesType from "../components/sections/ServicesType";
import Services from "../components/sections/Services";
import InfoCards from "../components/sections/InfoCards";
import Nav from "../components/layout/Nav";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Main = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <Container style={{ height: `${windowHeight}px` }}>
      {/* 왼쪽 민트색 박스 */}
      <ImageBox>
        <img src="../mainimage.png" alt="Coner 로고" />
      </ImageBox>
      {/* 오른쪽 콘텐츠 박스 */}
      <ContentBox>
        <HeaderBox>
          <Header />
        </HeaderBox>

        <MainServiceTap>
          <Services />

          <ServicesType />

          <InfoCards />
        </MainServiceTap>

        <Nav />
      </ContentBox>
      <Helmet>
        <title>Coner - 냉난방기 예약</title>
        <meta name="description" content="쉽고 편리한 냉난방기 예약 서비스" />
        <meta
          name="keywords"
          content="냉난방기, 예약, 서비스, 청소, 설치, 수리"
        />
      </Helmet>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
  background-color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.family};

  @media (max-width: 1050px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const HeaderBox = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;

  img {
    width: 100%;

    @media (max-width: 1050px) {
      display: none;
    }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 605px;
  margin-left: 20px;
  border: 1px solid #d4d4d4;
  border-top: 0;
  border-bottom: 0;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);

  @media (max-width: 1050px) {
    margin-left: 0;
  }

  @media (max-width: 610px) {
    margin-left: 0;
    border: none;
    box-shadow: none;
    width: 610px;
  }
  @media (max-width: 580px) {
    margin-left: 0;
    border: none;
    box-shadow: none;
    width: 580px;
  }
`;

const MainServiceTap = styled.div`
  flex: 1;
  height: calc(100% - 95px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #c4c4c4 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export default Main;
