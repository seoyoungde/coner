import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Title>
        <img src="../conerlogo.png" alt="Coner 로고" />
      </Title>
    </HeaderContainer>
  );
};
const HeaderContainer = styled.header``;

const Title = styled.h1`
  font-size: 24px;
  color: #00c4cc;
  margin-left: 17px;

  @media (max-width: 600px) {
    width: 78%;
    margin: auto;
  }
`;

export default Header;
