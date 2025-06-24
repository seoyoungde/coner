import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import axios from "axios";
import * as firebaseAuth from "firebase/auth";
import conerlogo from "../../assets/images/logo/conerlogo.png";

const LoginPage = () => {
  const { scale, height, ref } = useScaleLayout();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [codeSentTo, setCodeSentTo] = useState("");

  const API = "https://api.coner.kr";

  const generateRandomCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 4) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length >= 9) value = value.slice(0, 8) + "-" + value.slice(8);
    if (value.length > 13) value = value.slice(0, 13);
    setPhoneNumber(value);
  };

  const handleSendVerificationCode = async () => {
    if (!phoneNumber) return alert("전화번호를 입력해주세요.");

    const code = generateRandomCode();

    setSentCode(code);
    setCodeSentTo(phoneNumber.replace(/\D/g, ""));

    setTimer(180);

    if (timerId) clearInterval(timerId);

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setSentCode("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimerId(id);

    try {
      await axios.post(`${API}/sms/send`, {
        to: phoneNumber.replace(/\D/g, ""),
        text: `인증번호는 ${code}입니다.`,
      });
      alert("인증번호가 전송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("인증번호 전송 실패: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (!phoneNumber || phoneNumber.length < 10)
        return alert("전화번호를 정확히 입력해주세요");
      if (!code) return alert("인증번호를 입력해주세요");
      if (code !== sentCode) return alert("인증번호가 일치하지 않습니다");

      const formattedPhone = phoneNumber.replace(/\D/g, "");
      const intlPhone = "+82" + formattedPhone.slice(1);

      if (formattedPhone !== codeSentTo) {
        return alert("인증번호를 받은 전화번호와 일치하지 않습니다.");
      }

      const q = query(
        collection(db, "Customer"),
        where("phone", "==", formattedPhone)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("해당 전화번호로 가입된 회원이 없습니다.");
        return;
      }

      const response = await axios.post("https://api.coner.kr/auth/login", {
        phoneNumber: intlPhone,
      });

      const token = response.data.customToken;
      await firebaseAuth.signInWithCustomToken(auth, token);

      navigate("/mypage");
      setSentCode("");
    } catch (error) {
      alert("로그인 실패: " + error.message);
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
        <img
          style={{ width: "170px" }}
          src={conerlogo}
          alt="코너로고배너"
        ></img>
        <InputBox>
          <UserPhoneNum value={phoneNumber} onChange={handlePhoneChange} />
          <div style={{ width: "100%", display: "flex" }}>
            <Userpassword
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <PassBtn type="button" onClick={handleSendVerificationCode}>
              인증번호받기
            </PassBtn>
          </div>
          {timer > 0 && (
            <p style={{ color: "#999", fontSize: "13px", marginTop: "4px" }}>
              인증번호 유효 시간: {Math.floor(timer / 60)}:
              {String(timer % 60).padStart(2, "0")}
            </p>
          )}
        </InputBox>

        <LoginButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "로딩중..." : "로그인"}
        </LoginButton>
        <SearchSection>
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

const UserPhoneNum = styled.input.attrs({
  type: "tel",
  placeholder: "전화번호입력",
})`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border: 1px solid #0080ff;
  }

  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 20px;
  }
`;

const Userpassword = styled.input.attrs({
  type: "password",
  placeholder: "휴대폰인증번호입력",
})`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  width: 80%;
  &:focus {
    outline: none;
    border: 1px solid #0080ff;
  }
  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 20px;
  }
`;

const LoginButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#0080FF")};
  color: white;
  font-weight: 700;
  padding: 16px 0;
  border: none;
  border-radius: 8px;
  width: 100%;
  font-size: 17px;
  margin-bottom: 24px;
  cursor: pointer;
  margin-top: 20px;
  @media ${device.mobile} {
    height: 60px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 900;
  }
`;
const PassBtn = styled.button`
  width: 20%;
  border: none;
  border-radius: 8px;
`;
const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: #aaa;
  @media ${device.mobile} {
    font-size: 18px;
  }
`;

export default LoginPage;
