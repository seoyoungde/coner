import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import {
  doc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";

const CreatAcount = () => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [passPhone, setPassPhone] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSentTo, setCodeSentTo] = useState("");

  useEffect(() => {
    const state = location.state;
    if (state?.selectedAddress) {
      setAddress(state.selectedAddress);

      if (state.name) setName(state.name);
      if (state.email) setEmail(state.email);
      if (state.job) setJob(state.job);
      if (state.birth_date) setBirth_date(state.birth_date);
      if (state.detailAddress) setAddress_detail(state.address_detail);
      if (state.phone) setPhone(state.phone);
      if (state.passPhone) setPassPhone(state.passPhone);
    }
  }, [location.state]);

  const generateRandomCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendVerificationCode = async () => {
    if (!phone) return alert("전화번호를 입력해주세요.");

    const code = generateRandomCode();
    setSentCode(code);
    setCodeSentTo(phone.replace(/-/g, ""));

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
      await axios.post("https://api.coner.kr/sms/send", {
        to: phone.replace(/-/g, ""),
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
      setIsSubmitting(true);
      if (!name || !job || !birth_date || !address || !address_detail) {
        return alert("모든 정보를 입력해주세요.");
      }
      if (!phone || !passPhone) {
        return alert("전화번호와 인증번호를 입력해주세요.");
      }
      if (!sentCode) {
        return alert("인증번호가 만료되었습니다. 다시 요청해주세요.");
      }
      if (passPhone !== sentCode) {
        return alert("인증번호가 일치하지 않습니다.");
      }
      if (phone.replace(/-/g, "") !== codeSentTo) {
        return alert("인증번호를 받은 전화번호와 일치하지 않습니다.");
      }
      const isValidBirth = (str) => {
        const matches = str.match(/^(\d{4})년 (\d{2})월 (\d{2})일$/);
        if (!matches) return false;
        const [_, y, m, d] = matches;
        return (
          +y > 1900 && +y < 2100 && +m >= 1 && +m <= 12 && +d >= 1 && +d <= 31
        );
      };
      if (!isValidBirth(birth_date)) {
        return alert("올바른 생년월일 형식이 아닙니다. 예: 1990-01-01");
      }

      const formattedPhone = phone.replace(/-/g, "");

      const q = query(
        collection(db, "Customer"),
        where("phone", "==", formattedPhone)
      );
      const snapshot = await getDocs(q);
      if (snapshot.docs.find((doc) => !doc.data().isDeleted)) {
        return alert("이미 가입된 전화번호입니다.");
      }

      const res = await axios.post("https://api.coner.kr/auth/login", {
        phoneNumber: "+82" + formattedPhone.slice(1),
      });
      const token = res.data.customToken;

      const userCredential = await signInWithCustomToken(auth, token);
      const uid = userCredential.user.uid;

      const newUser = {
        member_id: uid,
        email: email,
        name: name,
        job: job,
        birth_date: birth_date,
        address: address,
        address_detail: address_detail,
        phone: formattedPhone,
        state: 1,
        isDeleted: false,
      };

      await setDoc(doc(db, "Customer", uid), newUser);

      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/loginpage");
    } catch (error) {
      alert(
        "회원가입 실패: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBirthChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 4) value = value.slice(0, 4) + "년 " + value.slice(4);
    if (value.length >= 8) value = value.slice(0, 8) + "월 " + value.slice(8);
    if (value.length >= 12) value = value.slice(0, 12) + "일";
    if (value.length > 13) value = value.slice(0, 13);

    setBirth_date(value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);

    if (value.length >= 4) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length >= 9) value = value.slice(0, 8) + "-" + value.slice(8);

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
                placeholder="이메일입력은 선택사항입니다"
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
                  $isSelected={job === "개인사업자"}
                  onClick={() => setJob("개인사업자")}
                >
                  개인사업자
                </JobButton>
                <JobButton
                  $isSelected={job === "법인사업자"}
                  onClick={() => setJob("법인사업자")}
                >
                  법인사업자
                </JobButton>
                <JobButton
                  $isSelected={job === "프리랜서"}
                  onClick={() => setJob("프리랜서")}
                >
                  개인
                </JobButton>
              </JobButtonBox>
            </FormGroup>
            <FormGroup>
              <Label>생년월일 8자리</Label>
              <Input
                placeholder="생년월일을 입력하세요."
                value={birth_date}
                onChange={handleBirthChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>거주지</Label>
              <Input
                name="clientAddress"
                value={address}
                readOnly
                onClick={() =>
                  navigate("/createaddressmodal", {
                    state: {
                      prevPath: "/createacount",
                      name,
                      email,
                      job,
                      birth_date,
                      address_detail,
                      phone,
                      passPhone,
                    },
                  })
                }
                placeholder="클릭하여 주소 검색"
              />
              <Input
                name="clientDetailAddress"
                value={address_detail}
                onChange={(e) => setAddress_detail(e.target.value)}
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
              {timer > 0 && (
                <p
                  style={{ color: "#999", fontSize: "13px", marginTop: "4px" }}
                >
                  인증번호 유효 시간: {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, "0")}
                </p>
              )}
            </FormGroup>
          </FormBox>
        </FormSection>

        <SubmitButton onClick={handleCreataccount} disabled={isSubmitting}>
          {isSubmitting ? "가입 중..." : "가입하기"}
        </SubmitButton>
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
  font-size:40px;
`;
const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  @media ${device.mobile} {
    font-size: 24px;
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
    font-size: 22px;
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
    font-size: 20px;
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
    height: 54px;
    padding: 16px;
    margin-top: 5px;
    font-size: 18px;
  }
`;

const JobButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
`;

const JobButton = styled.button`
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#80BFFF" : "#f9f9f9")};
  border-radius: 6px;
  padding: 10px 0;
  background: ${({ $isSelected }) => ($isSelected ? "#80BFFF" : "#f2f2f2")};
  color: black;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? "#80BFFF" : "#80BFFF")};
  }
  @media ${device.mobile} {
    padding: 16px 0;
    font-size: 18px;
  }
`;

const SmallButton = styled.button`
  font-size: 13px;
  color: #2b3ea3;
  background: none;
  border: none;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 16px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px 0;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#0080FF")};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 40px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  @media ${device.mobile} {
    height: 60px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 40px;
  }
`;
