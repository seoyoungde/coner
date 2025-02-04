import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RequestReceived = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1); // 0: 접수 완료, 1: 기사님 배정 완료, 2: 오늘 방문
  const [isEditable, setIsEditable] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitDate: "2025-01-29 17:00 ~ 19:00",
    airconType: "천장형",
    service: "청소",
    brand: "캐리어",
    address: "서울시 강북구",
    detailaddress: "fff",
    phone: "01090395572",
    additionalInfo: "에어컨 구매까지 원해요\nss",
  });
  const [originalData, setOriginalData] = useState({ ...formData });
  const steps = [
    { label: "접수 완료", content: "접수가 완료되었습니다." },
    { label: "기사님 배정 완료", content: "기사님이 배정되었습니다." },
    { label: "오늘 방문", content: "기사님이 오늘 방문 예정입니다." },
  ];

  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handlePopupClose = () => {
    setIsCancelPopupOpen(false);
  };

  const handlePopupConfirm = () => {
    setFormData({ ...originalData });
    setIsEditable(false);
    setIsCancelPopupOpen(false);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
  };
  const handleCancelClick = () => {
    setIsCancelPopupOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRequestCancel = () => {
    navigate("/inquirydashboard");
  };

  return (
    <Container>
      <ProgressBar>
        {steps.map((step, index) => (
          <ProgressStep key={index}>
            <Circle isActive={index <= activeStep} />
            <StepLabel isActive={index === activeStep}>{step.label}</StepLabel>
            {index < steps.length - 1 && <Line isActive={index < activeStep} />}
          </ProgressStep>
        ))}
      </ProgressBar>

      <ContentBox>
        {activeStep === 1 && (
          <TechnicianCard>
            <TechnicianTitle>배정된 기사님 정보</TechnicianTitle>
            <ProfileImage />

            <Tag>10건 이상</Tag>
            <TechnicianName>홍길동 기사님</TechnicianName>

            <ContactInfo>
              <PhoneNumber>📞 010-1234-1234</PhoneNumber>
              <CallButton>전화 연결</CallButton>
            </ContactInfo>
            <CompanyInfo>
              <CompanyTitle>📦 코너-에어컨 서비스 플랫폼</CompanyTitle>
              <CompanyAddress>서울특별시 중랑구 중랑천로 어쩌구</CompanyAddress>
            </CompanyInfo>
            <TechnicianFooter>
              <ApprovalDate>
                기사님 승인 날짜{" "}
                <span style={{ fontSize: "16px" }}>2023년 12월 24일</span>
              </ApprovalDate>
              <ChangeRequestButton>변경 요청하기 ›</ChangeRequestButton>
            </TechnicianFooter>
          </TechnicianCard>
        )}
        <Section>
          <Label>방문 희망 일자</Label>
          {isEditable ? (
            <Input
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
            />
          ) : (
            <Value>{formData.visitDate}</Value>
          )}
        </Section>

        <Section>
          <Label>서비스 받을 에어컨</Label>
          {isEditable ? (
            <Input
              name="airconType"
              value={formData.airconType}
              onChange={handleInputChange}
            />
          ) : (
            <Value>{formData.airconType}</Value>
          )}
        </Section>

        <Section>
          <Label>원하는 서비스</Label>
          {isEditable ? (
            <Input
              name="service"
              value={formData.service}
              onChange={handleInputChange}
            />
          ) : (
            <Value>{formData.service}</Value>
          )}
        </Section>

        <Section>
          <Label>브랜드</Label>
          {isEditable ? (
            <Input
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          ) : (
            <Value>{formData.brand}</Value>
          )}
        </Section>

        <Section>
          <Label>주소</Label>
          {isEditable ? (
            <>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Input
                name="detailaddress"
                value={formData.detailaddress}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <Value style={{ marginBottom: "10px" }}>{formData.address}</Value>
              <Value>{formData.detailaddress}</Value>
            </>
          )}
        </Section>

        <Section>
          <Label>연락처</Label>
          {isEditable ? (
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          ) : (
            <Value>{formData.phone}</Value>
          )}
        </Section>

        <Section>
          <Label>추가적인 정보와 요청사항</Label>
          {isEditable ? (
            <Textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          ) : (
            <Value>{formData.additionalInfo}</Value>
          )}
        </Section>
      </ContentBox>

      {!isEditable && activeStep === 0 && (
        <WarningText>
          의뢰서 수정은 기사님 배정 전까지만 가능합니다.
        </WarningText>
      )}

      {/* 🚀 버튼: 수정 가능 여부 및 단계에 따라 다르게 표시 */}
      {!isEditable && activeStep === 0 && (
        <ButtonGroup>
          <CancelButton onClick={handleRequestCancel}>의뢰 취소</CancelButton>
          <EditButton onClick={handleEditClick}>수정하기</EditButton>
        </ButtonGroup>
      )}

      {isEditable && (
        <ButtonGroup style={{ marginTop: "30px" }}>
          <EditCancelButton onClick={handleCancelClick}>취소</EditCancelButton>

          <SaveButton onClick={handleSaveClick}>수정완료</SaveButton>
        </ButtonGroup>
      )}
      {isCancelPopupOpen && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>취소 시 수정 내용이 초기화됩니다.</PopupText>
            <PopupButtons>
              <PopupButton onClick={handlePopupClose} secondary>
                수정 화면으로
              </PopupButton>
              <PopupButton onClick={handlePopupConfirm}>확인</PopupButton>
            </PopupButtons>
          </PopupContainer>
        </PopupOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  margin: auto;
  height: 100%;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "#00e6fd" : "#ddd")};
`;

const Line = styled.div`
  width: 50px;
  height: 2px;
  background-color: ${({ isActive }) => (isActive ? "#00e6fd" : "#ddd")};
  margin: 0 5px;
`;

const StepLabel = styled.div`
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  color: ${({ isActive }) => (isActive ? "#00e6fd" : "#666")};
  margin-top: 5px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;
const TechnicianCard = styled.div`
  background: #f9f9f9;
  padding-top: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

const TechnicianTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;
const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ddd;
  margin: 0 auto;
`;

const Tag = styled.span`
  display: inline-block;
  background: #00e6fd;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 15px;
  margin-top: 10px;
`;
const TechnicianName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PhoneNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
`;
const CallButton = styled.button`
  background: #ddd;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const CompanyInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const CompanyTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

const CompanyAddress = styled.p`
  font-size: 12px;
  color: #999;
`;
const TechnicianFooter = styled.div`
  background: #00e6fd;
  padding: 30px 20px 30px 20px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: white;
  font-weight: bold;
`;

const ApprovalDate = styled.div`
  font-size: 14px;
  span {
    font-weight: bold;
  }
`;

const ChangeRequestButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: white;
  cursor: pointer;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #333;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
`;

const Textarea = styled.textarea`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  resize: none;
`;

const WarningText = styled.p`
  text-align: center;
  color: #333;
  font-size: 14px;
  margin-top: 40px;
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #ff5c5c;
  color: white;
  border-radius: 10px;
  padding: 13px;
  font-size: 17px;
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const EditButton = styled.button`
  flex: 1;
  background-color: #ddd;
  color: white;
  border-radius: 10px;
  padding: 13px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const SaveButton = styled.button`
  flex: 1;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  color: white;
  border-radius: 10px;
  padding: 13px;
  font-size: 17px;
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const EditCancelButton = styled.div`
  flex: 1;
  background-color: #ddd;
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 13px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const PopupText = styled.p`
  font-size: 16px;
  color: #333;

  padding: 40px;
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PopupButton = styled.button`
  flex: 1;
  padding: 18px;
  border-radius: 0px 0px 0px 0px;
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: 14px;
  background: ${({ secondary }) => (secondary ? "#ddd" : "#00e6fd")};
  color: white;
`;
export default RequestReceived;
