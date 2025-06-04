import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

const StepProgressBar = ({ currentStep = 0, totalSteps = 4 }) => {
  const progressPercentage = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <Wrapper>
      <ProgressWrapper>
        <ProgressBar>
          <ProgressFill style={{ width: `${progressPercentage}%` }} />
        </ProgressBar>
        <StepText>
          {currentStep}/{totalSteps} step
        </StepText>
      </ProgressWrapper>
    </Wrapper>
  );
};

export default StepProgressBar;

const Wrapper = styled.div`
  width: 100%;
  padding: 8px 16px;
  margin: auto;
  margin-bottom: 0;
  margin-top: 0;
  @media ${device.mobile} {
    width: 92%;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e5e5e5;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 10px;
  @media ${device.mobile} {
    height: 10px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #0080ff;
  transition: width 0.3s ease;
`;

const StepText = styled.span`
  font-size: 15px;
  color: #a5a5a5;
  white-space: nowrap;
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;
