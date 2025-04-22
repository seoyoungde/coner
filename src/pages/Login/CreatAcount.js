import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const CreatAcount = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={28} />
        </BackButton>
        <Title>회원가입</Title>
      </Header>

      <FormSection>
        <SectionTitle>회원정보입력</SectionTitle>
        <FormBox>
          <FormGroup>
            <Label>이메일</Label>
            <Input placeholder="직접입력" />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input type="password" placeholder="비밀번호입력" />
            <Hint>*영문, 숫자, 특수기호 포함 6~12자리</Hint>
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input type="password" placeholder="비밀번호확인" />
          </FormGroup>
          <FormGroup>
            <Label>이름</Label>
            <Input placeholder="이름을 입력하세요." />
          </FormGroup>
          <FormGroup>
            <Label>직업</Label>
            <JobButtonBox>
              <JobButton>개인사업자</JobButton>
              <JobButton>법인사업자</JobButton>
              <JobButton>프리랜서</JobButton>
              <JobButton>회사원</JobButton>
            </JobButtonBox>
          </FormGroup>
          <FormGroup>
            <Label>생년월일 8자리</Label>
            <Input placeholder="생년월일을 입력하세요." />
          </FormGroup>
          <FormGroup>
            <Label>거주지</Label>
            <Input placeholder="주소지검색하기" />
          </FormGroup>
          <FormGroup>
            <LabelRow>
              <span>휴대전화번호</span>
              <SmallButton>인증번호받기</SmallButton>
            </LabelRow>
            <Input placeholder="전화번호를 입력해주세요" />
          </FormGroup>
          <FormGroup>
            <Label>인증번호</Label>
            <Input placeholder="인증번호를 입력하세요." />
          </FormGroup>
        </FormBox>
      </FormSection>

      <SubmitButton disabled>가입하기</SubmitButton>
    </Container>
  );
};
export default CreatAcount;

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  width: 98%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const FormSection = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const FormBox = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  background: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.p`
  font-weight: bold;
  margin-bottom: 6px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #333;
  }
`;

const Hint = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const JobButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
`;

const JobButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px 0;
  background: #f9f9f9;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const SmallButton = styled.button`
  font-size: 13px;
  color: #2b3ea3;
  background: none;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px 0;
  background-color: #ddd;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
`;
