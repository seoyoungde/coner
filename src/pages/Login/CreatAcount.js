import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CreatAcount = () => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  const location = useLocation();
  // const AddressInputClick = () => {
  //   navigate("/addressmodal", {
  //     state: {
  //       prevPath: location.pathname,
  //     },
  //   });
  // };
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passPhone, setPassPhone] = useState("");
  // const isFormValid =
  //   email &&
  //   password &&
  //   confirmPassword &&
  //   name &&
  //   job &&
  //   birth &&
  //   address &&
  //   phone &&
  //   passPhone;
  const handleCreataccount = async () => {
    try {
      if (!email.includes("@")) {
        alert("올바른 이메일형식을 입력하세요");
        return;
      }
      if (!name) {
        alert("이름을 입력하세요");
        return;
      }
      if (!password) {
        alert("비밀번호를 입력하세요");
        return;
      }
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다");
        return;
      }
      if (!job) {
        alert("직업을 선택하세요");
        return;
      }
      if (birth.length !== 10) {
        alert("생년월일은 8자리로 입력하세요.");
        return;
      }
      if (!address) {
        alert("거주지를 입력해주세요");
        return;
      }
      if (phone.length !== 13) {
        alert("휴대폰번호를 확인해주세요");
        return;
      }
      if (!passPhone) {
        alert("인증번호를 입력해주세요");
        return;
      }
      if (passPhone !== "000000") {
        alert("인증번호를 다시 입력해주세요");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "testclients", user.uid), {
        clientemail: email,
        clientpassword: password,
        clientname: name,
        clientjob: job,
        clientbirth: birth,
        clientaddress: address,
        clientphone: phone,
      });
      alert("회원가입 완료");
      navigate("/loginpage");
    } catch (error) {
      console.log(error);
      alert("회원가입 실패:" + error.message);
    }
  };
  // useEffect(() => {
  //   if (location.state?.selectedAddress) {
  //     setAddress(location.state.selectedAddress);
  //   }
  // }, [location.state]);
  const handleSendVerificationCode = () => {
    alert("인증번호를 전송했습니다");
  };
  const handleBirthChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 5) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }
    if (value.length >= 8) {
      value = value.slice(0, 7) + "-" + value.slice(7);
    }

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setBirth(value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 4) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    }
    if (value.length >= 9) {
      value = value.slice(0, 8) + "-" + value.slice(8);
    }
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    setPhone(value);
  };

  // const handlePhoneChange = (e) => {
  //   const onlyPhoneNumbers = e.target.value.replace(/\D/g, "");
  //   setPhone(onlyPhoneNumbers);
  // };

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
              <Label>비밀번호</Label>
              <div style={{ display: "flex" }}>
                <PasswordInput
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호입력"
                  value={password}
                  onChange={(e) => setPasswrod(e.target.value)}
                ></PasswordInput>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ width: "10%", border: "none" }}
                >
                  {showPassword ? "숨기기" : "보기"}
                </button>
              </div>
              <Hint>*영문, 숫자, 특수기호 포함 6~12자리</Hint>
            </FormGroup>
            <FormGroup>
              <Label>비밀번호 확인</Label>
              <Input
                type="password"
                placeholder="비밀번호확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                // onClick={AddressInputClick}
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
                placeholder="인증번호를 입력하세요."
                value={passPhone}
                onChange={(e) => setPassPhone(e.target.value)}
              />
            </FormGroup>
          </FormBox>
        </FormSection>

        <SubmitButton
          // disabled={!isFormValid}
          onClick={handleCreataccount}
        >
          가입하기
        </SubmitButton>
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
const PasswordInput = styled.input`
  width: 90%;
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
