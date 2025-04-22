import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import { useRequest } from "../../context/context";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import StepProgressBar from "../../components/Apply/StepProgressBar";

const AddressForm = ({ title, description, buttonText }) => {
  const navigate = useNavigate();
  const { updateRequestData } = useRequest();
  const location = useLocation();
  const [scale, setScale] = useState(1);
  const [formData, setFormData] = useState({
    clientAddress: "",
    clientDetailedAddress: "",
    // clientId: "",
    clientPhone: "",
  });
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 500;
      const ratio = Math.min(window.innerWidth / baseWidth, 1);
      setScale(ratio);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "clientPhone") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length > 11) return;
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        clientAddress: location.state.selectedAddress,
      }));
    }
  }, [location.state]);

  const AddressInputClick = () => {
    navigate("/addressmodal", { state: { prevPath: location.pathname } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientAddress) {
      setPopupMessage("주소를 선택해주세요.");
      return;
    }
    if (!formData.clientDetailedAddress) {
      setPopupMessage("상세주소를 입력해주세요.");
      return;
    }
    if (!formData.clientPhone) {
      setPopupMessage("전화번호를 입력해주세요.");
      return;
    }
    updateRequestData("clientAddress", formData.clientAddress);
    updateRequestData("clientDetailedAddress", formData.clientDetailedAddress);
    // updateRequestData("clientId", formData.clientId);
    updateRequestData("clientPhone", formData.clientPhone);

    navigate("/selectservicedate");
  };

  return (
    <ScaleWrapper
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
    >
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <IoIosArrowBack size={32} color="#333" />
          </BackButton>
        </Header>
        <StepProgressBar currentStep={1} totalSteps={4} />
        <TitleSection>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TitleSection>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>주소</Label>
            <HelperTextBox>
              <HiOutlineExclamationCircle color=" #a5a5a5" size="18" />
              <HelperText>
                현재 서비스 제공 지역은 서울 강북권 일부로 제한되어 있습니다.
                <br></br>
                강북구, 광진구, 노원구, 동대문구, 성북구, 도봉구, 은평구,
                중량구, 종로구
              </HelperText>
            </HelperTextBox>
            <CustomSelect>
              <Input
                type="text"
                name="clientAddress"
                placeholder="클릭하여 주소 검색"
                style={{ border: "none" }}
                value={formData.clientAddress}
                onClick={AddressInputClick}
                readOnly
              />
            </CustomSelect>

            <Input
              type="text"
              name="clientDetailedAddress"
              placeholder="상세주소"
              value={formData.clientDetailedAddress}
              onChange={handleChange}
              style={{ marginTop: "10px" }}
            />
          </Field>
          {/* <Field>
          <Label>이름</Label>
          <Input
            type="text"
            name="clientId"
            placeholder="이름"
            value={formData.clientId}
            onChange={handleChange}
          />
        </Field> */}
          <Field>
            <Label>연락처</Label>
            <Input
              type="tel"
              name="clientPhone"
              placeholder="전화번호"
              value={formData.clientPhone}
              onChange={handleChange}
            />
          </Field>
          <SubmitButton type="submit">{buttonText}</SubmitButton>
        </Form>
        {popupMessage && (
          <Popup>
            <PopupContent>
              <PopupMessage>{popupMessage}</PopupMessage>
              <CloseButton onClick={() => setPopupMessage("")}>
                닫기
              </CloseButton>
            </PopupContent>
          </Popup>
        )}
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
  padding: 16px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleSection = styled.div`
  margin-top: 38px;
  margin-bottom: 35px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  margin-bottom: 3px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const Form = styled.form`
  width: 100%;
`;

const Field = styled.div`
  margin-bottom: 45px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const CustomSelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #a5a5a5;
  border-radius: 9px;

  svg {
    position: absolute;
    right: 10px;
    color: #a0a0a0;
  }
`;

const HelperText = styled.p`
  color: #a5a5a5;
  font-weight: 500;
  font-size: 15px;
  padding: 0px 0px 15px 5px;
`;
const HelperTextBox = styled.div`
  display: flex;
  padding-left: 5px;
`;
const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border: 1px solid #a5a5a5;
  border-radius: 9px;

  &:focus {
    outline: none;
    border: 1px solid #00e5fd;
  }

  &::placeholder {
    color: #a0a0a0;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px 15px 15px 15px;
  font-size: 19px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: white;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  margin-top: 45px;
  &:hover {
    background: linear-gradient(to right, #00ddf6, #00dbf2, #53cfce);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const PopupMessage = styled.p`
  font-size: 15px;
  padding: 30px 30px 70px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
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
`;

export default AddressForm;
