import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const PasswordSearch = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={28} />
        </BackButton>
      </Header>
      <SearchSection>
        <TabWrapper>
          <Tab onClick={() => navigate("/idsearch")}>아이디 찾기</Tab>
          <Tab active>비밀번호 찾기</Tab>
        </TabWrapper>
        <Underline />
        <Underline2 />
        <HelpText>이름과 이메일을 입력해주세요</HelpText>

        <FormSection>
          <Label>이름</Label>
          <Input placeholder="이름을 입력하세요" style={{ width: "100%" }} />
        </FormSection>

        <FormSection>
          <Label>이메일</Label>
          <InputWrapper>
            <Input placeholder="이메일을 입력하세요" />
          </InputWrapper>
        </FormSection>
      </SearchSection>

      <ConfirmBtn disabled>확인</ConfirmBtn>
    </Container>
  );
};

export default PasswordSearch;

const Container = styled.div`
  padding: 16px;
  width: 98%;

  margin: 0 auto;
`;

const Header = styled.div`
  height: 40px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const SearchSection = styled.div`
  padding-top: 100px;
`;

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  font-size: 16px;
  padding: 12px 0;
  color: ${({ active }) => (active ? "#000" : "#777")};
  cursor: pointer;
`;

const Underline = styled.div`
  float: right;
  height: 2px;
  width: 50%;
  background-color: #36c8d5;
`;
const Underline2 = styled.div`
  height: 2px;
  width: 100%;
  background-color: #d2d2d2;
`;
const HelpText = styled.p`
  margin: 50px 0 16px;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

const FormSection = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ConfirmBtn = styled.button`
  margin-top: 30px;
  width: 100%;
  height: 46px;
  font-size: 16px;
  background-color: #d9d9d9;
  color: white;
  border: none;
  border-radius: 8px;
`;
