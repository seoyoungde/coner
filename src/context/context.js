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
  request_id: "",
  service_type: "",
  aircon_type: "",
  brand: "",
  customer_uid: "",
  customer_phone: "",
  customer_address: "",
  customer_address_detail: "",
  partner_uid: "",
  partner_name: "",
  partner_address: "",
  partner_address_detail: "",
  engineer_uid: "",
  engineer_name: "",
  engineer_phone: "",
  engineer_profile_image: "",
  service_date: "",
  service_time: "",
  accepted_at: "",
  created_at: "",
  completed_at: "",
  memo: "",
  payment_requested_at: "",
  status: 1,
  sprint: [],
  detailInfo: "",
};

export const RequestProvider = ({ children }) => {
  const [requestData, setRequestData] = useState(initialRequestState);
  const allowedFields = [
    "request_id",
    "service_type",
    "aircon_type",
    "brand",
    "customer_uid",
    "customer_phone",
    "customer_address",
    "customer_address_detail",
    "partner_uid",
    "partner_name",
    "partner_address",
    "partner_address_detail",
    "engineer_uid",
    "engineer_name",
    "engineer_phone",
    "engineer_profile_image",
    "service_date",
    "service_time",
    "accepted_at",
    "created_at",
    "completed_at",
    "memo",
    "payment_requested_at",
    "status",
    "sprint",
    "detailInfo",
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

  const fetchRequestByClient = async (customer_phone) => {
    try {
      const q = query(
        collection(db, "Request"),
        where("customer_phone", "==", customer_phone)
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
    if (!updatedRequestData || !updatedRequestData.service_type) {
      console.error(
        "submitRequest: requestData가 비어 있습니다.",
        updatedRequestData
      );
      return;
    }

    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = `${today.getMonth() + 1}`.padStart(2, "0");
      const day = `${today.getDate()}`.padStart(2, "0");
      const formattedDate = `${year}년 ${month}월 ${day}일`;

      const newDocRef = doc(collection(db, "Request"));
      const sanitizedData = {
        ...filterAllowedFields(updatedRequestData),
        request_id: newDocRef.id,
        created_at: formattedDate,
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
