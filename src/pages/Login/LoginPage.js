import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { auth, db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
  const { scale, height, ref } = useScaleLayout();
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email.includes("@")) {
        alert("이메일을 정확하게 입력해주세요");
        return;
      }
      if (!password) {
        alert("비밀번호를 입력해주세요");
        return;
      }
      setIsLoading(true);
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "testclients", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        alert("회원 정보를 찾을 수 없습니다");
        return;
      }
      const userData = userSnap.data();

      alert("로그인 성공!");
      navigate("/mypage", { state: { user: userData, uid: user.uid } });
    } catch (error) {
      console.error(error);
      alert("로그인 실패:" + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <img src="../conerloginbanner.png"></img>
        <InputBox>
          <UserId
            value={email}
            onChange={(e) => setEamil(e.target.value)}
          ></UserId>
          <Userpassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Userpassword>
        </InputBox>
        {/* <CheckBox>
          <CheckInput />
          로그인상태유지
        </CheckBox> */}
        <LoginButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "로딩중..." : "로그인"}
        </LoginButton>
        <SearchSection>
          <Link
            to="/idsearch"
            style={{ textDecoration: "none", color: " #aaa" }}
          >
            아이디찾기
          </Link>
          <Link
            to="/passwordsearch"
            style={{ textDecoration: "none", color: " #aaa" }}
          >
            비밀번호찾기
          </Link>
          <Link
            to="/createacount"
            style={{ textDecoration: "none", color: " #aaa" }}
          >
            회원가입하기
          </Link>
        </SearchSection>
      </Container>
    </ScaleWrapper>
  );
};
const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  text-align: center;
  @media ${device.mobile} {
    width: 96%;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
`;

const UserId = styled.input.attrs({
  type: "email",
  placeholder: "이메일주소입력",
})`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #00e5fd;
  }

  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 1.3rem;
  }
`;

const Userpassword = styled.input.attrs({
  type: "password",
  placeholder: "비밀번호 입력",
})`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #00e5fd;
  }
  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 1.3rem;
  }
`;

const CheckBox = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
  margin: 12px 0;
  gap: 6px;
  justify-content: flex-start;
  @media ${device.mobile} {
    font-size: 1.2rem;
    margin: 18px 0;
  }
`;

const CheckInput = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  @media ${device.mobile} {
    width: 25px;
    height: 25px;
  }
`;

const LoginButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#00E5FD")};
  color: white;
  font-weight: bold;
  padding: 16px 0;
  border: none;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 24px;
  cursor: pointer;
  margin-top: 20px;
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
  }
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: #aaa;
  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

export default LoginPage;
