import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import AddressForm from "../../components/Services/AddressForm";

const AddressPage = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get("service");

  return (
    <Container>
      <AddressForm
        title={`${service} 서비스 신청`}
        description="기사님께 제공할 주소와 연락처를 입력해주세요."
        buttonText="의뢰 시작하기"
        service={service}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
export default AddressPage;
