import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RequestSearch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && isNaN(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    if (!formData.name || !formData.phoneNumber) {
      setErrorMessage("이름과 전화번호를 모두 입력해주세요.");
      return;
    }
    setErrorMessage("");
    navigate("/inquirydashboard", {
      state: { name: formData.name, phoneNumber: formData.phoneNumber },
    });
  };

  return (
    <Container>
      <Title>
        <h2>비회원 의뢰서 조회</h2>
        <p>의뢰서에 작성했던 이름과 전화번호를 입력해주세요</p>
      </Title>
      <Content>
        <InputWrapper>
          <h3>이름</h3>
          <InputField
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <h3>연락처</h3>
          <InputField
            name="phoneNumber"
            placeholder="전화번호"
            value={formData.phoneNumber}
            onChange={handleChange}
            maxLength={11}
          />
        </InputWrapper>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </Content>
      <SearchButton onClick={handleSearch}>의뢰서 조회하기</SearchButton>
    </Container>
  );
};

const Container = styled.div`
  width: 92%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 45px;
  margin-bottom: 25px;

  h2 {
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  p {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.semibold};
    margin-top: 3px;
  }
`;

const Content = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  margin-bottom: 35px;

  h3 {
    font-size: 19px;
    font-weight: ${({ theme }) => theme.fonts.weights.semibold};
    margin-bottom: 10px;
  }
`;

const InputField = styled.input`
  border: 1px solid #a0a0a0;
  width: 100%;
  border-radius: 10px;
  height: 48px;
  padding: 0 10px;
  font-size: 16px;
  font-family: inherit;

  &:focus {
    outline: none;
    border: 1px solid #00e5fd;
  }

  &::placeholder {
    color: #a0a0a0;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const ErrorText = styled.p`
  color: #01e6ff;
  font-size: 14px;
  font-weight: bold;
  margin-top: -20px;
  margin-bottom: 20px;
  text-align: center;
`;

const SearchButton = styled.button`
  border: none;
  background: linear-gradient(to right, #01e6ff, #00dcf3, #59d7d7);
  width: 100%;
  border-radius: 10px;
  height: 50px;
  color: white;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};

  &:hover {
    background: linear-gradient(to right, #00ddf6, #00dbf2, #53cfce);
  }
`;

export default RequestSearch;
