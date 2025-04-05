import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../context/context";

const RequestSearch = () => {
  const navigate = useNavigate();
  const { fetchRequestByClient } = useRequest();
  const [formData, setFormData] = useState({ phoneNumber: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && isNaN(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    if (!formData.phoneNumber) {
      setErrorMessage("전화번호를 입력해주세요.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    const requests = await fetchRequestByClient(
      // formData.name,
      formData.phoneNumber
    );
    setLoading(false);

    if (requests && requests.length > 0) {
      console.log("📢 검색된 데이터:", requests);
      navigate("/inquirydashboard", {
        state: { clientPhone: formData.phoneNumber },
      });
    } else {
      setErrorMessage("일치하는 의뢰서를 찾을 수 없습니다.");
    }
  };

  return (
    <Container>
      <Title>
        <h2>의뢰서 조회</h2>
        <p>의뢰서에 작성했던 전화번호를 입력해주세요</p>
      </Title>
      <Content>
        {/* <InputWrapper>
          <h3>이름</h3>
          <InputField
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
        </InputWrapper> */}
        <InputWrapper>
          <h3>전화번호</h3>
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
      <SearchButton onClick={handleSearch} disabled={loading}>
        {loading ? "조회 중..." : "의뢰서 조회하기"}
      </SearchButton>
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
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
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
