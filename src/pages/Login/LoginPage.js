import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Container>
      <img src="../conerloginbanner.png"></img>
      <InputBox>
        <UserId></UserId>
        <Userpassword></Userpassword>
      </InputBox>
      <CheckBox>
        <CheckInput />
        로그인상태유지
      </CheckBox>
      <LoginButton>로그인</LoginButton>
      <SearchSection>
        <Link to="/idsearch" style={{ textDecoration: "none", color: " #aaa" }}>
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
  );
};
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 93%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
`;

const UserId = styled.input.attrs({
  type: "text",
  placeholder: "이메일주소입력",
})`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
`;

const Userpassword = styled.input.attrs({
  type: "password",
  placeholder: "비밀번호 입력",
})`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
`;

const CheckBox = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #444;
  margin: 12px 0;
  gap: 6px;
  justify-content: flex-start;
`;

const CheckInput = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
`;

const LoginButton = styled.button`
  background-color: #e0e0e0;
  color: white;
  font-weight: bold;
  padding: 16px 0;
  border: none;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 24px;
  cursor: pointer;
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: #aaa;
`;

export default LoginPage;
