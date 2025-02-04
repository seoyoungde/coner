import React from "react";
import styled from "styled-components";

const brands = [
  "삼성전자",
  "LG전자",
  "캐리어",
  "센추리",
  "귀뚜라미",
  "SK매직",
  "기타(추천 또는 모름)",
];

const BrandSelector = ({ selectedBrand, setSelectedBrand }) => {
  return (
    <BrandContainer>
      {brands.map((brand) => (
        <BrandButton
          key={brand}
          isSelected={selectedBrand === brand}
          onClick={() => setSelectedBrand(brand)}
        >
          {brand}
        </BrandButton>
      ))}
    </BrandContainer>
  );
};

export default BrandSelector;

const BrandContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const BrandButton = styled.button`
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #00e6fd" : "1px solid #ccc"};
  background: ${({ isSelected }) => (isSelected ? "#d0f7ff" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#00e6fd" : "#333")};
  cursor: pointer;
`;
