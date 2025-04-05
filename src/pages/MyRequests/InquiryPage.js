import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import CompletedRequests from "../MyRequests/CompletedRequests";
import RequestReceived from "../MyRequests/InquiryDashboard/RequestReceived";

const InquiryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const requestId = location.state?.requestId;
  // const clientId = location.state?.clientId;
  const clientPhone = location.state?.clientPhone;

  const [requestDataList, setRequestDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("progress");

  const fetchRequestByClient = async () => {
    setLoading(true);
    let requests = new Map();

    try {
      // ✅ requestId가 있는 경우 단일 조회
      if (requestId) {
        const docRef = doc(db, "testservice", requestId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          requests.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
        }
      }

      //  clientPhone이 있을 경우 여러 개의 요청 조회
      if (clientPhone) {
        const q = query(
          collection(db, "testservice"),
          // where("clientId", "==", clientId),
          where("clientPhone", "==", clientPhone)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // 🔥 이미 Map에 존재하는 데이터인지 확인하고 추가
            if (!requests.has(doc.id)) {
              requests.set(doc.id, { id: doc.id, ...doc.data() });
            }
          });
        }
      }
    } catch (error) {
      console.error("❌ Firestore에서 데이터 조회 중 오류 발생:", error);
    }

    setRequestDataList(Array.from(requests.values()));
    setLoading(false);
  };

  useEffect(() => {
    fetchRequestByClient();
  }, [requestId, clientPhone]);

  const handleGoBack = () => {
    navigate("/requests");
  };

  // ✅ 진행 중인 의뢰와 완료된 의뢰 분리
  const completedRequests = requestDataList.filter((req) => req.state === 4);
  const inProgressRequests = requestDataList.filter((req) => req.state < 4);

  return (
    <Container>
      <Header>
        <BackButton onClick={handleGoBack}>
          <IoIosArrowBack size={32} color="#333" />
        </BackButton>
        <Title>고객님의 의뢰서</Title>
      </Header>

      <TabHeader>
        <Tab
          isActive={activeTab === "progress"}
          onClick={() => setActiveTab("progress")}
        >
          진행 중
        </Tab>
        <Tab
          isActive={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          완료된
        </Tab>
      </TabHeader>

      <TabContent>
        {loading ? (
          <CenteredContent>로딩 중...</CenteredContent>
        ) : activeTab === "progress" ? (
          inProgressRequests.length > 0 ? (
            inProgressRequests.map((req) => (
              <RequestReceived key={req.id} requestData={req} />
            ))
          ) : (
            <CenteredContent>아직 진행 중인 의뢰가 없습니다.</CenteredContent>
          )
        ) : completedRequests.length > 0 ? (
          completedRequests.map((req) => (
            <CompletedRequests key={req.id} requestData={req} />
          ))
        ) : (
          <CenteredContent>아직 완료된 의뢰가 없습니다.</CenteredContent>
        )}
      </TabContent>
    </Container>
  );
};

export default InquiryPage;

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
