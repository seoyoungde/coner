import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import { signInAnonymously } from "firebase/auth";
import { auth } from "../../firebase";

const CreatAcount = () => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passPhone, setPassPhone] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const generateRandomCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendVerificationCode = async () => {
    if (!phone) return alert("전화번호를 입력해주세요.");

    const code = generateRandomCode();
    setSentCode(code);

    try {
      await axios.post("http://3.34.179.158:3000/send-sms", {
        to: phone,
        text: `인증번호는 ${code}입니다.`,
      });
      alert("인증번호가 전송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("인증번호 전송 실패: " + error.message);
    }
  };

  const handleCreataccount = async () => {
    try {
      if (!email.includes("@")) return alert("이메일을 입력하세요.");
      if (!name || !job || !birth || !address || !detailAddress)
        return alert("모든 정보를 입력해주세요.");
      if (!phone || !passPhone)
        return alert("전화번호와 인증번호를 입력해주세요.");

      if (passPhone !== sentCode) return alert("인증번호가 일치하지 않습니다.");

      const userCredential = await signInAnonymously(auth);
      const uid = userCredential.user.uid;

      const newUser = {
        clientemail: email,
        clientname: name,
        clientjob: job,
        clientbirth: birth,
        clientaddress: address,
        clientdetailaddress: detailAddress,
        clientphone: phone,
        clientId: uid,
      };
      await addDoc(collection(db, "testclients"), newUser);
      alert("회원가입 완료");
      navigate("/loginpage");
    } catch (error) {
      console.log(error);
      alert("회원가입 실패:" + error.message);
    }
  };

  const handleBirthChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 5) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 8) value = value.slice(0, 7) + "-" + value.slice(7);
    if (value.length > 10) value = value.slice(0, 10);
    setBirth(value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 4) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length >= 9) value = value.slice(0, 8) + "-" + value.slice(8);
    if (value.length > 13) value = value.slice(0, 13);
    setPhone(value);
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
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon>
              <IoIosArrowBack size={28} />
            </BackIcon>
          </BackButton>
          <Title>회원가입</Title>
        </Header>

        <FormSection>
          <SectionTitle>회원정보입력</SectionTitle>
          <FormBox>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                placeholder="직접입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>이름</Label>
              <Input
                placeholder="이름을 입력하세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>직업</Label>
              <JobButtonBox>
                <JobButton
                  isSelected={job === "개인사업자"}
                  onClick={() => setJob("개인사업자")}
                >
                  개인사업자
                </JobButton>
                <JobButton
                  isSelected={job === "법인사업자"}
                  onClick={() => setJob("법인사업자")}
                >
                  법인사업자
                </JobButton>
                <JobButton
                  isSelected={job === "프리랜서"}
                  onClick={() => setJob("프리랜서")}
                >
                  프리랜서
                </JobButton>
                <JobButton
                  isSelected={job === "회사원"}
                  onClick={() => setJob("회사원")}
                >
                  회사원
                </JobButton>
              </JobButtonBox>
            </FormGroup>
            <FormGroup>
              <Label>생년월일 8자리</Label>
              <Input
                placeholder="생년월일을 입력하세요."
                value={birth}
                onChange={handleBirthChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>거주지</Label>
              <Input
                name="clientAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="클릭하여 주소 검색"
              />
              <Input
                name="clientDetailAddress"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세주소입력"
                style={{ marginTop: "10px" }}
              />
            </FormGroup>
            <FormGroup>
              <LabelRow>
                <span>휴대전화번호</span>
                <SmallButton onClick={handleSendVerificationCode}>
                  인증번호받기
                </SmallButton>
              </LabelRow>
              <Input
                placeholder="전화번호를 입력해주세요"
                value={phone}
                onChange={handlePhoneChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>인증번호</Label>
              <Input
                placeholder="6자리 인증번호 입력"
                value={passPhone}
                onChange={(e) => setPassPhone(e.target.value)}
              />
            </FormGroup>
          </FormBox>
        </FormSection>

        <SubmitButton onClick={handleCreataccount}>가입하기</SubmitButton>
        <div id="recaptcha-container"></div>
      </Container>
    </ScaleWrapper>
  );
};
export default CreatAcount;
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

const JobButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
`;

const JobButton = styled.button`
  border: 1px solid ${({ isSelected }) => (isSelected ? "#00e6fd" : "#f9f9f9")};
  border-radius: 6px;
  padding: 10px 0;
  background: ${({ isSelected }) => (isSelected ? "#b8f8ff" : "#f2f2f2")};
  color: black;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? "#d0eff3" : "#eee")};
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

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px 0;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#00E5FD")};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 40px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 40px;
  }
`;
