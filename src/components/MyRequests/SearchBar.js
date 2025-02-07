import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f8f9fa;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
  background: transparent;
`;

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <SearchContainer>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchContainer>
  );
};

export default SearchBar;
