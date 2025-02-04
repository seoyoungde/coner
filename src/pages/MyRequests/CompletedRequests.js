import React from "react";
import styled from "styled-components";

const CompletedRequests = () => {
  const requests = [
    {
      date: "2023.12.29",
      technician: "홍길동 기사님",
      address: "서울특별시 성북구 안암로 145",
      service: "설치",
      category: "에어컨",
    },
    {
      date: "2023.12.29",
      technician: "홍길동 기사님",
      address: "서울특별시 성북구 안암로 145",
      service: "설치",
      category: "에어컨",
    },
  ];

  return (
    <RequestList>
      {requests.map((request, index) => (
        <RequestCard key={index}>
          <RequestHeader>
            <Date>{request.date}</Date>
            <Technician>{request.technician}</Technician>
          </RequestHeader>
          <RequestDetails>
            <TagContainer>
              <Category>{request.category}</Category>
              <Service>{request.service}</Service>
            </TagContainer>
            <Address>{request.address}</Address>
          </RequestDetails>
        </RequestCard>
      ))}
    </RequestList>
  );
};

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
`;

const Date = styled.div`
  font-size: 14px;
  color: #a0a0a0;
`;

const Technician = styled.div`
  font-size: 14px;
  color: #a0a0a0;
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
`;

const Service = styled.div`
  font-size: 12px;
  background-color: #d9d9d9;
  color: white;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: bold;
`;

const Address = styled.div`
  font-size: 14px;
  color: #333;
  padding: 5px 10px;
`;

export default CompletedRequests;
