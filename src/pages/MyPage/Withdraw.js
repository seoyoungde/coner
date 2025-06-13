import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { deleteUser } from "firebase/auth";
import { useAuth } from "../../context/AuthProvider";
import Popup from "../../components/Apply/Popup";

const Withdraw = () => {
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [details, setDetails] = useState("");
  const { userInfo } = useAuth();
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReasonToggle = (reason) => {
    setReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleWithdraw = async () => {
    if (!confirmChecked) {
      setPopupMessage("모든 항목을 입력해야 탈퇴 신청이 가능합니다.");
      setIsPopupOpen(true);
      return;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        alert("로그인된 사용자만 탈퇴할 수 있습니다.");
        return;
      }

      const userRef = doc(db, "Customer", currentUser.uid);
      const newPhone = userInfo.phone + "_deleted";
      await updateDoc(userRef, {
        isDeleted: true,
        state: 0,
        withdrawReasons: reasons,
        withdrawDetail: details,
        phone: newPhone,
      });

      await deleteUser(currentUser);
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error) {
      alert("탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon>
              <IoIosArrowBack size={28} />
            </BackIcon>
          </BackButton>
          <Title>회원탈퇴(신청)</Title>
        </Header>

        <ContentBox>
          <Notice>
            회원탈퇴 신청에 앞서 아래 내용을 반드시 확인해주시기 바랍니다
          </Notice>
          <SubBox>
            <strong>회원탈퇴 시 처리내용</strong>
            <ul>
              <li>회원탈퇴 시 회원이 등록한 게시물은 삭제되지 않는다</li>
              <li>
                의뢰서 삭제를 원할 경우 먼저 고객센터에 의뢰 후 탈퇴를
                신청하시기 바랍니다
              </li>
            </ul>
          </SubBox>

          <ConfirmRow>
            <Checkbox
              type="checkbox"
              checked={confirmChecked}
              onChange={() => setConfirmChecked((prev) => !prev)}
            />
            <ConfirmText>
              위 내용을 모두 확인하였습니다 <Required>필수</Required>
            </ConfirmText>
          </ConfirmRow>

          <Label>
            ＊CONER 어떤 이유로 탈퇴하시려는 걸까요? (복수 선택 가능)
          </Label>
          <CheckboxList>
            {[
              "이용빈도 낮음",
              "재가입",
              "콘텐츠 등 정보 부족",
              "고객대응 불친절",
              "제휴서비스 불만",
              "기타",
            ].map((text) => (
              <CheckboxRow key={text}>
                <Checkbox
                  type="checkbox"
                  checked={reasons.includes(text)}
                  onChange={() => handleReasonToggle(text)}
                />
                <span>{text}</span>
              </CheckboxRow>
            ))}
          </CheckboxList>

          <Label>
            코너 서비스 중 어떤 점이 불편하셨을까요?
            <SubText>
              선택하신 항목에 대한 자세한 이유를 남겨주시면 서비스 개선에 큰
              도움이 됩니다
            </SubText>
          </Label>
          <Textarea
            placeholder="선택하신 항목에 대한 자세한 이유를 남겨주세요"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </ContentBox>

        <ButtonRow>
          <WithdrawBtn onClick={handleWithdraw}>탈퇴신청</WithdrawBtn>
          <CancelBtn onClick={() => navigate(-1)}>취소하기</CancelBtn>
        </ButtonRow>
        {isPopupOpen && (
          <Popup onClose={() => setIsPopupOpen(false)}>
            <PopupMessage>{popupMessage}</PopupMessage>
            <CloseButton onClick={() => setIsPopupOpen(false)}>
              닫기
            </CloseButton>
          </Popup>
        )}
      </Container>
    </ScaleWrapper>
  );
};

export default Withdraw;
const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  @media ${device.mobile} {
    width: 96%;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile}{
  font-size:40px;
`;
const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  @media ${device.mobile} {
    font-size: 24px;
  }
`;

const ContentBox = styled.div`
  margin-top: 80px;
  font-size: 14px;
  line-height: 1.6;
  @media ${device.mobile} {
    font-size: 20px;
  }
`;

const Notice = styled.p`
  margin-bottom: 10px;
`;

const SubBox = styled.div`
  background: #f8f8f8;
  border: 1px solid #eee;
  padding: 10px;
  margin-bottom: 20px;
  ul {
    padding-left: 20px;
    margin-top: 8px;
  }
`;

const ConfirmRow = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  @media ${device.mobile} {
    width: 18px;
    height: 18px;
  }
`;

const ConfirmText = styled.span`
  font-size: 14px;
  @media ${device.mobile} {
    font-size: 18px;
  }
`;

const Required = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 6px;
  @media ${device.mobile} {
    font-size: 18px;
  }
`;

const Label = styled.div`
  margin-top: 24px;
  font-weight: 500;
`;

const SubText = styled.div`
  color: gray;
  font-size: 12px;
  margin-top: 4px;
  @media ${device.mobile} {
    font-size: 16px;
  }
`;

const CheckboxList = styled.div`
  margin-top: 8px;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  margin: 6px 0;
  input {
    margin-right: 8px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  resize: none;
  border-radius: 4px;
  font-size: 14px;
  @media ${device.mobile} {
    font-size: 16px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const WithdrawBtn = styled.button`
  flex: 1;
  height: 46px;
  margin-right: 6px;
  background-color: ${(props) => (props.disabled ? "#ddd" : "#555")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  @media ${device.mobile} {
    height: 60px;
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: 900;
  }
`;

const CancelBtn = styled.button`
  flex: 1;
  height: 46px;
  background: linear-gradient(to right, #0080ff, #0080ff);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  @media ${device.mobile} {
    height: 60px;
    margin-bottom: 40px;
    font-size: 20px;
    font-weight: 900;
  }
`;
const PopupMessage = styled.p`
  font-size: 15px;
  padding: 30px 30px 50px 30px;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  @media ${device.mobile} {
    font-size: 14px;
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
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 0px 0px 10px 10px;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 14px;
    padding: 15px;
  }
`;
