import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import CompletedRequests from "../MyRequests/CompletedRequests";
import RequestReceived from "../MyRequests/InquiryDashboard/RequestReceived";

const InquiryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, phoneNumber } = location.state || {
    name: "사용자",
    phoneNumber: "",
  };

  const [activeTab, setActiveTab] = useState("progress");

  const validData = { name: "박서영", phoneNumber: "01090395572" };
  const isValid =
    name === validData.name && phoneNumber === validData.phoneNumber;

  const handleGoBack = () => {
    navigate("/requests");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleGoBack}>
          <IoIosArrowBack size={32} color="#333" />
        </BackButton>
        <Title>{name} 님의 의뢰서</Title>
      </Header>
      <TabHeader>
        <Tab
          isActive={activeTab === "progress"}
          onClick={() => setActiveTab("progress")}
        >
          진행중인
        </Tab>
        <Tab
          isActive={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          완료된
        </Tab>
      </TabHeader>
      <TabContent>
        {activeTab === "progress" ? (
          isValid ? (
            <RequestReceived />
          ) : (
            <>
              <CenteredContent>
                아직 진행중인 의뢰가 없습니다
                <RequestApplyButton>의뢰하기</RequestApplyButton>
              </CenteredContent>
            </>
          )
        ) : isValid ? (
          <CompletedRequests />
        ) : (
          <CenteredContent>아직 완료된 의뢰가 없습니다</CenteredContent>
        )}
      </TabContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  margin: auto;
  height: 100%;
`;

const Header = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: auto;
  font-size: 20px;
  font-weight: bold;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
`;

const Tab = styled.button`
  flex: 1;
  padding: 15px 0;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  color: ${({ isActive }) => (isActive ? "#00e6fd" : "#333")};
  text-align: center;
  position: relative;
  border: none;
  background: none;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ isActive }) => (isActive ? "100%" : "0")};
    height: 2px;
    background-color: ${({ isActive }) =>
      isActive ? "#00e6fd" : "transparent"};
    transition: width 0.3s ease;
  }
`;

const TabContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ isCentered }) =>
    isCentered ? "center" : "flex-start"};
  padding: 20px;
`;

const CenteredContent = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;
const RequestApplyButton = styled.button`
  padding: 15px;
  border-radius: 10px;
  border: none;
  width: 120px;
  font-size: 16px;
  margin-top: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: white;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  cursor: pointer;
`;
export default InquiryPage;
