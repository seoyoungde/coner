// src/context/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import * as firebaseAuth from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && user.phoneNumber) {
        try {
          const normalizedPhone = user.phoneNumber;

          const q = query(
            collection(db, "testclients"),
            where("clientphone", "==", normalizedPhone)
          );
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            const matchedUser = snapshot.docs[0].data();
            setUserInfo(matchedUser);
          } else {
            console.warn("⚠️ Firestore에 해당 전화번호 유저가 없음");
            setUserInfo(null);
          }
        } catch (error) {
          console.error("❌ Firestore 유저 조회 오류:", error);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userInfo,
        setUserInfo,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
