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
import Popup from "../Apply/Popup";

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

  const handleSubmit = async () => {
    if (!selectedOption) {
      setPopupMessage("에어컨 보유 여부를 선택해주세요.");
      return;
    }

    updateRequestData("detailInfo", selectedOption);

    if (onSubmit) {
      onSubmit(selectedOption);
    }

    navigate("/installpage2");
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
            <IoIosArrowBack size={32} color="#333" />
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
                <MdOutlineComment size={23} />
                <DropdownLabel>
                  {selectedOption || "에어컨 보유 여부 선택하기"}
                </DropdownLabel>
              </DropdownLabelBox>
              {isDropdownOpen ? (
                <HiOutlineChevronUp size={25} />
              ) : (
                <HiOutlineChevronDown size={25} />
              )}
            </DropdownHeader>

            {isDropdownOpen && (
              <DropdownContent>
                {options.map((option, index) => (
                  <OptionBox
                    key={index}
                    $isSelected={selectedOption === option}
                    onClick={() => setSelectedOption(option)}
                    $width={boxWidths[index] || "45%"}
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
          <Popup onClose={() => setPopupMessage("")}>
            <PopupMessage>{popupMessage}</PopupMessage>
            <CloseButton onClick={() => setPopupMessage("")}>닫기</CloseButton>
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
  width: 95%;
  margin: auto;
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

const DropdownContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px 30px 20px;
  gap: 10px;
  justify-content: center;
`;

const OptionBox = styled.div`
  width: ${({ $width }) => $width};
  padding: 10px;
  border: 1.5px solid rgb(235, 235, 235);
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#0080FF" : "#ffffff"};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
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
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
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

export default AirConditionerForm;
