import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import conerlogo2Icon from "../../assets/images/logo/conerlogo 2.png";

const HeaderRequest = () => {
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
          <Logo src={conerlogo2Icon} alt="Coner 로고" />
          <SubTitle>의뢰서 조회</SubTitle>
          <Spacer />
        </InnerWrapper>
      </Container>
    </ScaleWrapper>
  );
};

const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.header`
  width: 100%;
  height: 65px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #d4d4d4;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media ${device.mobile} {
    width: 100%;
    height: 80px;
    border-radius: 0px 0px 28px 28px;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;
  @media ${device.mobile} {
    width: 95%;
  }
`;

const Logo = styled.img`
  height: 33px;
  @media ${device.mobile} {
    height: 45px;
  }
`;

const Spacer = styled.div`
  width: 22px;
`;

const SubTitle = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText || "16px"};
  font-weight: ${({ theme }) => theme.fonts.weights.bold || 600};
  margin: 0;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

export default HeaderRequest;
