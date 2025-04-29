import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import { MdOutlineComment } from "react-icons/md";
import { useRequest } from "../../context/context";
import StepProgressBar from "../../components/Apply/StepProgressBar";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";

const AirConditionerForm = ({
  options,
  title,
  description,
  buttonText,
  onSubmit,
  boxWidths = ["45%", "45%"],
}) => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const { updateRequestData } = useRequest();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      setPopupMessage("에어컨 보유 여부를 선택해주세요.");
      return;
    }
    updateRequestData("detailInfo", selectedOption);

    navigate("/installpage2");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const closePopup = () => {
    setPopupMessage("");
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
          <BackButton onClick={handleGoBack}>
            <BackIcon>
              <IoIosArrowBack size={32} color="#333" />
            </BackIcon>
          </BackButton>
        </Header>
        <StepProgressBar currentStep={0} totalSteps={4} />
        <TitleSection>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TitleSection>
        <Form>
          <DropdownContainer>
            <DropdownHeader onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <DropdownLabelBox>
                <IconBox>
                  <MdOutlineComment size={23} />
                </IconBox>
                <DropdownLabel>
                  {selectedOption || "에어컨 보유 여부 선택하기"}
                </DropdownLabel>
              </DropdownLabelBox>
              <DropdownIcon>
                {isDropdownOpen ? (
                  <HiOutlineChevronUp size={25} color="#333" />
                ) : (
                  <HiOutlineChevronDown size={25} color="#333" />
                )}
              </DropdownIcon>
            </DropdownHeader>
            {isDropdownOpen && (
              <DropdownContent>
                {options.map((option, index) => (
                  <OptionBox
                    key={index}
                    isSelected={selectedOption === option}
                    onClick={() => handleOptionClick(option)}
                    width={boxWidths[index] || "45%"}
                  >
                    {option}
                  </OptionBox>
                ))}
              </DropdownContent>
            )}
          </DropdownContainer>
          <SubmitButton onClick={handleSubmit}>{buttonText}</SubmitButton>
        </Form>

        {popupMessage && (
          <Popup>
            <PopupContent>
              <PopupMessage>{popupMessage}</PopupMessage>
              <CloseButton onClick={closePopup}>닫기</CloseButton>
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
  margin-bottom: 25px;
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${device.mobile} {
    width: 86%;
    margin: auto;
  }
`;

const DropdownContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid #e3e3e3;
  border-radius: 9px;
  background-color: white;
`;

const DropdownHeader = styled.div`
  padding: 25px 20px 5px 20px;
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DropdownLabel = styled.div`
  color: #333;
  margin-left: 10px;
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;

const DropdownLabelBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconBox = styled(MdOutlineComment)`
  font-size: 30px;
`;

const DropdownIcon = styled.div`
  margin-left: 10px;
  color: #a0a0a0;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px 30px 20px;
  gap: 10px;
  justify-content: center;
`;

const OptionBox = styled.div`
  width: ${({ width }) => width};
  padding: 10px;
  border: 1.5px solid rgb(235, 235, 235);
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  background-color: ${({ isSelected }) => (isSelected ? "#01e6ff" : "#ffffff")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#333")};
  cursor: pointer;
  @media ${device.mobile} {
    width: 350px;
    font-size: 1.2rem;
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
  margin-top: 15px;

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

export default AirConditionerForm;
