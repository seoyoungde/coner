import React from "react";
import AdditionalDropSelected from "../../../components/Services/AdditionalDropSelected";
import RequestDetails from "../../../components/Apply/RequestDetails";
import styled from "styled-components";
import { device } from "../../../styles/theme";

const AdditionalRequestSection = ({
  isEditing,
  selectedService,
  additionalInfo,
  setAdditionalInfo,
  setSelectedDropdownOption,
  setSelectedAirconditionerform,
}) => {
  if (!isEditing) {
    return (
      <Section style={{ whiteSpace: "pre-line" }}>
        <Label>추가요청사항</Label>
        <Value>{additionalInfo || "없음"}</Value>
      </Section>
    );
  }

  return (
    <Section style={{ whiteSpace: "pre-line" }}>
      {["청소", "철거", "점검", "냉매 충전"].includes(selectedService) && (
        <RequestDetails
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
        />
      )}
      {selectedService === "수리" && (
        <>
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
            isMultiSelect
            onSelect={setSelectedDropdownOption}
          />
          <Label>추가요청사항</Label>
          <RequestDetails
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        </>
      )}
      {selectedService === "설치" && (
        <>
          <AdditionalDropSelected
            options={[
              "에어컨 구매까지 원해요",
              "에어컨은 있어요. 설치 서비스만 원해요",
            ]}
            placeholderText="에어컨 구매 여부 선택하기"
            boxPerRow={2}
            onSelect={setSelectedAirconditionerform}
          />
          <AdditionalDropSelected
            options={["앵글 설치가 필요해요.", "앵글 설치는 필요 없어요."]}
            placeholderText="앵글 설치 여부 선택하기"
            boxPerRow={2}
            onSelect={setSelectedDropdownOption}
          />
          <Label>추가요청사항</Label>
          <RequestDetails
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        </>
      )}
      {selectedService === "이전" && (
        <>
          <AdditionalDropSelected
            options={["앵글 설치가 필요해요.", "앵글 설치는 필요 없어요."]}
            placeholderText="앵글 설치 여부 선택하기"
            boxPerRow={2}
            onSelect={setSelectedDropdownOption}
          />
          <Label>추가요청사항</Label>
          <RequestDetails
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        </>
      )}
    </Section>
  );
};

export default AdditionalRequestSection;
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
