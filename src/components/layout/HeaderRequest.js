import React from "react";
import styled from "styled-components";

const HeaderRequest = () => {
  return (
    <HeaderContainer>
      <Title>
        <img src="../conerlogo 2.png" alt="Coner 로고" />
      </Title>
      <SubTitle>비회원님의 의뢰서</SubTitle>
    </HeaderContainer>
  );
};
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
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

export default HeaderRequest;
