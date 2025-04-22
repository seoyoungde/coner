import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AirConditionerForm from "../../components/Services/AirConditionerForm";
import { useNavigate } from "react-router-dom";

const InstallPage = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 500;
      const ratio = Math.min(window.innerWidth / baseWidth, 1);
      setScale(ratio);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleFormSubmit = (selectedOption) => {
    console.log(selectedOption);
    navigate("/installpage2");
  };

  return (
    <ScaleWrapper
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
    >
      <Container>
        <AirConditionerForm
          options={[
            "에어컨 구매까지 원해요",
            "에어컨은 있어요. 설치 서비스만 원해요",
          ]}
          title="에어컨 보유 여부"
          description="현재 설치하실 에어컨을 가지고 있습니까?"
          buttonText="다음으로"
          boxWidths={["170px", "250px"]}
          onSubmit={handleFormSubmit}
        />
      </Container>
    </ScaleWrapper>
  );
};
const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
export default InstallPage;
