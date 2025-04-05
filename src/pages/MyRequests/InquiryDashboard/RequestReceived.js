import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../../context/context";
import CalendarPicker from "../../../components/Apply/CalendarPicker";
import TimeSlotPicker from "../../../components/Apply/TimeSlotPicker";
import {
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import DropdownSelector from "../../../components/Apply/DropdownSelector";
import AdditionalDropSelected from "../../../components/Services/AdditionalDropSelected";
import RequestDetails from "../../../components/Apply/RequestDetails";
import { db } from "../../../firebase";
import { GrApps, GrUserSettings, GrBookmark } from "react-icons/gr";

const RequestReceived = ({ requestData }) => {
  const navigate = useNavigate();
  const { updateRequestData } = useRequest();
  const isMounted = useRef(true);
  const [requests, setRequests] = useState(requestData ? [requestData] : []);
  const [requestDataState, setRequestDataState] = useState(requestData);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [editingRequestId, setEditingRequestId] = useState(null);
  const [selectedHopeDate, setSelectedHopeDate] = useState(
    requestData.hopeDate
  );
  const [selectedHopeTime, setSelectedHopeTime] = useState(
    requestData.hopeTime
  );
  const [selectedBrand, setSelectedBrand] = useState(requestData.brand);
  const [selectedService, setSelectedService] = useState(requestData.service);
  const [selectedType, setSelectedType] = useState(requestData.aircon);

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
    setSelectedDropdownOption("");
    setSelectedAirconditionerform("");
    setAdditionalInfo("");
  };

  const handleCancelClick = () => {
    setEditingRequestId(null);
    setAdditionalInfo(requestData.detailInfo || "");
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
    if (["청소", "철거"].includes(selectedService)) {
      formattedDetailInfo = additionalInfo;
    } else if (selectedService === "설치") {
      formattedDetailInfo = [
        selectedDropdownOption,
        additionalInfo,
        selectedairconditionerform,
      ]
        .filter(Boolean)
        .join("\n");
    } else if (["수리", "이전"].includes(selectedService)) {
      formattedDetailInfo = [additionalInfo, selectedDropdownOption]
        .filter(Boolean)
        .join("\n");
    }
    const updatedRequest = {
      ...request,
      hopeDate: selectedHopeDate,
      hopeTime: selectedHopeTime,
      service: selectedService,
      brand: selectedBrand,
      aircon: selectedType,
      detailInfo: formattedDetailInfo,
    };
    try {
      const docRef = doc(db, "testservice", request.id);
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
      console.error("❌ Firestore 업데이트 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (requestData && isMounted.current) {
      setRequests([requestData]);
      setAdditionalInfo(requestData.detailInfo || "");
    }
  }, [requestData]);

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
      await deleteDoc(doc(db, "testservice", cancelRequestId));

      updateRequestData(cancelRequestId, null);

      setIsCancelPopupOpen(false);
      setCancelRequestId(null);
      window.location.reload();
    } catch (error) {
      console.error("❌ Firestore 삭제 중 오류 발생:", error);
      alert("⚠️ 의뢰 취소 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    console.log("📡 Firestore 실시간 업데이트 감지 시작...");

    const unsubscribe = onSnapshot(
      collection(db, "testservice"),
      (snapshot) => {
        console.log("🔄 Firestore 데이터 변경 감지됨!", snapshot.docs.length);

        const updatedRequests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests([...updatedRequests]); // 🔥 상태 변경 감지하여 즉시 반영

        const updatedRequest = updatedRequests.find(
          (req) => req.id === requestData?.id
        );
        if (updatedRequest) {
          console.log("🔁 requestData 변경 감지:", updatedRequest);
          updateRequestData(updatedRequest.id, updatedRequest);
          setRequestDataState(updatedRequest); // 🔥 상태 업데이트하여 UI 반영
        }

        // 🔥 강제 리렌더링 실행
        setForceUpdate((prev) => prev + 1);
      }
    );

    return () => {
      console.log("🛑 Firestore 실시간 감지 중지됨.");
      unsubscribe();
    };
  }, [forceUpdate]);

  return (
    <Container>
      <RequestBox>
        <ProgressBar>
          {steps.map((step, index) => (
            <ProgressStep key={index}>
              <Circle isActive={index + 1 <= requestData.state} />
              <StepLabel isActive={index + 1 === requestData.state}>
                {step.label}
              </StepLabel>
              {index < steps.length - 1 && (
                <Line isActive={index + 1 < requestData.state} />
              )}
            </ProgressStep>
          ))}
        </ProgressBar>
        {requestData.state >= 2 && (
          <TechnicianContainer>
            <TechnicianCard>
              <TechnicianTitle>배정된 기사님 정보</TechnicianTitle>
              <ProfileImage
                src={requestData.engineerProfileImage || "default-profile.jpg"}
                alt="기사님 사진"
              />
              <TechnicianName>
                {requestData.engineerName || "배정된 기사 없음"}
              </TechnicianName>
              <ContactInfo>
                <PhoneNumber>{requestData.engineerPhone || "없음"}</PhoneNumber>
              </ContactInfo>
              <CompanyInfo>
                <CompanyTitle>
                  {requestData.companyName || "업체 정보 없음"}
                </CompanyTitle>
                <CompanyAddress>
                  {requestData.companyAddress || "주소 정보 없음"}
                </CompanyAddress>
              </CompanyInfo>
              <TechnicianFooter>
                <CompanyAcceptTimeInfo>
                  <Tag>기사님 승인날짜</Tag>
                  <Tag2>
                    {requestData.acceptanceDate || "접수완료시간없음"}
                  </Tag2>
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
                  selectedDate={new Date(selectedHopeDate)}
                  setSelectedDate={(date) => {
                    const formattedDate = date
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .trim();

                    setSelectedHopeDate(formattedDate);
                    updateRequestData("hopeDate", formattedDate);
                  }}
                />
              </LabelBox>
            ) : (
              <Value>{selectedHopeDate || "없음"}</Value>
            )}
          </Section>

          {/* 방문 희망 시간 수정 */}
          <Section>
            <Label>방문 희망 시간</Label>
            {editingRequestId === requestData.id ? (
              <LabelBox>
                <TimeSlotPicker
                  selectedTime={selectedHopeTime}
                  setSelectedTime={(time) => {
                    setSelectedHopeTime(time);
                    updateRequestData("hopeTime", time);
                  }}
                />
              </LabelBox>
            ) : (
              <Value>{selectedHopeTime || "없음"}</Value>
            )}
          </Section>
          {/* 에어컨종류 */}
          <Section>
            <Label>서비스받을에어컨종류</Label>
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
                selected={selectedType}
                setSelected={setSelectedType}
                isOpen={isTypeOpen}
                setIsOpen={setIsTypeOpen}
                optionWidths={["90px", "90px", "90px", "90px", "110px"]}
              />
            ) : (
              <Value>{selectedType || "없음"}</Value>
            )}
          </Section>
          {/* 원하는서비스수정 */}
          <Section>
            <Label>원하는서비스</Label>
            {editingRequestId === requestData.id ? (
              <DropdownSelector
                title={selectedService}
                icon={<GrUserSettings size="18" />}
                options={["청소", "설치", "이전", "수리", "철거"]}
                selected={selectedService}
                setSelected={setSelectedService}
                isOpen={isServiceOpen}
                setIsOpen={setIsServiceOpen}
                optionWidths={["70px", "70px", "70px", "70px", "70px"]}
                disabled
              />
            ) : (
              <Value>{selectedService || "없음"}</Value>
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
            <Value>{requestData.clientAddress || "없음"}</Value>
            <Value style={{ marginTop: "5px" }}>
              {requestData.clientDetailedAddress || "없음"}
            </Value>
          </Section>
          {/* 연락처수정불가능 */}
          <Section>
            <Label>연락처</Label>
            <Value>{requestData.clientPhone || "없음"}</Value>
          </Section>
          {/* 추가요청사항 */}
          <Section style={{ whiteSpace: "pre-line" }}>
            {editingRequestId === requestData.id ? (
              <>
                {["청소", "철거"].includes(selectedService) && (
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
                      isMultiSelect={true}
                      onSelect={(option) => setSelectedDropdownOption(option)}
                    />
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
                      options={[
                        "앵글 설치가 필요해요.",
                        "앵글 설치는 필요 없어요.",
                      ]}
                      placeholderText="앵글 설치 여부 선택하기"
                      boxPerRow={2}
                      onSelect={setSelectedDropdownOption}
                    />
                    <RequestDetails
                      additionalInfo={additionalInfo}
                      setAdditionalInfo={setAdditionalInfo}
                    />
                  </>
                )}
                {selectedService === "이전" && (
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
                    <RequestDetails
                      additionalInfo={additionalInfo}
                      setAdditionalInfo={setAdditionalInfo}
                    />
                  </>
                )}
              </>
            ) : (
              <Value style={{ whiteSpace: "pre-line" }}>
                {additionalInfo || "없음"}
              </Value>
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
            <CancelButton
              onClick={() => handleCancelRequestPopup(requestData.id)}
            >
              의뢰 취소
            </CancelButton>
            {requestData.state === 1 && (
              <EditButton onClick={() => handleEditClick(requestData.id)}>
                수정
              </EditButton>
            )}
          </ButtonGroup>
        )}
      </RequestBox>

      {isCancelPopupOpen && (
        <PopupOverlay>
          <PopupContainer>
            <PopupText>정말로 의뢰를 취소하시겠습니까?</PopupText>
            <PopupButtons>
              <PopupButton
                onClick={handleCancelRequest}
                style={{ backgroundColor: "red" }}
              >
                의뢰 취소
              </PopupButton>
              <PopupButton
                onClick={() => setIsCancelPopupOpen(false)}
                style={{ backgroundColor: "gray" }}
              >
                닫기
              </PopupButton>
            </PopupButtons>
          </PopupContainer>
        </PopupOverlay>
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
  font-size: 15px;
`;
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
const RequestBox = styled.div``;
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
const CompanyAcceptTimeInfo = styled.div`
  disaplay: flex;
  flex-direction: column;
`;

const Tag = styled.span`
  display: inline-block;
  background: #00e6fd;
  color: white;
  font-size: 17px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 15px;
  margin-top: 10px;
`;
const Tag2 = styled.div``;
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

const WarningText = styled.p`
  text-align: center;
  color: #333;
  font-size: 14px;
  margin-top: 40px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
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
