import React from "react";
import styled from "styled-components";

const HeaderMyPage = () => {
  return (
    <HeaderContainer>
      <Title>
        <img src="../conerlogo 2.png" alt="Coner 로고" />
      </Title>
      <SubTitle>고객센터</SubTitle>
    </HeaderContainer>
  );
};
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
`;

const Title = styled.div`
  font-size: 24px;
  color: #00c4cc;
  margin-left: 17px;
`;
const SubTitle = styled.div`
  margin: auto;
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export default HeaderMyPage;
