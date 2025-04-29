import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

const RequestDetails = ({ additionalInfo, setAdditionalInfo }) => {
  return (
    <Container>
      <Label>요청사항</Label>
      <Textarea
        placeholder="고장 증상, 실외기 위치 등 추가적인 정보를 입력해주세요."
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
      />
    </Container>
  );
};

export default RequestDetails;

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 8px;
  text-align: left;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
  height: 120px;
  outline: none;
  background: white;
  font-weight: bold;
  &::placeholder {
    color: #aaa;
    @media ${device.mobile} {
      font-size: 1.3rem;
    }
  }
`;
