import { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const RequestContext = createContext();

const initialRequestState = {
  id: "",
  service: "",
  aircon: "",
  brand: "",
  clientId: "",
  clientPhone: "",
  clientAddress: "",
  clientDetailedAddress: "",
  companyId: "",
  companyName: "",
  companyAddress: "",
  companyDetailedAddress: "",
  engineerId: "",
  engineerName: "",
  engineerPhone: "",
  engineerProfileImage: "",
  hopeDate: "",
  hopeTime: "",
  acceptanceDate: "",
  applicationDate: "",
  completionDate: "",
  detailInfo: "",
  memo: "",
  price: "",
  state: 1,
  requestImageList: [],
  review: "",
};

export const RequestProvider = ({ children }) => {
  const [requestData, setRequestData] = useState(initialRequestState);
  const allowedFields = [
    "acceptanceDate",
    "aircon",
    "applicationDate",
    "brand",
    "clientAddress",
    "clientDetailedAddress",
    "clientId",
    "clientPhone",
    "companyAddress",
    "companyDetailedAddress",
    "companyId",
    "companyName",
    "completionDate",
    "detailInfo",
    "engineerId",
    "engineerName",
    "engineerPhone",
    "engineerProfileImage",
    "hopeDate",
    "hopeTime",
    "memo",
    "price",
    "requestImageList",
    "review",
    "service",
    "state",
  ];
  const filterAllowedFields = (data) => {
    const filtered = {};
    allowedFields.forEach((key) => {
      if (key in data) filtered[key] = data[key];
    });
    return filtered;
  };

  const updateRequestData = (key, value) => {
    setRequestData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ 상태 초기화 함수
  const resetRequestData = () => {
    setRequestData(initialRequestState);
  };

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

  const submitRequest = async (updatedRequestData) => {
    if (!updatedRequestData || !updatedRequestData.service) {
      console.error(
        "submitRequest: requestData가 비어 있습니다.",
        updatedRequestData
      );
      return;
    }

    try {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      const newDocRef = doc(collection(db, "testservice"));
      const sanitizedData = {
        ...filterAllowedFields(updatedRequestData),
        id: newDocRef.id,
        applicationDate: formattedDate,
      };

      await setDoc(newDocRef, sanitizedData);

      console.log("✅ 의뢰서 Firestore 저장 완료:", newDocRef.id);
      resetRequestData();
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
        resetRequestData,
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
