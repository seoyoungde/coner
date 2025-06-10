import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  const { updateRequestData } = useRequest();
  const { scale, height, ref } = useScaleLayout();
  const { currentUser, userInfo, loading } = useAuth();

  const isLoggedIn = !!currentUser;
  const isReadOnly = isLoggedIn && !!userInfo;
  const [job, setJob] = useState(userInfo?.job || "");

  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    customer_address: "",
    customer_address_detail: "",
    customer_phone: "",
  });

  useEffect(() => {
    const restoredService =
      location.state?.selectedService || searchParams.get("service_type");
    if (restoredService) {
      updateRequestData("service_type", restoredService);
    }
  }, [location.state, searchParams]);

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        customer_address: location.state.selectedAddress,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        customer_address: userInfo.address || "",
        customer_address_detail: userInfo.address_detail || "",
        customer_phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isReadOnly) return;

    if (name === "customer_phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

      let formatted = onlyNumbers;
      if (onlyNumbers.length >= 4 && onlyNumbers.length < 8) {
        formatted = onlyNumbers.slice(0, 3) + "-" + onlyNumbers.slice(3);
      } else if (onlyNumbers.length >= 8) {
        formatted =
          onlyNumbers.slice(0, 3) +
          "-" +
          onlyNumbers.slice(3, 7) +
          "-" +
          onlyNumbers.slice(7);
      }

      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer_address)
      return setPopupMessage("주소를 선택해주세요.");
    if (!formData.customer_address_detail)
      return setPopupMessage("상세주소를 입력해주세요.");
    if (!formData.customer_phone)
      return setPopupMessage("전화번호를 입력해주세요.");

    const formattedPhone = formData.customer_phone.replace(/\D/g, "");
    updateRequestData("customer_address", formData.customer_address);
    updateRequestData(
      "customer_address_detail",
      formData.customer_address_detail
    );
    updateRequestData("customer_phone", formattedPhone);
    updateRequestData("sprint", [job]);
    navigate(`/selectservicedate?service=${searchParams.get("service_type")}`);
  };

  const goToAddressSearch = () => {
    if (!isReadOnly) {
      navigate("/addressmodal", {
        state: {
          prevPath: location.pathname,
          selectedService: searchParams.get("service_type"),
        },
      });
    }
  };

  const goToModifyInfo = () => {
    navigate("/infomodify", {
      state: {
        from: "addressform",
      },
    });
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
          <BackButton onClick={() => navigate("/")}>
            <BackIcon>
              <IoIosArrowBack size={32} color="#333" />
            </BackIcon>
          </BackButton>
        </Header>

        <StepProgressBar currentStep={1} totalSteps={4} />
        <TitleSection>
          <Title>
            {title || `${searchParams.get("service_type")} 서비스 신청`}
          </Title>
          <Description>{description}</Description>
        </TitleSection>

        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>주소</Label>
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
            {isReadOnly && (
              <ModifyLink onClick={goToModifyInfo}>
                내 정보 (주소 / 전화번호 /직업) 수정하러가기
              </ModifyLink>
            )}
            <CustomSelect>
              <Input
                type="text"
                name="customer_address"
                placeholder="클릭하여 주소 검색"
                style={{ border: "none" }}
                value={formData.customer_address}
                readOnly={isReadOnly}
                onChange={isReadOnly ? undefined : handleChange}
                onClick={!isReadOnly ? goToAddressSearch : undefined}
              />
            </CustomSelect>

            <Input
              type="text"
              name="customer_address_detail"
              placeholder="상세주소"
              value={formData.customer_address_detail}
              onChange={handleChange}
              readOnly={isReadOnly}
              style={{ marginTop: "10px" }}
            />
          </Field>

          <Field>
            <Label>연락처</Label>
            <Input
              type="tel"
              name="customer_phone"
              placeholder="전화번호"
              value={formData.customer_phone}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
          <Field>
            <Label>직업</Label>
            {isReadOnly ? (
              <Input value={job} readOnly />
            ) : (
              <JobButtonBox>
                {["개인사업자", "법인사업자", "프리랜서"].map((item) => (
                  <JobButton
                    key={item}
                    $isSelected={job === item}
                    onClick={() => setJob(item)}
                    type="button"
                  >
                    {item}
                  </JobButton>
                ))}
              </JobButtonBox>
            )}
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
  margin-top: 10px;

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
    font-size: 1.3rem;
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
    border: 1px solid #0080ff;
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
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  margin-top: 45px;
  &:hover {
    background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  }
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 10px;
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
const ModifyLink = styled.a`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-decoration: underline;
  color: #a2a2a2;
  padding: 10px;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 1.2rem;
    margin-left: 1rem;
  }
`;
const JobButtonBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
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
    padding: 20px 0;
    font-size: 1.2rem;
  }
`;
export default AddressForm;
