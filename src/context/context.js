import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requestData, setRequestData] = useState({
    id: "", // 데이터베이스 문서 ID
    service: "", // 서비스 유형 (청소, 설치, 이전, 수리, 철거)
    aircon: "", // 에어컨 유형
    brand: "", // 브랜드

    clientId: "", // 고객 ID (이름)
    clientPhone: "", // 고객 전화번호
    clientAddress: "", // 고객 주소
    clientDetailedAddress: "", // 고객 상세주소

    companyId: "", // 회사 ID
    companyName: "", // 회사 이름
    companyAddress: "", // 회사 주소
    companyDetailedAddress: "", // 회사 상세주소
    engineerId: "", // 기사 ID
    engineerName: "", // 기사 이름
    engineerPhone: "", // 기사 전화번호
    engineerProfileImage: "", // 기사 프로필 이미지

    hopeDate: "", // 희망 날짜
    hopeTime: "", // 희망 시간

    acceptanceDate: "", // 접수 날짜
    applicationDate: "", // 신청(의뢰한) 날짜
    completionDate: "", // 완료 날짜

    detailInfo: "", // 추가 요청 사항

    memo: "", // 메모
    price: "", // 가격 정보

    state: 1, // 상태값

    requestImageList: [], // 요청 이미지 리스트
    review: "", // 리뷰
  });

  // 단계별로 입력한 데이터를 저장하는 함수
  const updateRequestData = (key, value) => {
    setRequestData((prev) => ({ ...prev, [key]: value }));
  };

  // Firestore에서 의뢰서 조회 함수
  const fetchRequestByClient = async (clientPhone) => {
    try {
      const q = query(
        collection(db, "testservice"),
        where("clientPhone", "==", clientPhone)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else {
        console.log("❌ 일치하는 의뢰서를 찾을 수 없습니다.");
        return [];
      }
    } catch (error) {
      console.error("❌ Firestore에서 데이터 조회 중 오류 발생:", error);
      return [];
    }
  };

  const setRequestState = (newState) => {
    if (![1, 2, 3, 4].includes(newState)) {
      console.error("잘못된 상태 값입니다. (1~4만 허용)");
      return;
    }
    setRequestData((prev) => ({ ...prev, state: newState }));
  };

  // Firestore에 데이터 저장하는 함수
  const submitRequest = async (updatedRequestData) => {
    if (!updatedRequestData || !updatedRequestData.service) {
      console.error(
        "submitRequest: requestData가 비어 있습니다.",
        updatedRequestData
      );
      return;
    }

    try {
      console.log("📝 Firestore 저장 데이터:", updatedRequestData);

      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      const newDocRef = doc(collection(db, "testservice"));
      await setDoc(newDocRef, {
        ...updatedRequestData,
        id: newDocRef.id,
        applicationDate: formattedDate,
      });

      console.log("✅ 의뢰서 Firestore 저장 완료:", newDocRef.id);
      return newDocRef.id;
    } catch (error) {
      console.error("❌ Firestore 저장 중 오류 발생:", error);
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requestData,
        updateRequestData,
        fetchRequestByClient,
        submitRequest,
        setRequestState,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => useContext(RequestContext);
