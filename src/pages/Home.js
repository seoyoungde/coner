import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import ServicesType from "../components/Homesections/ServicesType";
import Services from "../components/Homesections/Services";
import InfoCards from "../components/Homesections/InfoCards";

const Home = () => {
  return (
    <Container>
      <HeaderBox>
        <Header />
      </HeaderBox>
      <img src="../banner.jpg" alt="Coner 로고" />
      <MainServiceTap>
        <Services />
        <ServicesType />
        {/* <InfoCards /> */}
      </MainServiceTap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
const HeaderBox = styled.div`
  position: sticky;
  top: 0;
  z-index: 100; /* 배너나 다른 요소 위에 올라오게 */
  background-color: #ffffff;
  padding-top: 20px;
  padding-bottom: 10px;
`;

export default Home;
