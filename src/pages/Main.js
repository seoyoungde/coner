import React, { useEffect, useState, useRef } from "react";
import Nav from "../components/layout/Nav";
import Home from "./Home";
import Requests from "./MyRequests/Requests";
import MyPage from "./MyPage/MyPage";
import styled from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import * as firebaseAuth from "firebase/auth";
import { auth } from "../firebase";
import InstallPage from "../pages/ServicesPage/InstallPage";
import InstallPage2 from "../pages/ServicesPage/InstallPage2";
import InquiryPage from "../pages/MyRequests/InquiryPage";
import CompletedRequests from "../pages/MyRequests/CompletedRequests";
import RequestSearch from "../pages/MyRequests/RequestSearch";
import RequestBasicInfo from "./ApplyPage/RequestBasicInfo";
import SelectServiceDate from "./ApplyPage/SelectServiceDate";
import AdditionalRequest from "./ApplyPage/AdditionalRequest";
import AddressModal from "../components/Services/AddressModal";
import Header from "../components/layout/Header";
import LoginPage from "./Login/LoginPage";
import CreatAcount from "./Login/CreatAcount";
import InfoModify from "./MyPage/InfoModify";
import Withdraw from "./MyPage/Withdraw";
import PricingPage from "./PricingPage";
import AddressPage from "./ServicesPage/AddressPage";
import AddressForm from "../components/Services/AddressForm";
import CreateAddressModal from "../components/Services/CreateAddressModal";
import mainimage2Icon from "../assets/images/home/mainimage2.jpg";
import InfoModifyAddressModal from "../components/Services/InfoModifyAddressModal";

const headerMap = {
  "/": <Header />,
};

const Main = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const location = useLocation();
  const headerComponent = headerMap[location.pathname] || null;
  const [showScrollbar, setShowScrollbar] = useState(false);
  const scrollRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

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
      case "/addresspage":
        return "#ffffff";
      case "/install":
        return "#ffffff";
      case "/installpage2":
        return "#ffffff";
      case "/inquirydashboard":
        return "#ffffff";
      case "/selectservicedate":
        return "#ffffff";
      case "/requestbasicinfo":
        return "#ffffff";
      case "/additionalrequest":
        return "#ffffff";
      case "/loginpage":
        return "#ffffff";
      case "/createacount":
        return "#ffffff";
      case "/infomodify":
        return "#ffffff";
      case "/withdraw":
        return "#ffffff";
      case "/pricing":
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
    "/install",
    "/installpage2",
    "/requestbasicinfo",
    "/additionalrequest",
    "/selectservicedate",
    "/addressmodal",
    "/createacount",
    "/idsearch",
    "/passwordsearch",
    "/infomodify",
    "/withdraw",
    "/pricing",
    "/createaddressmodal",
    "/infomodifyaddressmodal",
  ];
  return (
    <Container style={{ height: `${windowHeight}px` }}>
      {/* 왼쪽 민트색 박스 */}
      <ImageBox>
        <img src={mainimage2Icon} alt="Coner 로고" />
      </ImageBox>
      {/* 오른쪽 콘텐츠 박스 */}
      <ContentBox $backgroundColor={getBackgroundColor(location.pathname)}>
        {headerComponent && <HeaderBox>{headerComponent}</HeaderBox>}
        <MainContent
          ref={scrollRef}
          className={showScrollbar ? "show-scrollbar" : ""}
        >
          <Routes>
            <Route path="/install" element={<InstallPage />} />
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
            <Route path="/loginpage" element={<LoginPage />}></Route>
            <Route path="/createacount" element={<CreatAcount />}></Route>
            <Route path="/infomodify" element={<InfoModify />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/addresspage" element={<AddressPage />}></Route>
            <Route path="/addressform" element={<AddressForm />} />
            <Route
              path="/createaddressmodal"
              element={<CreateAddressModal />}
            />
            <Route
              path="/infomodifyaddressmodal"
              element={<InfoModifyAddressModal />}
            />
          </Routes>
        </MainContent>

        {(location.pathname !== "/inquirydashboard" &&
          !hideNavPaths.includes(location.pathname)) ||
        (isLoggedIn && location.pathname === "/inquirydashboard") ? (
          <Nav />
        ) : null}
        <div id="popup-root" />
      </ContentBox>
      <HelmetProvider>
        <title>Coner - 냉난방기 예약</title>
        <meta name="description" content="쉽고 편리한 냉난방기 예약 서비스" />
        <meta
          name="keywords"
          content="냉난방기, 예약, 서비스, 청소, 설치, 수리"
        />
      </HelmetProvider>
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
  position: relative;
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

  /* 기본 상태: 스크롤바 투명 처리 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
`;

export default Main;
