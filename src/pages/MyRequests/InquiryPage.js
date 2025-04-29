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
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const InquiryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scale, height, ref } = useScaleLayout();
  const requestId = location.state?.requestId;
  const [clientId, setClientId] = useState(location.state?.clientId || null);
  const clientPhone = location.state?.clientPhone;
  const statusFilter = location.state?.status || null;
  const [user, setUser] = useState(null);

  const [requestDataList, setRequestDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("progress");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!clientId && currentUser) {
        setClientId(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRequestByClient = async () => {
    setLoading(true);
    let requests = new Map();

    try {
      if (requestId) {
        const docRef = doc(db, "testservice", requestId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          requests.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
        }
      }
      if (clientId) {
        const q = query(
          collection(db, "testservice"),
          where("clientId", "==", clientId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (!requests.has(doc.id)) {
            requests.set(doc.id, { id: doc.id, ...doc.data() });
          }
        });
      }
      if (clientPhone) {
        const q = query(
          collection(db, "testservice"),
          // where("clientId", "==", clientId),
          where("clientPhone", "==", clientPhone)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            if (!requests.has(doc.id)) {
              requests.set(doc.id, { id: doc.id, ...doc.data() });
            }
          });
        }
      }
      const queryConditions = [];
      if (clientId) {
        queryConditions.push(where("clientId", "==", clientId));
      } else if (clientPhone) {
        queryConditions.push(where("clientPhone", "==", clientPhone));
      }

      if (queryConditions.length > 0) {
        const q = query(collection(db, "testservice"), ...queryConditions);
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          if (!requests.has(doc.id)) {
            requests.set(doc.id, { id: doc.id, ...doc.data() });
          }
        });
      }
    } catch (error) {
      console.error("Firestore에서 데이터 조회 중 오류 발생:", error);
    }

    setRequestDataList(Array.from(requests.values()));
    setLoading(false);
  };

  useEffect(() => {
    fetchRequestByClient();

    if (statusFilter === 4) {
      setActiveTab("completed");
    } else {
      setActiveTab("progress");
    }
  }, [requestId, clientPhone, clientId, statusFilter]);

  const handleGoBack = () => {
    navigate("/requests");
  };

  const completedRequests = requestDataList.filter((req) => req.state === 4);
  const inProgressRequests = requestDataList.filter((req) => req.state < 4);

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <Header>
          <InnerWrapper>
            <BackButton onClick={handleGoBack}>
              <BackIcon>
                <IoIosArrowBack size={32} color="#333" />
              </BackIcon>
            </BackButton>

            <Title>고객님의 의뢰서</Title>
            <Spacer />
          </InnerWrapper>
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
    </ScaleWrapper>
  );
};

export default InquiryPage;
const ScaleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  @media ${device.mobile} {
    width: 92%;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;
  @media ${device.mobile} {
    width: 95%;
  }
`;
const Spacer = styled.div`
  width: 22px;
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
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:50px;
`;
const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText || "16px"};
  font-weight: ${({ theme }) => theme.fonts.weights.bold || 600};
  margin: 0;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
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
  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

const TabContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CenteredContent = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;
