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
import * as firebaseAuth from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthProvider";

const InquiryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scale, height, ref } = useScaleLayout();
  const requestId = location.state?.requestId;
  const [customer_uid, setCustomerUid] = useState(
    location.state?.customer_uid || null
  );
  const customer_phone = location.state?.customer_phone;
  const statusFilter = location.state?.status || null;

  const [requestDataList, setRequestDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("progress");
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (currentUser) => {
      if (!customer_uid && currentUser) {
        setCustomerUid(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRequestByClient = async () => {
    setLoading(true);
    let requests = new Map();

    try {
      if (requestId) {
        const docRef = doc(db, "Request", requestId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          requests.set(docSnap.id, { id: docSnap.id, ...docSnap.data() });
        }
      }
      if (customer_uid) {
        const q = query(
          collection(db, "Request"),
          where("customer_uid", "==", customer_uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (!requests.has(doc.id)) {
            requests.set(doc.id, { id: doc.id, ...doc.data() });
          }
        });
      }
      if (customer_phone) {
        const q = query(
          collection(db, "Request"),
          where("customer_phone", "==", customer_phone)
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
      if (customer_uid) {
        queryConditions.push(where("customer_uid", "==", customer_uid));
      } else if (customer_phone) {
        queryConditions.push(where("customer_phone", "==", customer_phone));
      }

      if (queryConditions.length > 0) {
        const q = query(collection(db, "Request"), ...queryConditions);
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
  }, [requestId, customer_phone, customer_uid]);

  const handleGoBack = () => {
    navigate("/requests");
  };

  const handleRealtimeUpdate = (updatedRequest) => {
    setRequestDataList((prevList) => {
      const exists = prevList.some((r) => r.id === updatedRequest.id);
      if (!exists) return [...prevList, updatedRequest];
      return prevList.map((r) =>
        r.id === updatedRequest.id ? updatedRequest : r
      );
    });
  };

  const completedRequests = requestDataList.filter((req) => req.status >= 4);
  const inProgressRequests = requestDataList.filter((req) => req.status < 4);

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
            {!currentUser ? (
              <BackButton onClick={handleGoBack}>
                <BackIcon>
                  <IoIosArrowBack size={32} color="#333" />
                </BackIcon>
              </BackButton>
            ) : (
              <Spacer />
            )}

            <Title>고객님의 의뢰서</Title>
            <Spacer />
          </InnerWrapper>
        </Header>

        <TabHeader>
          <Tab
            $isActive={activeTab === "progress"}
            onClick={() => setActiveTab("progress")}
          >
            진행 중
          </Tab>
          <Tab
            $isActive={activeTab === "completed"}
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
                <RequestReceived
                  key={req.id}
                  requestData={req}
                  onRealtimeUpdate={handleRealtimeUpdate}
                  onDeleteRequest={(id) => {
                    setRequestDataList((prev) =>
                      prev.filter((r) => r.id !== id)
                    );
                  }}
                />
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
  margin-top: 40px;
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
  font-size:40px;
`;
const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText || "16px"};
  font-weight: ${({ theme }) => theme.fonts.weights.bold || 600};
  margin: 0;
  @media ${device.mobile} {
    font-size: 24px;
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
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  color: ${({ $isActive }) => ($isActive ? "#0080FF" : "#333")};
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
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background-color: ${({ $isActive }) =>
      $isActive ? "#0080FF" : "transparent"};
    transition: width 0.3s ease;
  }
  @media ${device.mobile} {
    font-size: 20px;
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
    font-size: 18px;
  }
`;
