import React from "react";
import styled from "styled-components";
import { useScaleLayout } from "../hooks/useScaleLayout";

const PricingPage = () => {
  const { scale, height, ref } = useScaleLayout();

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <InnerWrapper>
          <h1 style={{ textAlign: "center" }}>서비스 비용 안내</h1>
        </InnerWrapper>
        <ImageWrapper>
          <img src="../pricing-chart.png" alt="서비스 비용 도표" />
        </ImageWrapper>
      </Container>
    </ScaleWrapper>
  );
};

export default PricingPage;

const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const InnerWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #d4d4d4;
  padding: 15px;
`;
const Container = styled.div`
  width: 100%;

  h1 {
    font-size: ${({ theme }) => theme.fonts.sizes.HeaderText || "16px"};
    font-weight: ${({ theme }) => theme.fonts.weights.bold || 600};
  }
`;

const ImageWrapper = styled.div`
  margin-top: 40px;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;
