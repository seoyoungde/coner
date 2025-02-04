import React from "react";
import styled from "styled-components";

const ButtonGroupSelector = ({ options, selected, setSelected }) => {
  if (!options || options.length === 0) return null;

  return (
    <Container>
      {options.map((option) => (
        <Button
          key={option}
          isSelected={selected === option}
          onClick={() => setSelected(option)}
        >
          {option}
        </Button>
      ))}
    </Container>
  );
};

export default ButtonGroupSelector;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #00e6fd" : "1px solid #ccc"};
  background: ${({ isSelected }) => (isSelected ? "#d0f7ff" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#00e6fd" : "#333")};
  cursor: pointer;
`;
