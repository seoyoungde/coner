// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMDN23jFHMIw4QKWc3xffK5HRry6INijI",
  authDomain: "coner-2f144.firebaseapp.com",
  projectId: "coner-2f144",
  storageBucket: "coner-2f144.appspot.com",
  messagingSenderId: "1406397932",
  appId: "1:1406397932:web:f395627dec93841a8264c9",
  measurementId: "G-9R3VLCRT5R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 서비스 가져오기
const auth = getAuth(app); // 인증
const db = getFirestore(app); // Firestore 데이터베이스
const storage = getStorage(app); // 스토리지

// 필요한 모듈 export
export { app, auth, db, storage, analytics };
