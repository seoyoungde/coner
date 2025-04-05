import React from "react";
import styled from "styled-components";
import HeaderMyPage from "../../components/layout/HeaderMyPage";
import MyPagesection from "./MyPagesection";

const MyPage = () => {
  return (
    <div>
      <HeaderBox>
        <HeaderMyPage />
      </HeaderBox>
      <MyPagesection />
    </div>
  );
};
const HeaderBox = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;
export default MyPage;
