import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import axios from "axios";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import InfoModifyAddressModal from "../../components/Services/InfoModifyAddressModal";
import Popup from "../../components/Apply/Popup";
import { migratePhoneAccount } from "../../utils/migratePhoneAccount";

const InfoModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scale, height, ref } = useScaleLayout();
  const { setUserInfo, userInfo } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    job: "",
    birth_date: "",
    address: "",
    address_detail: "",
    phone: "",
  });
  const [clearedFields, setClearedFields] = useState({});

  const [code, setCode] = useState("");

  const [sentCode, setSentCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [codeSentTo, setCodeSentTo] = useState("");

  useEffect(() => {
    if (userInfo) {
      setFormData({
        email: location.state?.email || userInfo.email || "",
        name: location.state?.name || userInfo.name || "",
        job: location.state?.job || userInfo.job || "",
        birth_date: location.state?.birth_date || userInfo.birth_date || "",
        address:
          location.state?.selectedAddress ||
          location.state?.address ||
          userInfo.address ||
          "",
        address_detail:
          location.state?.address_detail || userInfo.address_detail || "",
        phone: location.state?.phone || userInfo.phone || "",
      });
    }
  }, [userInfo, location.state]);
  const handleAddressSelect = (selectedAddress) => {
    setFormData((prev) => ({
      ...prev,
      address: selectedAddress,
    }));
    setIsAddressModalOpen(false);
  };
  const handleFocusClear = (field) => {
    if (!clearedFields[field]) {
      setFormData((prev) => ({ ...prev, [field]: "" }));
      setClearedFields((prev) => ({ ...prev, [field]: true }));
    }
  };

  const normalizePhone = (phone) => {
    return phone.replace(/\D/g, "");
  };

  const formatBirthInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 5) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 8) value = value.slice(0, 7) + "-" + value.slice(7);
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((prev) => ({ ...prev, birth_date: value }));
  };

  const formatPhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 4) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length >= 9) value = value.slice(0, 8) + "-" + value.slice(8);
    if (value.length > 13) value = value.slice(0, 13);
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendVerificationCode = async () => {
    if (!formData.phone) {
      setPopupMessage("전화번호를 입력해주세요.");
      setIsPopupOpen(true);
      return;
    }

    const code = generateRandomCode();
    setSentCode(code);
    setCodeSentTo(normalizePhone(formData.phone));
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
        to: normalizePhone(formData.phone),
        text: `인증번호는 ${code}입니다.`,
      });
      setPopupMessage("인증번호가 전송되었습니다.");
      setIsPopupOpen(true);
    } catch (error) {
      console.error(error);
      alert("인증번호 전송 실패: " + error.message);
    }
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) return;

    // if (!sentCode || code !== sentCode) {
    //   setPopupMessage("전화번호 인증이 필요합니다.");
    //   setIsPopupOpen(true);
    //   return;
    // }
    // if (!code) {
    //   setPopupMessage("인증번호를 입력해주세요");
    //   setIsPopupOpen(true);
    //   return;
    // }
    // if (code !== sentCode) {
    //   setPopupMessage("인증번호가 일치하지 않습니다");
    //   setIsPopupOpen(true);
    //   return;
    // }
    // if (normalizePhone(formData.phone) !== codeSentTo) {
    //   setPopupMessage("인증번호를 받은 전화번호와 일치하지 않습니다.");
    //   setIsPopupOpen(true);
    //   return;
    // }
    // if (formData.phone !== userInfo.phone) {
    //   await migratePhoneAccount(
    //     formData.phone,
    //     auth.currentUser,
    //     (newUser, oldData) => {
    //       setUserInfo({ ...oldData, uid: newUser.uid, phone: formData.phone });
    //       navigate("/mypage");
    //     },
    //     (err) => {
    //       setPopupMessage("전화번호 변경 중 오류가 발생했습니다.");
    //       setIsPopupOpen(true);
    //     }
    //   );
    //   return;
    // }
    setIsSubmitting(true);
    try {
      const newPhone = normalizePhone(formData.phone);

      const ref = doc(db, "Customer", auth.currentUser.uid);
      const updatedData = {
        ...formData,
        phone: newPhone,
      };
      await updateDoc(ref, updatedData);

      const q = query(
        collection(db, "Request"),
        where("customer_uid", "==", auth.currentUser.uid)
      );
      const snap = await getDocs(q);
      const batch = writeBatch(db);
      snap.forEach((docSnap) => {
        batch.update(doc(db, "Request", docSnap.id), {
          phone: newPhone,
        });
      });
      await batch.commit();

      const updatedSnap = await getDoc(ref);
      if (updatedSnap.exists()) {
        setUserInfo(updatedSnap.data());
      }

      setPopupMessage("정보가 수정되었습니다.");
      setIsPopupOpen(true);
      if (location.state?.from === "addressform") {
        navigate("/addressform", { replace: true });
      } else {
        navigate("/mypage", { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert("수정 실패: " + err.message);
    } finally {
      setIsSubmitting(false);
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
              <Input
                name="email"
                value={formData.email}
                onFocus={() => handleFocusClear("email")}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>이름</Label>
              <Input
                name="name"
                value={formData.name}
                onFocus={() => handleFocusClear("name")}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>직업</Label>
              <JobButtonBox>
                {["개인사업자", "법인사업자", "개인"].map((job) => (
                  <JobButton
                    key={job}
                    $isSelected={formData.job === job}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, job: job }))
                    }
                  >
                    {job}
                  </JobButton>
                ))}
              </JobButtonBox>
            </FormGroup>
            <FormGroup>
              <Label>생년월일</Label>
              <Input
                name="birth_date"
                value={formData.birth_date}
                onFocus={() => handleFocusClear("birth_date")}
                onChange={formatBirthInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>주소</Label>
              <Input
                name="address"
                value={formData.address}
                readOnly
                onClick={() => setIsAddressModalOpen(true)}
              />

              {isAddressModalOpen && (
                <InfoModifyAddressModal
                  onClose={() => setIsAddressModalOpen(false)}
                  onSelect={handleAddressSelect}
                />
              )}
              <Input
                name="address_detail"
                value={formData.address_detail}
                onFocus={() => handleFocusClear("address_detail")}
                onChange={handleChange}
                placeholder="상세주소"
                style={{ marginTop: "10px" }}
              />
            </FormGroup>
            <FormGroup>
              <Label>전화번호</Label>
              <Input
                name="phone"
                value={formData.phone}
                readOnly
                // onFocus={() => handleFocusClear("phone")}
                onChange={formatPhoneInput}
              />
              {/* <SmallButton onClick={handleSendVerificationCode}>
                인증번호받기
              </SmallButton>
              <Input
                placeholder="인증번호 입력"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ marginTop: "10px" }}
              />
              {timer > 0 && (
                <p
                  style={{
                    color: "#999",
                    fontSize: "13px",
                    marginTop: "4px",
                  }}
                >
                  인증번호 유효 시간: {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, "0")}
                </p>
              )} */}
            </FormGroup>
            <WidthdrawLink to="/withdraw">회원탈퇴하기</WidthdrawLink>
          </FormBox>
        </FormSection>
        <div id="recaptcha-container" style={{ display: "none" }} />
        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "수정 중..." : "수정완료"}
        </SubmitButton>
        {isPopupOpen && (
          <Popup onClose={() => setIsPopupOpen(false)}>
            <PopupMessage>{popupMessage}</PopupMessage>
            <CloseButton onClick={() => setIsPopupOpen(false)}>
              닫기
            </CloseButton>
          </Popup>
        )}
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
  @media ${device.mobile} {
    font-size: 50px;
  }
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
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? "#80BFFF" : "#f9f9f9")};
  border-radius: 6px;
  padding: 10px 0;
  background: ${({ $isSelected }) => ($isSelected ? "#80BFFF" : "#f2f2f2")};
  color: black;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? "#80BFFF" : "#80BFFF")};
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
  margin-top: 8px;
  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px 0;
  background-color: #0080ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 40px;
  }
`;

const WidthdrawLink = styled(Link)`
  font-size: 0.8rem;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;
const PopupMessage = styled.p`
  font-size: 15px;
  padding: 30px 30px 50px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  @media ${device.mobile} {
    font-size: 1.1rem;
    padding: 40px 20px 30px 20px;
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 1.1rem;
  }
`;
