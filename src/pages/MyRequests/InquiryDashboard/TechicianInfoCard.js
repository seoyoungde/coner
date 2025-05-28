import React from "react";
import styled from "styled-components";
import { device } from "../../../styles/theme";

const TechnicianInfoCard = ({ requestData }) => {
  return (
    <Card>
      <Title>배정된 기사님 정보</Title>
      <ProfileImage
        src={requestData.engineerProfileImage || "default-profile.jpg"}
        alt="기사님 사진"
      />
      <Name>{requestData.engineerName || "배정된 기사 없음"}</Name>
      <Contact>
        <Phone>{requestData.engineerPhone || "없음"}</Phone>
      </Contact>
      <Company>
        <CompanyName>{requestData.companyName || "업체 정보 없음"}</CompanyName>
        <CompanyAddress>
          {requestData.companyAddress || "주소 정보 없음"}
        </CompanyAddress>
      </Company>
      <Footer>
        <DateTag>기사님 승인날짜</DateTag>
        <DateValue>
          {requestData.acceptanceDate || "접수완료시간없음"}
        </DateValue>
      </Footer>
      <Notice>
        진행 중인 의뢰는 기사님의 일정에 따라 변경되거나 취소될 수 있습니다
      </Notice>
    </Card>
  );
};

export default TechnicianInfoCard;

const Card = styled.div`
  background: #f9f9f9;
  padding-top: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  @media ${device.mobile} {
    font-size: 1.7rem;
  }
`;

const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ddd;
  margin: 0 auto;
  @media ${device.mobile} {
    width: 125px;
    height: 125px;
  }
`;

const Name = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
  @media ${device.mobile} {
    font-size: 1.8rem;
  }
`;

const Contact = styled.div`
  margin-top: 10px;
`;

const Phone = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

const Company = styled.div`
  margin-top: 10px;
`;

const CompanyName = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #666;
  @media ${device.mobile} {
    font-size: 1.5rem;
  }
`;

const CompanyAddress = styled.p`
  font-size: 12px;
  color: #999;
  @media ${device.mobile} {
    font-size: 1.3rem;
  }
`;

const Footer = styled.div`
  background: #00e6fd;
  padding: 30px 20px;
  border-radius: 0 0 10px 10px;
  color: white;
  font-weight: bold;
`;

const DateTag = styled.span`
  display: inline-block;
  background: #00e6fd;
  font-size: 17px;
  padding: 5px 10px;
  border-radius: 15px;
  margin-bottom: 5px;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

const DateValue = styled.div`
  font-size: 16px;
  @media ${device.mobile} {
    font-size: 1.6rem;
  }
`;

const Notice = styled.p`
  font-size: 15px;
  margin-top: 12px;
  @media ${device.mobile} {
    font-size: 1.3rem;
  }
`;
