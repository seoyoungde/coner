import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  deleteUser,
} from "firebase/auth";
import { getDoc, setDoc, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

/**
 * 전화번호 기반 Firebase Auth 계정 전환 및 Firestore 데이터 마이그레이션 처리
 */
export const migratePhoneAccount = async (
  newPhone,
  currentUser,
  onComplete,
  onError
) => {
  try {
    const oldUID = currentUser.uid;

    // ✅ reCAPTCHA 컨테이너 확인
    const container = document.getElementById("recaptcha-container");
    if (!container) throw new Error("❌ reCAPTCHA 컨테이너가 DOM에 없음");

    // ✅ auth.settings가 초기화될 때까지 기다림
    const waitForAuthReady = () =>
      new Promise((resolve) => {
        const check = () => {
          if (auth && auth.settings !== undefined) resolve();
          else setTimeout(check, 100);
        };
        check();
      });

    await waitForAuthReady();

    // ✅ RecaptchaVerifier 인스턴스 생성
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("✅ reCAPTCHA verified");
        },
      },
      auth
    );

    await recaptchaVerifier.render();

    const phoneNumber = `+82${newPhone.replace(/-/g, "").slice(1)}`;
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    const verificationCode = prompt("인증번호를 입력하세요:");
    const result = await confirmation.confirm(verificationCode);
    const newUser = result.user;
    const newUID = newUser.uid;

    const oldSnap = await getDoc(doc(db, "Customer", oldUID));
    if (oldSnap.exists()) {
      await setDoc(doc(db, "Customer", newUID), oldSnap.data());
    }

    await deleteDoc(doc(db, "Customer", oldUID));
    await deleteUser(currentUser);

    onComplete(newUser, oldSnap.data());
  } catch (err) {
    console.error("📛 전화번호 마이그레이션 실패:", err);
    if (onError) onError(err);
  }
};
