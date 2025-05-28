import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/theme";

const ProgressTracker = ({ steps, currentState }) => {
  return (
    <ProgressBar>
      {steps.map((step, index) => (
        <ProgressStep key={index}>
          <Circle $isActive={index + 1 <= currentState} />
          <StepLabel $isActive={index + 1 === currentState}>
            {step.label}
          </StepLabel>
          {index < steps.length - 1 && (
            <Line $isActive={index + 1 < currentState} />
          )}
        </ProgressStep>
      ))}
    </ProgressBar>
  );
};

export default ProgressTracker;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#00e6fd" : "#ddd")};
  @media ${device.mobile} {
    width: 15px;
    height: 15px;
  }
`;

const Line = styled.div`
  width: 50px;
  height: 2px;
  background-color: ${({ $isActive }) => ($isActive ? "#00e6fd" : "#ddd")};
  margin: 0 5px;
  @media ${device.mobile} {
    width: 30px;
  }
`;

const StepLabel = styled.div`
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  color: ${({ $isActive }) => ($isActive ? "#00e6fd" : "#666")};
  margin-top: 5px;
  @media ${device.mobile} {
    font-size: 1.2rem;
  }
`;
