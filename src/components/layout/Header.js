import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";

const Header = () => {
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
        <HeaderContainer>
          <Title>
            <img src="../conerlogo.png" alt="Coner 로고" />
          </Title>
        </HeaderContainer>
      </Container>
    </ScaleWrapper>
  );
};
const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  height: 31px;
  box-sizing: border-box;
`;
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;

  @media ${device.mobile} {
    padding: 0 0.5rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  display: flex;
  img {
    width: 110px;
    height: auto;
    object-fit: contain;
    @media ${device.mobile} {
      width: 150px;
    }
  }
`;
export default Header;
