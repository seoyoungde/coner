import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { FaSquare, FaCircle } from "react-icons/fa";

const Nav = () => {
  return (
    <Navbar>
      <NavbarContainer>
        <NavItem to="/" exact>
          <RiHomeFill />
          <p>홈</p>
        </NavItem>
        <NavItem to="/requests">
          <FaSquare />
          <p>내 의뢰서</p>
        </NavItem>
        <NavItem to="/mypage">
          <FaCircle />
          <p>마이페이지</p>
        </NavItem>
      </NavbarContainer>
    </Navbar>
  );
};

const Navbar = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 95px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-top: 1px solid #d4d4d4;
  border-radius: 30px 30px 0px 0px;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
`;

const NavbarContainer = styled.div`
  width: 70%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  text-decoration: none;

  p {
    font-size: 12px;
    color: #d9d9d9;
  }

  svg {
    font-size: 24px;
    color: #d9d9d9;
  }

  &.active {
    p {
      color: #00e5fd;
    }
    svg {
      color: #00e5fd;
    }
  }

  &:hover {
    p {
      color: #00e5fd;
    }
    svg {
      color: #00e5fd;
    }
  }
`;

export default Nav;
