import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRequest } from "../../context/context";
import { device } from "../../styles/theme";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { auth } from "../../firebase";
import * as firebaseAuth from "firebase/auth";

const RequestSearch = () => {
  const navigate = useNavigate();
  const { fetchRequestByClient } = useRequest();
  const [formData, setFormData] = useState({ customer_phone: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { scale, height, ref } = useScaleLayout();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "customer_phone" && isNaN(value.replace(/-/g, ""))) return;

    let onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

    if (onlyNumbers.length >= 4) {
      onlyNumbers = onlyNumbers.slice(0, 3) + "-" + onlyNumbers.slice(3);
    }
    if (onlyNumbers.length >= 9) {
      onlyNumbers = onlyNumbers.slice(0, 8) + "-" + onlyNumbers.slice(8);
    }

    setFormData({ ...formData, [name]: onlyNumbers });
  };
  const handleSearch = async () => {
    if (loading) return;
    if (!formData.customer_phone) {
      setErrorMessage("전화번호를 입력해주세요.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    const formattedPhone = formData.customer_phone.replace(/\D/g, "");
    const requests = await fetchRequestByClient(formattedPhone);
    setLoading(false);

    if (requests && requests.length > 0) {
      navigate("/inquirydashboard", {
        state: { customer_phone: formattedPhone },
      });
    } else {
      setErrorMessage("일치하는 의뢰서를 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/inquirydashboard", {
          state: { customer_uid: currentUser.uid },
        });
      }
    });
    return () => unsubscribe();
  }, []);

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
          style={{ width: "92%", margin: "auto" }}
        >
          <Content>
            <InputWrapper>
              <label htmlFor="customer_phone">전화번호</label>
              <InputField
                id="customer_phone"
                name="customer_phone"
                placeholder="전화번호"
                value={formData.customer_phone}
                onChange={handleChange}
                maxLength={13}
                type="tel"
                inputMode="numeric"
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
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @media ${device.mobile} {
    width: 92%;
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
    border: 1px solid #0080ff;
  }

  &::placeholder {
    color: #a0a0a0;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    @media ${device.mobile} {
      font-size: 1.4rem;
    }
  }
  @media ${device.mobile} {
    height: 62px;
    padding: 20px;
    margin-top: 5px;
    font-size: 1.3rem;
  }
`;

const ErrorText = styled.p`
  color: #0080ff;
  font-size: 14px;
  font-weight: bold;
  margin-top: -20px;
  margin-bottom: 20px;
  text-align: center;
`;

const SearchButton = styled.button`
  border: none;
  background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  width: 100%;
  border-radius: 10px;
  height: 50px;
  color: white;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.HeaderText};

  &:hover {
    background: linear-gradient(to right, #0080ff, #0080ff, #0080ff);
  }
  @media ${device.mobile} {
    height: 70px;
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 900;
  }
`;

export default RequestSearch;
