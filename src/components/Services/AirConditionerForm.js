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
        <Form>
          <StepProgressBar currentStep={0} totalSteps={4} />

          <TitleSection>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <InfoText>
              아직 에어컨이 없으시다면 걱정 마세요! 기사님이 직접 공간과 환경을
              확인한 뒤, 가장 적합한 제품을 추천해드립니다
            </InfoText>
          </TitleSection>

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
  padding-left: 10px;
  padding-top: 10px;
  @media ${device.mobile} {
    padding-left: 20px;
  }
`;

const TitleSection = styled.div`
  margin-top: 38px;
  margin-bottom: 25px;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  margin-bottom: 3px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.mediumlarge};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
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
  border-radius: 8px;
  background-color: white;
`;

const DropdownHeader = styled.div`
  padding: 25px 20px 5px 20px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
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
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
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
  border: 1.5px solid #ebebeb;
  border-radius: 20px;
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#0080FF" : "#ffffff"};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
  cursor: pointer;

  @media ${device.mobile} {
    width: 350px;
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: white;
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  }
  @media ${device.mobile} {
    height: 60px;
    margin-top: 20px;
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const PopupMessage = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  padding: 30px 30px 50px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    padding: 30px 10px 20px 20px;
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    padding: 15px;
  }
`;
const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: black;
  margin-top: 10px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    margin-bottom: 1rem;
  }
`;
export default AirConditionerForm;
