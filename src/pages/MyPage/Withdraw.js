import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Withdraw = () => {
  const navigate = useNavigate();
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [reasons, setReasons] = useState([]);

  const handleReasonToggle = (reason) => {
    setReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <IoIosArrowBack size={28} />
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
              의뢰서 삭제를 원할 경우 먼저 고객센터에 의뢰 후 탈퇴를 신청하시기
              바랍니다
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

        <Label>＊CONER 어떤 이유로 탈퇴하시려는 걸까요? (복수 선택 가능)</Label>
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
        <Textarea placeholder="선택하신 항목에 대한 자세한 이유를 남겨주세요" />
      </ContentBox>

      <ButtonRow>
        <WithdrawBtn disabled={!confirmChecked}>탈퇴신청</WithdrawBtn>
        <CancelBtn onClick={() => navigate(-1)}>취소하기</CancelBtn>
      </ButtonRow>
    </Container>
  );
};

export default Withdraw;
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
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

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const ContentBox = styled.div`
  margin-top: 80px;
  font-size: 14px;
  line-height: 1.6;
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
`;

const ConfirmText = styled.span`
  font-size: 14px;
`;

const Required = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 6px;
`;

const Label = styled.p`
  margin-top: 24px;
  font-weight: 500;
`;

const SubText = styled.div`
  color: gray;
  font-size: 12px;
  margin-top: 4px;
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
`;

const CancelBtn = styled.button`
  flex: 1;
  height: 46px;
  background: linear-gradient(to right, #36c8d5, #51d3db);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
`;
