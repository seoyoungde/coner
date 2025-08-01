import React from "react";
import styled from "styled-components";
import AirConditionerForm from "../../components/Services/AirConditionerForm";
import { useNavigate } from "react-router-dom";

const Install_purchasePage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (selectedOption) => {
    navigate("/installpage2");
  };

  return (
    <Container>
      <AirConditionerForm
        options={["중고에어컨으로 구매원해요", "신규에어컨으로 구매원해요"]}
        title="에어컨 선택"
        description="설치하실 에어컨의 종류를 선택해주세요"
        buttonText="다음으로"
        boxWidths={["200px", "200px"]}
        onSubmit={handleFormSubmit}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
export default Install_purchasePage;
