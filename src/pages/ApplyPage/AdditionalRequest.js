import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RequestDetails from "../../components/Apply/RequestDetails";
import styled from "styled-components";
import FormLayout from "../../components/Apply/FormLayout";

const AdditionalRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, selectedTime, selectedService, selectedBrand } =
    location.state || {};

  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = () => {
    console.log({
      selectedDate,
      selectedTime,
      selectedService,
      selectedBrand,
      additionalInfo,
    });
  };

  return (
    <FormLayout
      title="추가 요청사항"
      subtitle="추가적으로 작성할 내용이 있나요?"
    >
      <Container>
        <RequestDetails
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
        />

        <ServiceCostContainer>
          <CostTitle>서비스 기본 비용</CostTitle>
          <CostDescription>
            견적을 위해 기사님이 방문한 후, 서비스를 취소하시면 아래 비용이
            발생할 수 있어요.
          </CostDescription>
          <CostTable>
            <CostRow>
              <CostLabel>출장비</CostLabel>
              <CostValue>
                2만원 ~ 5만원
                <SmallText>(근무 외 시간 : 1.5배, 주말 : 2배)</SmallText>
              </CostValue>
            </CostRow>
            <CostRow>
              <CostLabel>제품 분해·조립비</CostLabel>
              <CostValue>7만원</CostValue>
            </CostRow>
          </CostTable>
        </ServiceCostContainer>

        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </Container>
    </FormLayout>
  );
};

export default AdditionalRequest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ServiceCostContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
`;

const CostTitle = styled.p`
  font-size: 17px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 5px;
`;

const CostDescription = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const CostTable = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const CostLabel = styled.p`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const CostValue = styled.p`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: 16px;
  text-align: right;
`;

const SmallText = styled.span`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  display: block;
  margin-top: 3px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  font-size: 18px;
  color: white;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
  font-weight: bold;
  &:hover {
    background: linear-gradient(to right, #00ddf6, #00dbf2, #53cfce);
  }
`;
