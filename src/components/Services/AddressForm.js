import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useRequest } from "../../context/context";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import StepProgressBar from "../../components/Apply/StepProgressBar";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import Popup from "../Apply/Popup";
import { useAuth } from "../../context/AuthProvider";

const AddressForm = ({ title, description, buttonText }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateRequestData } = useRequest();
  const { scale, height, ref } = useScaleLayout();
  const { currentUser, userInfo, loading } = useAuth();

  const isLoggedIn = !!currentUser;
  const isReadOnly = isLoggedIn && !!userInfo;

  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    clientAddress: "",
    clientDetailedAddress: "",
    clientPhone: "",
  });

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        clientAddress: location.state.selectedAddress,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        clientAddress: userInfo.clientaddress || "",
        clientDetailedAddress: userInfo.clientdetailedaddress || "",
        clientPhone: userInfo.clientphone || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isReadOnly) return;
    if (name === "clientPhone") {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length > 11) return;
      setFormData((prev) => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatPhoneToInternational = (phone) => {
    const onlyNumbers = phone.replace(/\D/g, "");
    return onlyNumbers.startsWith("0")
      ? "+82" + onlyNumbers.slice(1)
      : onlyNumbers;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientAddress) return setPopupMessage("주소를 선택해주세요.");
    if (!formData.clientDetailedAddress)
      return setPopupMessage("상세주소를 입력해주세요.");
    if (!formData.clientPhone)
      return setPopupMessage("전화번호를 입력해주세요.");

    const formattedPhone = formatPhoneToInternational(formData.clientPhone);
    updateRequestData("clientAddress", formData.clientAddress);
    updateRequestData("clientDetailedAddress", formData.clientDetailedAddress);
    updateRequestData("clientPhone", formattedPhone);

    navigate("/selectservicedate");
  };

  const goToAddressSearch = () => {
    if (!isReadOnly) {
      navigate("/addressmodal", { state: { prevPath: location.pathname } });
    }
  };

  const goToModifyInfo = () => {
    navigate("/infomodify");
  };

  const closePopup = () => {
    setPopupMessage("");
  };

  if (loading) return <div>로딩 중...</div>;

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
            <Label>
              주소
              {isReadOnly && (
                <ModifyLink onClick={goToModifyInfo}>
                  내 정보 수정하러가기
                </ModifyLink>
              )}
            </Label>
            <HelperTextBox>
              <HelperIcon>
                <HiOutlineExclamationCircle color=" #a5a5a5" size="18" />
              </HelperIcon>
              <HelperText>
                현재 서비스 제공 지역은 서울 강북권 일부로 제한되어 있습니다.
                <br />
                강북구, 광진구, 노원구, 동대문구, 성북구, 도봉구, 은평구,
                중랑구, 종로구
              </HelperText>
            </HelperTextBox>
            <CustomSelect>
              <Input
                type="text"
                name="clientAddress"
                placeholder="클릭하여 주소 검색"
                style={{ border: "none" }}
                value={formData.clientAddress}
                onClick={!isReadOnly ? goToAddressSearch : undefined}
                readOnly={isReadOnly}
              />
            </CustomSelect>

            <Input
              type="text"
              name="clientDetailedAddress"
              placeholder="상세주소"
              value={formData.clientDetailedAddress}
              onChange={handleChange}
              readOnly={isReadOnly}
              style={{ marginTop: "10px" }}
            />
          </Field>

          <Field>
            <Label>
              연락처
              {isReadOnly && (
                <ModifyLink onClick={goToModifyInfo}>
                  내 정보 수정하러가기
                </ModifyLink>
              )}
            </Label>
            <Input
              type="tel"
              name="clientPhone"
              placeholder="전화번호"
              value={formData.clientPhone}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>

          <SubmitButton type="submit">{buttonText}</SubmitButton>
        </Form>

        {popupMessage && (
          <Popup onClose={closePopup}>
            <PopupMessage>{popupMessage}</PopupMessage>
            <CloseButton onClick={closePopup}>닫기</CloseButton>
          </Popup>
        )}
      </Container>
    </ScaleWrapper>
  );
};

const ScaleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
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
  padding-left: 20px;
  padding-top: 10px;
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:50px;
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
  @media ${device.mobile} {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const Form = styled.form`
  width: 95%;
  margin: auto;
  @media ${device.mobile} {
    width: 86%;
    margin: auto;
  }
`;

const Field = styled.div`
  margin-bottom: 45px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
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
  @media ${device.mobile} {
    font-size: 1rem;
  }
`;
const HelperTextBox = styled.div`
  display: flex;
  padding-left: 5px;
`;
const HelperIcon = styled(HiOutlineExclamationCircle)`
  font-size: 1.5rem;
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
    @media ${device.mobile} {
      font-size: 1.4rem;
    }
  }
  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 1.3rem;
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
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
  }
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
const ModifyLink = styled.a``;
export default AddressForm;
