import React from "react";
import styled from "styled-components";
import Divider from "../layout/Divider";

const types = [
  {
    id: 1,
    title: "벽걸이형",
    image: "../servicesTypeimage/servicesType_1.png",
  },
  {
    id: 2,
    title: "스탠드형",
    image: "../servicesTypeimage/servicesType_2.png",
  },
  {
    id: 3,
    title: "천장형",
    image: "../servicesTypeimage/servicesType_3.png",
  },
  {
    id: 4,
    title: "창문형",
    image: "../servicesTypeimage/servicesType_4.png",
  },
  {
    id: 5,
    title: "항온항습기",
    image: "../servicesTypeimage/servicesType_5.png",
  },
];

const ServicesType = () => {
  return (
    <TypeCards>
      <h1>코너가 다루는 에어컨 종류</h1>
      <p>창문형은 설치 서비스를 제공하지 않아요</p>
      <TypeList>
        {types.map((type) => (
          <TypeCard key={type.id}>
            <img src={type.image} alt={type.title} />
            <h3>{type.title}</h3>
          </TypeCard>
        ))}
      </TypeList>
      <Divider />
    </TypeCards>
  );
};

const TypeCards = styled.section`
  margin-top: 23px;

  background-color: #ffffff;

  h1 {
    margin-left: 17px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};

    @media (max-width: 600px) {
      width: 80%;
      margin: auto;
    }
  }

  p {
    margin-left: 17px;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    color: ${({ theme }) => theme.colors.subtext};
    margin-top: 5px;
    margin-bottom: 12px;

    @media (max-width: 600px) {
      width: 80%;
      margin: auto;
      margin-top: 5px;
      margin-bottom: 12px;
    }
  }
`;

const TypeList = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: auto;
  list-style: none;

  @media (max-width: 600px) {
    width: 78%;
  }
`;

const TypeCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  align-items: center;
  text-align: center;
  gap: 3px;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.medium || "17px"};
    font-weight: ${({ theme }) => theme.fonts.weights.bold || "980"};
  }
`;

export default ServicesType;
