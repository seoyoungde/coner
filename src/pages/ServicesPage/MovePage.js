import React from "react";
import AddressForm from "../../components/Services/AddressForm";

const MovePage = () => {
  const handleSubmit = (formData) => {
    console.log("이전 서비스 예약 데이터:", formData);
  };

  return (
    <AddressForm
      title="주소와 연락처 입력"
      description="기사님께 제공할 주소와 연락처를 입력해주세요."
      buttonText="의뢰 시작하기"
      onSubmit={handleSubmit}
    />
  );
};

export default MovePage;
