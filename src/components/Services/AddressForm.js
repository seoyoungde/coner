import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineDown } from "react-icons/ai";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const AddressForm = ({ title, description, buttonText, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    detailAddress: "",
    name: "",
    phone: "",
  });
  const [popupMessage, setPopupMessage] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length > 11) return;
      setFormData((prev) => ({
        ...prev,
        [name]: onlyNumbers,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddressSelect = (data) => {
    setFormData((prev) => ({
      ...prev,
      address: data.address,
    }));
    setIsAddressModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddressModalOpen) return;

    if (!formData.address) {
      setPopupMessage("주소를 선택해주세요.");
      return;
    }
    if (!formData.detailAddress) {
      setPopupMessage("상세 주소를 입력해주세요.");
      return;
    }
    if (!formData.name) {
      setPopupMessage("이름을 입력해주세요.");
      return;
    }
    if (!formData.phone) {
      setPopupMessage("전화번호를 입력해주세요.");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    navigate("/requestbasicinfo", { state: formData });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const closePopup = () => {
    setPopupMessage("");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleGoBack}>
          <IoIosArrowBack size={32} color="#333" />
        </BackButton>
      </Header>
      <TitleSection>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleSection>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>주소</Label>
          <SearchBox onClick={() => setIsAddressModalOpen(true)}>
            주소찾기
          </SearchBox>

          <CustomSelect>
            <Select
              name="address"
              value={formData.address}
              onChange={handleChange}
            >
              <option value="">주소를 선택해주세요</option>
              <option value="서울시 강북구">서울시 강북구</option>
              <option value="서울시 강남구">서울시 광진구</option>
              <option value="서울시 노원구">서울시 노원구</option>
              <option value="서울시 도봉구">서울시 도봉구</option>
              <option value="서울시 도봉구">서울시 동대문구</option>
              <option value="서울시 도봉구">서울시 성북구</option>
              <option value="서울시 도봉구">서울시 종로구</option>
              <option value="서울시 도봉구">서울시 중랑구</option>
            </Select>
            <AiOutlineDown size={20} />
          </CustomSelect>
          <HelperText>예시) 효자로12</HelperText>
          <Input
            type="text"
            name="detailAddress"
            placeholder="상세주소를 입력해주세요."
            value={formData.detailAddress}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>연락처</Label>
          <Input
            type="tel"
            name="phone"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
          />
        </Field>
        <SubmitButton type="submit">{buttonText}</SubmitButton>
      </Form>
      {isAddressModalOpen && (
        <AddressModal>
          <DaumPostcode onComplete={handleAddressSelect} />
          <CloseModalButton onClick={() => setIsAddressModalOpen(false)}>
            닫기
          </CloseModalButton>
        </AddressModal>
      )}
      {/* 팝업 */}
      {popupMessage && (
        <Popup>
          <PopupContent>
            <PopupMessage>{popupMessage}</PopupMessage>
            <CloseButton onClick={closePopup}>닫기</CloseButton>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};
const SearchBox = styled.button``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
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
  margin-bottom: 15px;
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
  background-color: #f9f9f9;

  svg {
    position: absolute;
    right: 10px;
    color: #a0a0a0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border: none;
  background-color: transparent;
  appearance: none;
  outline: none;
`;

const HelperText = styled.p`
  color: #a5a5a5;
  font-weight: bold;
  margin-bottom: 4px;
  margin-top: 10px;
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
  padding: 15px;
  font-size: 19px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: white;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  margin-top: 75px;
  &:hover {
    background: linear-gradient(to right, #00ddf6, #00dbf2, #53cfce);
  }
`;
const AddressModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const CloseModalButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: #ff5c5c;
  color: white;
  border-radius: 5px;
  cursor: pointer;
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
