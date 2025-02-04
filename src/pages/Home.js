import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import ServicesType from "../components/Homesections/ServicesType";
import Services from "../components/Homesections/Services";
import InfoCards from "../components/Homesections/InfoCards";

const Home = () => {
  return (
    <div>
      <HeaderBox>
        <Header />
      </HeaderBox>

      <MainServiceTap>
        <Services />

        <ServicesType />

        <InfoCards />
      </MainServiceTap>
    </div>
  );
};
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
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export default Home;
