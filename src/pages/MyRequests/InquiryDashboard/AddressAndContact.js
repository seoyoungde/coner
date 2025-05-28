import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/theme";

const AddressAndContact = ({ requestData }) => {
  return (
    <>
      <Section>
        <Label>주소</Label>
        <Value>{requestData.clientAddress || "없음"}</Value>
        <Value style={{ marginTop: "5px" }}>
          {requestData.clientDetailedAddress || "없음"}
        </Value>
      </Section>
      <Section>
        <Label>연락처</Label>
        <Value>{requestData.clientPhone || "없음"}</Value>
      </Section>
    </>
  );
};

export default AddressAndContact;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  margin-bottom: 5px;
  @media ${device.mobile} {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;
const Value = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  @media ${device.mobile} {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 15px;
    margin-top: 5px;
  }
`;
