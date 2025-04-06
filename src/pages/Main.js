import React, { useEffect, useState, useRef } from "react";
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
import AddressModal from "../components/Services/AddressModal";
import Inspection from "./ServicesPage/Inspection";
import Charge from "./ServicesPage/Charge";
import Header from "../components/layout/Header";

const headerMap = {
  "/": <Header />,
};

const Main = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const location = useLocation();
  const headerComponent = headerMap[location.pathname] || null;
  const [showScrollbar, setShowScrollbar] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const handleScroll = () => {
      setShowScrollbar(true);
      clearTimeout(scrollContainer._scrollTimeout);
      scrollContainer._scrollTimeout = setTimeout(() => {
        setShowScrollbar(false);
      }, 1000);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getBackgroundColor = (pathname) => {
    switch (pathname) {
      case "/requests":
        return "#ffffff";
      case "/inspection":
        return "#ffffff";
      case "/clean":
        return "#ffffff";
      case "/install":
        return "#ffffff";
      case "/installpage2":
        return "#ffffff";
      case "/move":
        return "#ffffff";
      case "/charge":
        return "#ffffff";
      case "/repair":
        return "#ffffff";
      case "/demolish":
        return "#ffffff";
      case "/inquirydashboard":
        return "#ffffff";
      case "/selectservicedate":
        return "#ffffff";
      case "/requestbasicinfo":
        return "#ffffff";
      case "/additionalrequest":
        return "#ffffff";
      default:
        return "#f9f9f9";
    }
  };

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
    "/addressmodal",
    "/inspection",
    "/charge",
  ];
  return (
    <Container style={{ height: `${windowHeight}px` }}>
      {/* 왼쪽 민트색 박스 */}
      <ImageBox>
        <img src="../mainimage2.jpg" alt="Coner 로고" />
      </ImageBox>
      {/* 오른쪽 콘텐츠 박스 */}
      <ContentBox backgroundColor={getBackgroundColor(location.pathname)}>
        {headerComponent && <HeaderBox>{headerComponent}</HeaderBox>}
        <MainContent
          ref={scrollRef}
          className={showScrollbar ? "show-scrollbar" : ""}
        >
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
            <Route path="/addressmodal" element={<AddressModal />} />
            <Route path="/inspection" element={<Inspection />} />
            <Route path="/charge" element={<Charge />} />
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
const HeaderBox = styled.div`
  position: fixed;
  top: 0;
  width: 605px;
  z-index: 100;
  background: white;
  padding: 20px 0 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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
  background-color: ${({ backgroundColor }) => backgroundColor};
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
    width: 560px;
  }
  @media (max-width: 550px) {
    margin-left: 0;
    border: none;
    box-shadow: none;
    width: 520px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  height: calc(100% - 95px);
  overflow-y: scroll;
  position: relative;

  /* 🎯 핵심: 콘텐츠 위에 스크롤바를 겹쳐서 표시하고, 레이아웃은 안 바뀜 */
  scrollbar-gutter: stable overlay;

  /* 기본 상태: 스크롤바 투명 처리 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */

  &::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Hover 또는 스크롤 상태에서 스크롤바 표시 */
  &:hover::-webkit-scrollbar-thumb,
  &.show-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &.show-scrollbar {
    scrollbar-width: thin;
  }
`;

export default Main;
