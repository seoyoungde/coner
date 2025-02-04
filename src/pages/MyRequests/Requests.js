import React from "react";
import styled from "styled-components";
import HeaderRequest from "../../components/layout/HeaderRequest";
import RequestSearch from "./RequestSearch";

const Requests = () => {
  return (
    <div>
      <HeaderBox>
        <HeaderRequest />
      </HeaderBox>
      <RequestSearch />
    </div>
  );
};
const HeaderBox = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
export default Requests;
