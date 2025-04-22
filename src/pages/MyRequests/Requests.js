import React from "react";
import styled from "styled-components";
import HeaderRequest from "../../components/layout/HeaderRequest";
import RequestSearch from "./RequestSearch";

const Requests = () => {
  return (
    <Container>
      <HeaderRequest />
      <RequestSearch />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;
export default Requests;
