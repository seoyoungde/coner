import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { FaSquare, FaCircle } from "react-icons/fa";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";

const Nav = () => {
  const { scale, height, ref } = useScaleLayout();
  const location = useLocation();

  const isRequestsActive =
    location.pathname === "/requests" ||
    location.pathname === "/inquirydashboard";

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <NavbarContainer>
          <NavItem to="/">
            <RiHomeFill />
            <p>홈</p>
          </NavItem>
          <NavItem to="/requests" className={isRequestsActive ? "active" : ""}>
            <FaSquare />
            <p>내 의뢰서</p>
          </NavItem>
          <NavItem to="/mypage">
            <FaCircle />
            <p>마이페이지</p>
          </NavItem>
        </NavbarContainer>
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
  bottom: 0;
  left: 0;
  width: 100%;
  height: 95px;
  background-color: white;
  display: flex;
  align-items: center;
  z-index: 10;
  border-top: 1px solid #d4d4d4;
  border-radius: 30px 30px 0px 0px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
  @media ${device.mobile} {
    height: 100px;
    border-radius: 40px 40px 0px 0px;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  text-decoration: none;
  width: 34%;

  p {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    color: #d9d9d9;
    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    }
  }

  svg {
    font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
    color: #d9d9d9;
    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.mobilesizes.mediumlarge};
    }
  }

  &.active {
    p {
      font-size: ${({ theme }) => theme.fonts.sizes.medium};
      color: #0080ff;
      @media ${device.mobile} {
        font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
      }
    }
    svg {
      font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
      color: #0080ff;
      @media ${device.mobile} {
        font-size: ${({ theme }) => theme.fonts.mobilesizes.mediumlarge};
      }
    }
  }
`;

export default Nav;
