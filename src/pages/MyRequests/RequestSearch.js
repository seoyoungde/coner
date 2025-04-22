import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../context/context";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";

const RequestSearch = () => {
  const navigate = useNavigate();
  const { fetchRequestByClient } = useRequest();
  const [formData, setFormData] = useState({ phoneNumber: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { scale, height, ref } = useScaleLayout();

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

    const requests = await fetchRequestByClient(formData.phoneNumber);
    setLoading(false);

    if (requests && requests.length > 0) {
      navigate("/inquirydashboard", {
        state: { clientPhone: formData.phoneNumber },
      });
    } else {
      setErrorMessage("일치하는 의뢰서를 찾을 수 없습니다.");
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
        <Title>
          <h1>의뢰서 조회</h1>
          <p>의뢰서에 작성했던 전화번호를 입력해주세요</p>
        </Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Content>
            <InputWrapper>
              <label htmlFor="phone">전화번호</label>
              <InputField
                id="phone"
                name="phoneNumber"
                placeholder="전화번호"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={11}
                type="tel"
                inputMode="numeric"
                autoFocus
              />
            </InputWrapper>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          </Content>
          <SearchButton type="submit" disabled={loading}>
            {loading ? "조회 중..." : "의뢰서 조회하기"}
          </SearchButton>
        </form>
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
  width: 92%;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @media ${device.mobile} {
    width: 88%;
  }
`;

const Title = styled.div`
  text-align: center;
  margin-top: 45px;
  margin-bottom: 25px;

  h1 {
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    @media ${device.mobile} {
      font-size: 1.8rem;
    }
  }
  p {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    margin-top: 4px;
    @media ${device.mobile} {
      font-size: 1.35rem;
      font-weight: 500;
    }
  }
`;

const Content = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  margin-bottom: 35px;

  label {
    display: block;
    font-size: 19.5px;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    margin-bottom: 10px;
    @media ${device.mobile} {
      font-size: 1.7rem;
      margin-top: 20px;
    }
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
    @media ${device.mobile} {
      font-size: 1.5rem;
    }
  }
  @media ${device.mobile} {
    height: 70px;
    padding: 20px;
    margin-top: 5px;
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
  @media ${device.mobile} {
    height: 73px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
  }
`;

export default RequestSearch;
