import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestDetails from "../../components/Apply/RequestDetails";
import styled from "styled-components";
import FormLayout from "../../components/Apply/FormLayout";
import { useRequest } from "../../context/context";
import AdditionalDropSelected from "../../components/Services/AdditionalDropSelected";
import StepProgressBar from "../../components/Apply/StepProgressBar";
import { IoIosArrowBack } from "react-icons/io";

const AdditionalRequest = () => {
  const navigate = useNavigate();
  const { requestData, updateRequestData, submitRequest } = useRequest();

  const [additionalInfo, setAdditionalInfo] = useState("");

  const needsAdditionalDropSelected = ["설치", "이전"].includes(
    requestData.service
  );
  const needsRepairAdditionalDropSelected = ["수리"].includes(
    requestData.service
  );
  const [selectedDropdownOption, setSelectedDropdownOption] = useState("");

  const handleSubmit = async () => {
    try {
      let formattedDetailInfo = "";

      if (["청소", "철거", "점검", "냉매 충전"].includes(requestData.service)) {
        formattedDetailInfo = additionalInfo.trim();
      } else if (requestData.service === "설치") {
        formattedDetailInfo =
          `${requestData.detailInfo}\n${selectedDropdownOption}\n${additionalInfo}`.trim();
      } else if (["이전", "수리"].includes(requestData.service)) {
        formattedDetailInfo =
          `${selectedDropdownOption}\n${additionalInfo}`.trim();
      }
      updateRequestData("selectedDropdownOption", selectedDropdownOption);

      await new Promise((resolve) => {
        updateRequestData("detailInfo", formattedDetailInfo);
        setTimeout(resolve, 300);
      });

      const requestId = await submitRequest({
        ...requestData,
        detailInfo: formattedDetailInfo,
      });

      navigate("/inquirydashboard", {
        state: {
          // clientId: requestData.clientId,
          clientPhone: requestData.clientPhone,
          requestId: requestId,
        },
      });
    } catch (error) {
      console.error("❌ 데이터 저장 중 오류 발생:", error);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={32} color="#333" />
        </BackButton>
      </Header>
      <StepProgressBar currentStep={4} totalSteps={4} />
      <FormLayout
        title="추가 요청사항"
        subtitle="추가적으로 작성할 내용이 있나요?"
      >
        <Container>
          {needsAdditionalDropSelected && (
            <AdditionalDropSelected
              options={["앵글 설치가 필요해요.", "앵글 설치는 필요 없어요."]}
              placeholderText="앵글 설치 여부 선택하기"
              boxPerRow={2}
              onSelect={(option) => setSelectedDropdownOption(option)}
            />
          )}
          {needsRepairAdditionalDropSelected && (
            <AdditionalDropSelected
              options={[
                "에어컨이 작동하지 않아요.",
                "에어컨에서 이상한 소리가 나요.",
                "에어컨 전원이 켜지지 않아요.",
                "에어컨에서 이상한 냄새가 나요.",
                "에어컨에서 물이 흘러나와요.",
                "에어컨이 부분적으로만 작동돼요.",
                "에어컨이 자동으로 꺼지거나 켜져요.",
                "에어컨 온도 조절이 잘 안돼요.",
                "기타",
              ]}
              placeholderText="에어컨 이상사항을 선택해주세요"
              boxPerRow={2}
              isMultiSelect={true}
              onSelect={(option) => setSelectedDropdownOption(option)}
            />
          )}
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
    </div>
  );
};

export default AdditionalRequest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 20px;
  padding-top: 10px;
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
