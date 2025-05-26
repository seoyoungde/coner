import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRNOUtPREZ9lrCea7e_opIG8Xa-ZWgD9o",
  authDomain: "coolon-9a9a3.firebaseapp.com",
  projectId: "coolon-9a9a3",
  storageBucket: "coolon-9a9a3.firebasestorage.app",
  messagingSenderId: "356148224176",
  appId: "1:356148224176:web:fd59962193969184191b75",
  measurementId: "G-PBP8W1H3TL",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 서비스 가져오기
const auth = firebaseAuth.getAuth(app); // 인증
const db = getFirestore(app); // Firestore 데이터베이스
const storage = getStorage(app); // 스토리지

export { app, auth, db, storage, analytics };
