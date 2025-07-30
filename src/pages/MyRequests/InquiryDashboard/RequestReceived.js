import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../../context/context";
import CalendarPicker from "../../../components/Apply/CalendarPicker";
import TimeSlotPicker from "../../../components/Apply/TimeSlotPicker";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import DropdownSelector from "../../../components/Apply/DropdownSelector";
import AdditionalDropSelected from "../../../components/Services/AdditionalDropSelected";
import RequestDetails from "../../../components/Apply/RequestDetails";
import { db } from "../../../firebase";
import { GrApps, GrUserSettings, GrBookmark } from "react-icons/gr";
import { device } from "../../../styles/theme";
import { MdRefresh } from "react-icons/md";
import Popup from "../../../components/Apply/Popup";

const RequestReceived = ({
  requestData,
  onRealtimeUpdate,
  onDeleteRequest,
}) => {
  const navigate = useNavigate();
  const [localRequestData, setLocalRequestData] = useState(requestData);

  const { updateRequestData } = useRequest();
  const isMounted = useRef(true);
  const [requests, setRequests] = useState(requestData ? [requestData] : []);
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [selectedService_date, setSelectedService_date] = useState(
    requestData.service_date
  );
  const [selectedServcie_time, setSelectedService_time] = useState(
    requestData.service_time
  );
  const [selectedBrand, setSelectedBrand] = useState(requestData.brand);
  const [selectedService_type, setSelectedService_type] = useState(
    requestData.service_type
  );
  const [selectedAircon_type, setSelectedAircon_type] = useState(
    requestData.aircon_type
  );

  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [cancelRequestId, setCancelRequestId] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(
    requestData.detailInfo || ""
  );
  const [selectedDropdownOption, setSelectedDropdownOption] = useState("");
  const [selectedairconditionerform, setSelectedAirconditionerform] =
    useState("");

  const steps = [
    { label: "접수 완료", content: "접수가 완료되었습니다." },
    { label: "기사님 배정 완료", content: "기사님이 배정되었습니다." },
    { label: "오늘 방문", content: "기사님이 오늘 방문 예정입니다." },
  ];

  const handleEditClick = (requestId) => {
    setEditingRequestId(requestId);
    setSelectedDropdownOption(requestData.selectedDropdownOption || "");
    setSelectedAirconditionerform(requestData.selectedairconditionerform || "");
    setAdditionalInfo(requestData.detailInfo || "");
  };

  const handleCancelClick = () => {
    setEditingRequestId(null);
    setSelectedService_date(requestData.service_date);
    setSelectedService_time(requestData.service_time);
    setSelectedBrand(requestData.brand);
    setSelectedService_type(requestData.service_type);
    setSelectedAircon_type(requestData.aircon_type);
    setAdditionalInfo(requestData.detailInfo || "");
    setSelectedDropdownOption("");
    setSelectedAirconditionerform("");
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSaveClick = async (request) => {
    if (!request.id) return;

    let formattedDetailInfo = "";
    if (["청소", "철거", "점검", "냉매 충전"].includes(selectedService_type)) {
      formattedDetailInfo = additionalInfo;
    } else if (selectedService_type === "설치") {
      formattedDetailInfo = [
        selectedDropdownOption,
        additionalInfo,
        selectedairconditionerform,
      ]
        .filter(Boolean)
        .join("\n");
    } else if (["수리", "이전"].includes(selectedService_type)) {
      formattedDetailInfo = [additionalInfo, selectedDropdownOption]
        .filter(Boolean)
        .join("\n");
    }
    const updatedRequest = {
      ...request,
      service_date: selectedService_date,
      service_time: selectedServcie_time,
      servic_type: selectedService_type,
      brand: selectedBrand,
      aircon_type: selectedAircon_type,
      detailInfo: formattedDetailInfo,
    };
    try {
      const docRef = doc(db, "Request", request.id);
      await updateDoc(docRef, updatedRequest);

      if (isMounted.current) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === request.id
              ? { ...req, detailInfo: formattedDetailInfo }
              : req
          )
        );
        updateRequestData(request.id, {
          ...updatedRequest,
          detailInfo: formattedDetailInfo,
        });
        setAdditionalInfo(formattedDetailInfo);
        setEditingRequestId(null);
      }
    } catch (error) {
      console.error("Firestore 업데이트 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    setLocalRequestData(requestData);
  }, [requestData]);

  const handleRefresh = async () => {
    if (!requestData?.id) return;

    try {
      const docRef = doc(db, "Request", requestData.id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const updatedData = { id: snapshot.id, ...snapshot.data() };
        setLocalRequestData(updatedData);
        setSelectedService_date(updatedData.service_date);
        setSelectedService_time(updatedData.service_time);
        setSelectedBrand(updatedData.brand);
        setSelectedService_type(updatedData.service_type);
        setSelectedAircon_type(updatedData.aircon_type);
        setAdditionalInfo(updatedData.detailInfo || "");
        setSelectedDropdownOption(updatedData.selectedDropdownOption || "");
        setSelectedAirconditionerform(
          updatedData.selectedairconditionerform || ""
        );
        if (onRealtimeUpdate && typeof onRealtimeUpdate === "function") {
          onRealtimeUpdate(updatedData);
        }
      }
    } catch (error) {
      console.error("새로고침 중 오류:", error);
    }
  };

  useEffect(() => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestData.id ? { ...req, detailInfo: additionalInfo } : req
      )
    );
  }, [additionalInfo]);

  const handleCancelRequestPopup = (requestId) => {
    setCancelRequestId(requestId);
    setIsCancelPopupOpen(true);
  };

  const handleCancelRequest = async () => {
    if (!cancelRequestId) return;

    try {
      // await deleteDoc(doc(db, "Request", cancelRequestId));
      const cancelRef = doc(db, "Request", cancelRequestId);
      await updateDoc(cancelRef, { status: 0 });

      updateRequestData(cancelRequestId, null);

      setIsCancelPopupOpen(false);
      setCancelRequestId(null);

      if (onDeleteRequest && typeof onDeleteRequest === "function") {
        onDeleteRequest(cancelRequestId);
      }
    } catch (error) {
      console.error("Firestore 삭제 중 오류 발생:", error);
      alert("⚠️ 의뢰 취소 중 오류가 발생했습니다.");
    }
  };

  const formatPhoneForDisplay = (number) => {
    const onlyNumbers = number.replace(/\D/g, "");
    if (onlyNumbers.length === 11) {
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
        3,
        7
      )}-${onlyNumbers.slice(7, 11)}`;
    } else if (onlyNumbers.length === 10) {
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
        3,
        6
      )}-${onlyNumbers.slice(6, 10)}`;
    }
    return number;
  };
  const formatDateForPicker = (dateStr) => {
    // "2024년 06월 05일" → "2024-06-05"
    const match = dateStr.match(/(\d{4})년\s*(\d{2})월\s*(\d{2})일/);
    if (match) {
      const [, year, month, day] = match;
      return `${year}-${month}-${day}`;
    }
    return ""; // invalid
  };

  return (
    <Container>
      <RequestBox>
        <ProgressBar>
          {steps.map((step, index) => (
            <ProgressStep key={index}>
              <Circle $isActive={index + 1 <= localRequestData.status} />
              <StepLabel $isActive={index + 1 === localRequestData.status}>
                {step.label}
              </StepLabel>
              {index < steps.length - 1 && (
                <Line $isActive={index + 1 < localRequestData.status} />
              )}
            </ProgressStep>
          ))}
        </ProgressBar>
        <RefreshIconButton onClick={handleRefresh} title="새로고침">
          <MdRefresh />
          <RefreshText>실시간 의뢰서 정보 업데이트하기</RefreshText>
        </RefreshIconButton>
        {localRequestData.status >= 2 && (
          <TechnicianContainer>
            <TechnicianCard>
              <TechnicianTitle>배정된 기사님 정보</TechnicianTitle>
              <ProfileImage
                src={
                  requestData.engineer_profile_image || "default-profile.jpg"
                }
                alt="기사님 사진"
              />
              <TechnicianName>
                {requestData.engineer_name || "배정된 기사 없음"}
              </TechnicianName>
              <ContactInfo>
                <PhoneNumber>
                  {requestData.engineer_phone || "없음"}
                </PhoneNumber>
              </ContactInfo>
              <CompanyInfo>
                <CompanyTitle>
                  {requestData.partner_name || "업체 정보 없음"}
                </CompanyTitle>
                <CompanyAddress>
                  {requestData.partner_address || "주소 정보 없음"}
                  {requestData.partner_address_detail || "주소 정보 없음"}
                </CompanyAddress>
              </CompanyInfo>
              <TechnicianFooter>
                <CompanyAcceptTimeInfo>
                  <Tag>기사님 승인날짜</Tag>
                  <Tag2>{requestData.accepted_at || "접수완료시간없음"}</Tag2>
                </CompanyAcceptTimeInfo>
              </TechnicianFooter>
            </TechnicianCard>
            <TechnicianETC>
              진행 중인 의뢰는 기사님의 일정에 따라 변경되거나 취소될 수
              있습니다
            </TechnicianETC>
          </TechnicianContainer>
        )}
        <ContentBox>
          {/* 방문 희망 날짜 수정 */}
          <Section>
            <Label>방문 희망 일자</Label>
            {editingRequestId === requestData.id ? (
              <LabelBox>
                <CalendarPicker
                  selectedDate={
                    selectedService_date &&
                    !isNaN(new Date(formatDateForPicker(selectedService_date)))
                      ? new Date(formatDateForPicker(selectedService_date))
                      : null
                  }
                  setSelectedDate={(date) => {
                    const formattedForDisplay = `${date.getFullYear()}년 ${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}월 ${String(date.getDate()).padStart(
                      2,
                      "0"
                    )}일`;

                    setSelectedService_date(formattedForDisplay);
                    updateRequestData("service-date", formattedForDisplay);
                  }}
                />
              </LabelBox>
            ) : (
              <Value>{selectedService_date || "없음"}</Value>
            )}
          </Section>

          {/* 방문 희망 시간 수정*/}
          <Section>
            <Label>방문 희망 시간</Label>
            {editingRequestId === requestData.id ? (
              <LabelBox>
                <TimeSlotPicker
                  selectedTime={selectedServcie_time}
                  setSelectedTime={(time) => {
                    setSelectedService_time(time);
                    updateRequestData("service_time", time);
                  }}
                />
              </LabelBox>
            ) : (
              <Value>{selectedServcie_time || "없음"}</Value>
            )}
          </Section>
          {/* 에어컨종류 */}
          <Section>
            <Label>서비스 받을 에어컨 종류</Label>
            {editingRequestId === requestData.id ? (
              <DropdownSelector
                title="에어컨 종류 선택하기"
                icon={<GrApps size="18" />}
                options={[
                  "벽걸이형",
                  "스탠드형",
                  "천장형",
                  "창문형",
                  "항온항습기",
                ]}
                selected={selectedAircon_type}
                setSelected={setSelectedAircon_type}
                isOpen={isTypeOpen}
                setIsOpen={setIsTypeOpen}
                optionWidths={["90px", "90px", "90px", "90px", "110px"]}
              />
            ) : (
              <Value>{selectedAircon_type || "없음"}</Value>
            )}
          </Section>
          {/* 원하는서비스수정 */}
          <Section>
            <Label>원하는서비스</Label>
            {editingRequestId === requestData.id ? (
              <DropdownSelector
                title={selectedService_type}
                icon={<GrUserSettings size="18" />}
                options={[
                  "설치",
                  "점검",
                  "청소",
                  "수리",
                  "냉매 충전",
                  "이전",
                  "철거",
                ]}
                selected={selectedService_type}
                setSelected={setSelectedService_type}
                isOpen={isServiceOpen}
                setIsOpen={setIsServiceOpen}
                optionWidths={[
                  "70px",
                  "70px",
                  "70px",
                  "70px",
                  "90px",
                  "70px",
                  "70px",
                ]}
                disabled
              />
            ) : (
              <Value>{selectedService_type || "없음"}</Value>
            )}
          </Section>
          {/* 브랜드수정 */}
          <Section>
            <Label>브랜드</Label>
            {editingRequestId === requestData.id ? (
              <DropdownSelector
                title="브랜드 선택하기"
                icon={<GrBookmark size="18" />}
                options={[
                  "삼성전자",
                  "LG전자",
                  "캐리어",
                  "센추리",
                  "귀뚜라미",
                  "SK매직",
                  "기타(추천 또는 모름)",
                ]}
                selected={selectedBrand}
                setSelected={setSelectedBrand}
                isOpen={isBrandOpen}
                setIsOpen={setIsBrandOpen}
                optionWidths={[
                  "100px",
                  "90px",
                  "90px",
                  "90px",
                  "100px",
                  "100px",
                  "150px",
                ]}
              />
            ) : (
              <Value>{selectedBrand || "없음"}</Value>
            )}
          </Section>
          {/* 주소수정불가능 */}
          <Section>
            <Label>주소</Label>
            <Value>{requestData.customer_address || "없음"}</Value>
            <Value style={{ marginTop: "5px" }}>
              {requestData.customer_address_detail || "없음"}
            </Value>
          </Section>
          {/* 연락처수정불가능 */}
          <Section>
            <Label>연락처</Label>
            <Value>
              {formatPhoneForDisplay(requestData.customer_phone) || "없음"}
            </Value>
          </Section>
          {/* 이름수정불가능 */}
          <Section>
            <Label>이름</Label>
            <Value style={{ marginTop: "5px" }}>
              {requestData.clientName || "없음"}
            </Value>
          </Section>
          {/* 추가요청사항 */}
          <Section style={{ whiteSpace: "pre-line" }}>
            {editingRequestId === requestData.id ? (
              <>
                {["청소", "철거", "점검", "냉매 충전"].includes(
                  selectedService_type
                ) && (
                  <RequestDetails
                    additionalInfo={additionalInfo}
                    setAdditionalInfo={setAdditionalInfo}
                  />
                )}
                {selectedService_type === "수리" && (
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
                      isMultiSelect={true}
                      onSelect={(option) => setSelectedDropdownOption(option)}
                    />
                    <Label>추가요청사항</Label>
                    <RequestDetails
                      additionalInfo={additionalInfo}
                      setAdditionalInfo={setAdditionalInfo}
                    />
                  </>
                )}

                {selectedService_type === "설치" && (
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
                      options={[
                        "앵글 설치가 필요해요.",
                        "앵글 설치는 필요 없어요.",
                      ]}
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
                {selectedService_type === "이전" && (
                  <>
                    <AdditionalDropSelected
                      options={[
                        "앵글 설치가 필요해요.",
                        "앵글 설치는 필요 없어요.",
                      ]}
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
              </>
            ) : (
              <div>
                <Label>추가요청사항</Label>
                <Value style={{ whiteSpace: "pre-line" }}>
                  {additionalInfo || "없음"}
                </Value>
              </div>
            )}
          </Section>
        </ContentBox>

        {requestData.state === 1 && (
          <WarningText>
            의뢰서 수정은 기사님 배정 전까지만 가능합니다.
          </WarningText>
        )}

        {editingRequestId === requestData.id ? (
          <ButtonGroup>
            <EditCancelButton onClick={handleCancelClick}>
              취소
            </EditCancelButton>
            <SaveButton onClick={() => handleSaveClick(requestData)}>
              저장
            </SaveButton>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            {requestData.status < 2 && (
              <CancelButton
                onClick={() => handleCancelRequestPopup(requestData.id)}
              >
                의뢰 취소
              </CancelButton>
            )}
            {requestData.status === 1 && (
              <EditButton onClick={() => handleEditClick(requestData.id)}>
                수정
              </EditButton>
            )}
          </ButtonGroup>
        )}
      </RequestBox>

      {isCancelPopupOpen && (
        <Popup onClose={() => setIsCancelPopupOpen(false)}>
          <PopupMessage>정말로 의뢰를 취소하시겠습니까?</PopupMessage>
          <PopupButtons>
            <CloseButton
              onClick={handleCancelRequest}
              style={{ backgroundColor: "red" }}
            >
              의뢰 취소
            </CloseButton>
            <CloseButton
              onClick={() => setIsCancelPopupOpen(false)}
              style={{ backgroundColor: "gray" }}
            >
              닫기
            </CloseButton>
          </PopupButtons>
        </Popup>
      )}
    </Container>
  );
};

export default RequestReceived;
const LabelBox = styled.div`
  width: 100%;
  border: 2px solid #e3e3e3;
  border-radius: 10px;
  background: white;
  padding: 20px 10px 30px 20px;
`;
const TechnicianContainer = styled.div``;

const TechnicianETC = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    margin-bottom: 10px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: auto;
  @media ${device.mobile} {
    width: 90%;
    margin: auto;
  }
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
const RequestBox = styled.div`
  width: 100%;
`;
const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${({ $isActive }) => ($isActive ? "#0080FF" : "#ddd")};
  @media ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

const Line = styled.div`
  width: 60px;
  height: 2px;
  background-color: ${({ $isActive }) => ($isActive ? "#0080FF" : "#ddd")};
  margin: 0px 0px 0px 35px;
  @media ${device.mobile} {
    width: 0px;
  }
`;

const StepLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  color: ${({ $isActive }) => ($isActive ? "#0080FF" : "#666")};

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const TechnicianCard = styled.div`
  background: #f9f9f9;
  padding-top: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

const TechnicianTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  margin-bottom: 15px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
  }
`;
const ProfileImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background: #ddd;
  margin: 0 auto;
  @media ${device.mobile} {
    width: 125px;
    height: 125px;
  }
`;
const CompanyAcceptTimeInfo = styled.div`
  disaplay: flex;
  flex-direction: column;
`;

const Tag = styled.span`
  display: inline-block;
  background: #0080ff;
  color: white;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 15px;
  margin-top: 10px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
  }
`;
const Tag2 = styled.div`
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
  }
`;
const TechnicianName = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  margin-top: 5px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PhoneNumber = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: bold;
  margin-right: 10px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
  }
`;

const CompanyInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const CompanyTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: bold;
  color: #666;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
  }
`;

const CompanyAddress = styled.p`
  font-size: 12px;
  color: #999;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
  }
`;
const TechnicianFooter = styled.div`
  background: #0080ff;
  padding: 30px 20px 30px 20px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: white;
  font-weight: ${({ theme }) => theme.fonts.weights.smallmedium};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 5px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
  }
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    padding: 12px;
    margin-top: 5px;
  }
`;

const WarningText = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  margin-top: 40px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #ff5c5c;
  color: white;
  border-radius: 8px;
  padding: 13px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding: 15px;
  }
`;

const EditButton = styled.button`
  flex: 1;
  background-color: #ddd;
  color: white;
  border-radius: 8px;
  padding: 13px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding: 15px;
  }
`;

const SaveButton = styled.button`
  flex: 1;
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  color: white;
  border-radius: 10px;
  padding: 13px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding: 15px;
  }
`;
const EditCancelButton = styled.div`
  flex: 1;
  background-color: #ddd;
  color: white;
  text-align: center;
  border-radius: 10px;
  padding: 13px;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  border: none;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding: 15px;
  }
`;

const PopupMessage = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  padding: 30px 30px 50px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    padding: 30px 10px 20px 20px;
    margin-bottom: 10px;
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 0px 0px 0px 0px;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    padding: 15px;
  }
`;
const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RefreshIconButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 10px 10px 0px;
  margin-bottom: 5px;
  display: flex;

  svg {
    color: #0080ff;
    font-size: 26px;
    transition: transform 0.2s;
    @media ${device.mobile} {
      font-size: 2.5rem;
    }

    &:hover {
      transform: rotate(90deg);
    }
  }
  
  }
`;
const RefreshText = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  padding: 0.3rem;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
  }
`;
