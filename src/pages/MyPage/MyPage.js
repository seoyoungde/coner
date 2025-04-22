import React from "react";
import styled from "styled-components";
import HeaderMyPage from "../../components/layout/HeaderMyPage";
import MyPagesection from "./MyPagesection";

const MyPage = () => {
  return (
    <Container>
      <HeaderMyPage />
      <MyPagesection />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;
export default MyPage;
