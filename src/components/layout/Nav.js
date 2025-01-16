import React from "react";
import styled from "styled-components";
import { RiHomeFill } from "react-icons/ri";
import { FaSquare, FaCircle } from "react-icons/fa";

const Nav = () => {
  return (
    <Navbar>
      <NavbarContainer>
        <NavItem>
          <RiHomeFill />
          <p>홈</p>
        </NavItem>
        <NavItem>
          <FaSquare />
          <p>내 의뢰서</p>
        </NavItem>
        <NavItem>
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
  display: flex;
  max-width: 500px;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
`;
const Nav1 = styled.div``;
const Nav2 = styled.div``;
const Nav3 = styled.div``;
const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 5px;

  p {
    font-size: 12px;
    color: #d9d9d9;
  }

  svg {
    font-size: 24px;
    color: #d9d9d9;
  }

  &:hover {
    p {
      color: #d9d9d9;
    }
    svg {
      color: #d9d9d9;
    }
  }
`;

export default Nav;
