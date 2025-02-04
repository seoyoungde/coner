import React from "react";
import styled from "styled-components";

const services = ["청소", "설치", "이전", "수리", "철거"];

const ServiceSelector = ({ selectedService, setSelectedService }) => {
  return (
    <ServiceContainer>
      {services.map((service) => (
        <ServiceButton
          key={service}
          isSelected={selectedService === service}
          onClick={() => setSelectedService(service)}
        >
          {service}
        </ServiceButton>
      ))}
    </ServiceContainer>
  );
};

export default ServiceSelector;

const ServiceContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ServiceButton = styled.button`
  padding: 12px;
  border-radius: 20px;
  font-size: 14px;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #00e6fd" : "1px solid #ccc"};
  background: ${({ isSelected }) => (isSelected ? "#d0f7ff" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#00e6fd" : "#333")};
  cursor: pointer;
`;
