import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

const DropdownSelector = ({
  icon,
  title,
  options,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  optionWidths = [],
}) => {
  return (
    <Container>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <TitleContainer>
          {icon && <IconWrapper>{icon}</IconWrapper>}
          <Title>{title}</Title>
        </TitleContainer>
        {isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      </Header>
      {isOpen && options && (
        <Options>
          {options.map((option, index) => (
            <Option
              key={option}
              isSelected={selected === option}
              onClick={() => setSelected(option)}
              width={optionWidths[index] || "auto"}
            >
              {option}
            </Option>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default DropdownSelector;

const Container = styled.div`
  width: 100%;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  background: white;
  cursor: pointer;
`;

const Header = styled.div`
  padding: 30px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
`;
const IconWrapper = styled.div``;
const Title = styled.span`
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const Options = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Option = styled.div`
  padding: 10px;
  width: ${({ width }) => width};
  border-radius: 20px;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-align: center;
  border: 1px solid #d6d6d6;
  background: ${({ isSelected }) => (isSelected ? "#00E5FD" : "white")};
  color: ${({ isSelected }) => (isSelected ? "white" : "#333")};
  cursor: pointer;
  white-space: nowrap;
`;
