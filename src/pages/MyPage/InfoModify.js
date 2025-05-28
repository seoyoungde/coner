import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
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

const InfoModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scale, height, ref } = useScaleLayout();
  const { setUserInfo, userInfo } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    clientemail: "",
    clientname: "",
    clientjob: "",
    clientbirth: "",
    clientaddress: "",
    clientdetailaddress: "",
    clientphone: "",
  });
  const [clearedFields, setClearedFields] = useState({});
  const [passPhone, setPassPhone] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        clientemail: location.state?.clientemail || userInfo.clientemail || "",
        clientname: location.state?.clientname || userInfo.clientname || "",
        clientjob: location.state?.clientjob || userInfo.clientjob || "",
        clientbirth: location.state?.clientbirth || userInfo.clientbirth || "",
        clientaddress:
          location.state?.selectedAddress ||
          location.state?.clientaddress ||
          userInfo.clientaddress ||
          "",
        clientdetailaddress:
          location.state?.clientdetailaddress ||
          userInfo.clientdetailaddress ||
          "",
        clientphone: location.state?.clientphone || userInfo.clientphone || "",
      });
    }
  }, [userInfo, location.state]);
  const handleAddressSelect = (selectedAddress) => {
    setFormData((prev) => ({
      ...prev,
      clientaddress: selectedAddress,
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
    return phone.replace(/\D/g, "").replace(/^0/, "+82");
  };

  const formatBirthInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 5) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 8) value = value.slice(0, 7) + "-" + value.slice(7);
    if (value.length > 10) value = value.slice(0, 10);
    setFormData((prev) => ({ ...prev, clientbirth: value }));
  };

  const formatPhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 4) value = value.slice(0, 3) + "-" + value.slice(3);
    if (value.length >= 9) value = value.slice(0, 8) + "-" + value.slice(8);
    if (value.length > 13) value = value.slice(0, 13);
    setFormData((prev) => ({ ...prev, clientphone: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendVerificationCode = () => {
    if (!formData.clientphone) return alert("전화번호를 입력해주세요.");
    const code = "000000";
    setSentCode(code);
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
    alert("인증번호가 전송되었습니다. (테스트용: 000000)");
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) return;
    if (!sentCode || passPhone !== sentCode) {
      alert("전화번호 인증이 필요합니다.");
      return;
    }
    setIsSubmitting(true);
    try {
      const newPhone = normalizePhone(formData.clientphone);
      const ref = doc(db, "testclients", auth.currentUser.uid);
      const updatedData = {
        ...formData,
        clientphone: newPhone,
      };
      await updateDoc(ref, updatedData);

      const q = query(
        collection(db, "testservice"),
        where("clientId", "==", auth.currentUser.uid)
      );
      const snap = await getDocs(q);
      const batch = writeBatch(db);
      snap.forEach((docSnap) => {
        batch.update(doc(db, "testservice", docSnap.id), {
          clientPhone: newPhone,
        });
      });
      await batch.commit();

      const updatedSnap = await getDoc(ref);
      if (updatedSnap.exists()) {
        setUserInfo(updatedSnap.data());
      }

      alert("정보가 수정되었습니다.");
      navigate("/mypage");
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
                name="clientemail"
                value={formData.clientemail}
                onFocus={() => handleFocusClear("clientemail")}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>이름</Label>
              <Input
                name="clientname"
                value={formData.clientname}
                onFocus={() => handleFocusClear("clientname")}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>직업</Label>
              <JobButtonBox>
                {["개인사업자", "법인사업자", "개인"].map((job) => (
                  <JobButton
                    key={job}
                    $isSelected={formData.clientjob === job}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, clientjob: job }))
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
                name="clientbirth"
                value={formData.clientbirth}
                onFocus={() => handleFocusClear("clientbirth")}
                onChange={formatBirthInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>주소</Label>
              <Input
                name="clientaddress"
                value={formData.clientaddress}
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
                name="clientdetailaddress"
                value={formData.clientdetailaddress}
                onFocus={() => handleFocusClear("clientdetailaddress")}
                onChange={handleChange}
                placeholder="상세주소"
                style={{ marginTop: "10px" }}
              />
            </FormGroup>
            <FormGroup>
              <Label>전화번호</Label>
              <Input
                name="clientphone"
                value={formData.clientphone}
                onFocus={() => handleFocusClear("clientphone")}
                onChange={formatPhoneInput}
              />
              <SmallButton onClick={handleSendVerificationCode}>
                인증번호받기
              </SmallButton>
              <Input
                placeholder="인증번호 입력"
                value={passPhone}
                onChange={(e) => setPassPhone(e.target.value)}
                style={{ marginTop: "10px" }}
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

            <Link to="/withdraw" style={{ fontSize: "0.8rem" }}>
              회원탈퇴하기
            </Link>
          </FormBox>
        </FormSection>

        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "수정 중..." : "수정완료"}
        </SubmitButton>
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
    ${({ $isSelected }) => ($isSelected ? "#00e6fd" : "#f9f9f9")};
  border-radius: 6px;
  padding: 10px 0;
  background: ${({ $isSelected }) => ($isSelected ? "#b8f8ff" : "#f2f2f2")};
  color: black;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? "#d0eff3" : "#eee")};
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
  background-color: #00e6fd;
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
