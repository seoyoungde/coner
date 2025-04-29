import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

const CompletedRequests = ({ requestData }) => {
  if (!requestData) {
    return <CenteredContent>완료된 의뢰가 없습니다.</CenteredContent>;
  }

  return (
    <RequestList>
      <RequestCard>
        <RequestHeader>
          <Date>{requestData.completionDate || "날짜 없음"}</Date>
          <Technician>{requestData.engineerName || "기사님 없음"}</Technician>
        </RequestHeader>
        <RequestDetails>
          <TagContainer>
            <Category>{requestData.service || "서비스 없음"}</Category>
            <Service>{requestData.aircon || "에어컨 종류 없음"}</Service>
          </TagContainer>
          <Address>{requestData.clientAddress || "주소 없음"}</Address>
        </RequestDetails>
      </RequestCard>
    </RequestList>
  );
};

const CenteredContent = styled.div`
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;
const RequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const RequestCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 10px;
`;

const RequestHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 18px;
  @media ${device.mobile} {
    gap: 15px;
  }
`;

const Date = styled.div`
  font-size: 14px;
  color: #a0a0a0;
  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

const Technician = styled.div`
  font-size: 14px;
  color: #a0a0a0;
  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

const RequestDetails = styled.div`
  display: flex;
  flex-direction: row;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const Category = styled.div`
  font-size: 12px;
  background-color: #00e6fd;
  color: white;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: bold;
  @media ${device.mobile} {
    font-size: 1.3rem;
    padding: 8px 14px;
  }
`;

const Service = styled.div`
  font-size: 12px;
  background-color: #d9d9d9;
  color: white;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: bold;
  @media ${device.mobile} {
    font-size: 1.3rem;
    padding: 8px 14px;
  }
`;

const Address = styled.div`
  font-size: 14px;
  color: #333;
  padding: 5px 10px;
  @media ${device.mobile} {
    font-size: 1.4rem;
  }
`;

export default CompletedRequests;
