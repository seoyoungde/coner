import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import { MdOutlineComment } from "react-icons/md";
import { device } from "../../styles/theme";

const TechnicianAdditionalDropSelected = ({
  options,
  placeholderText = "옵션 선택하기",
  boxPerRow = 2,
  isMultiSelect = false,
  onSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleOptionClick = (option) => {
    if (isMultiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
      onSelect([...selectedOptions, option].join(", "));
    } else {
      setSelectedOption(option);
      onSelect(option);
    }
  };

  return (
    <Container>
      <Form>
        <DropdownContainer>
          <DropdownHeader onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <DropdownLabelBox>
              <CommentIcon>
                <MdOutlineComment size={23} />
              </CommentIcon>
              <DropdownLabel>
                {isMultiSelect
                  ? selectedOptions.join(", ") || placeholderText
                  : selectedOption || placeholderText}
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
            <DropdownContent $boxPerRow={boxPerRow}>
              {options.map((option, index) => (
                <OptionBox
                  key={index}
                  $isSelected={
                    isMultiSelect
                      ? selectedOptions.includes(option)
                      : selectedOption === option
                  }
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </OptionBox>
              ))}
            </DropdownContent>
          )}
        </DropdownContainer>
      </Form>
    </Container>
  );
};

export default TechnicianAdditionalDropSelected;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  background-color: #ffffff;
  height: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: 1.5px solid #e3e3e3;
  border-radius: 9px;
  background-color: white;
`;
const CommentIcon = styled(MdOutlineComment)`
  @media ${device.mobile} {
    font-size: 24px;
  }
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

const DropdownLabelBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  margin-bottom: 10px;
`;

const DropdownLabel = styled.div`
  color: #333;
  margin-left: 10px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
  }
`;

const DropdownIcon = styled.div`
  color: #a0a0a0;
`;

const DropdownContent = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $boxPerRow }) => $boxPerRow}, 1fr);
  gap: 10px;
  padding: 12px;
  margin-bottom: 10px;
  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;
const OptionBox = styled.div`
  padding: 10px;
  width: ${({ width }) => width};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-align: center;
  border: 1px solid #d6d6d6;

  background: ${({ $isSelected }) => ($isSelected ? "#0080FF" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#333")};
  cursor: pointer;
  white-space: nowrap;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
  }
`;
