import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";

const InfoModify = () => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon>
              <IoIosArrowBack size={28} />
            </BackIcon>
          </BackButton>
          <Title>내 정보 수정</Title>
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
        <hr />
        <LinkSection>
          <Link to="/withdraw">회원탈퇴하기</Link>
          <Link to="/">로그아웃</Link>
        </LinkSection>
        <SubmitButton disabled>수정완료</SubmitButton>
      </Container>
    </ScaleWrapper>
  );
};
export default InfoModify;
const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  @media ${device.mobile} {
    width: 96%;
  }
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
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:50px;
`;
const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

const FormSection = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
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
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 6px;
  span {
    @media ${device.mobile} {
      font-size: 1.4rem;
    }
  }
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
  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 1.3rem;
  }
`;

const Hint = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  @media ${device.mobile}{
font-size:1.1rem;

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
  @media ${device.mobile} {
    padding: 20px 0;
    font-size: 1.2rem;
  }
`;

const SmallButton = styled.button`
  font-size: 13px;
  color: #2b3ea3;
  background: none;
  border: none;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;
const LinkSection = styled.div`\
display:flex;
  gap: 10px;
  padding-top:20px;
  padding-bottom:20px;
    @media ${device.mobile} {
    font-size: 1.2rem;
  }
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
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 40px;
  }
`;
