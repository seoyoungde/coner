import React, { useEffect, useState } from "react";
import Nav from "../components/layout/Nav";
import Home from "./Home";
import Requests from "./MyRequests/Requests";
import MyPage from "./MyPage/MyPage";
import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import CleanPage from "../pages/ServicesPage//CleanPage";
import InstallPage from "../pages/ServicesPage/InstallPage";
import MovePage from "../pages/ServicesPage/MovePage";
import RepairPage from "../pages/ServicesPage/RepairPage";
import DemolishPage from "../pages/ServicesPage/DemolishPage";
import InstallPage2 from "../pages/ServicesPage/InstallPage2";
import InquiryPage from "../pages/MyRequests/InquiryPage";
import CompletedRequests from "../pages/MyRequests/CompletedRequests";
import RequestSearch from "../pages/MyRequests/RequestSearch";
import RequestBasicInfo from "./ApplyPage/RequestBasicInfo";
import SelectServiceDate from "./ApplyPage/SelectServiceDate";
import AdditionalRequest from "./ApplyPage/AdditionalRequest";

const Main = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const location = useLocation();
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  const hideNavPaths = [
    "/clean",
    "/install",
    "/move",
    "/repair",
    "/demolish",
    "/installpage2",
    "/inquirydashboard",
    "/requestbasicinfo",
    "/additionalrequest",
    "/selectservicedate",
  ];
  return (
    <Container style={{ height: `${windowHeight}px` }}>
      {/* 왼쪽 민트색 박스 */}
      <ImageBox>
        <img src="../mainimage.png" alt="Coner 로고" />
      </ImageBox>
      {/* 오른쪽 콘텐츠 박스 */}
      <ContentBox>
        <MainContent>
          <Routes>
            <Route path="/clean" element={<CleanPage />} />
            <Route path="/install" element={<InstallPage />} />
            <Route path="/move" element={<MovePage />} />
            <Route path="/repair" element={<RepairPage />} />
            <Route path="/demolish" element={<DemolishPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/installpage2" element={<InstallPage2 />} />
            <Route path="/inquirydashboard" element={<InquiryPage />} />
            <Route path="/completedRequests" element={<CompletedRequests />} />
            <Route path="/requestsearch" element={<RequestSearch />} />
            <Route path="/requestbasicinfo" element={<RequestBasicInfo />} />
            <Route path="/selectservicedate" element={<SelectServiceDate />} />
            <Route path="/additionalrequest" element={<AdditionalRequest />} />
          </Routes>
        </MainContent>

        {!hideNavPaths.includes(location.pathname) && <Nav />}
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

const MainContent = styled.div`
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
