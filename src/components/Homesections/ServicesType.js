import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";

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
      <h1>서비스 가능한 에어컨</h1>
      <p>창문형은 설치 서비스를 제공하지 않아요</p>
      <TypeList>
        {types.map((type) => (
          <TypeCard key={type.id}>
            <img src={type.image} alt={type.title} />
            <h3>{type.title}</h3>
          </TypeCard>
        ))}
      </TypeList>
    </TypeCards>
  );
};

const TypeCards = styled.section`
  cursor: default;
  background-color: #ffffff;
  padding-top: 22px;

  @media ${device.mobile} {
    margin-bottom: 19px;
  }

  h1 {
    margin-left: 17px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    @media ${device.mobile} {
      font-size: 1.9rem;
      padding-left: 14px;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: ${({ theme }) => theme.colors.subtext};
    margin: 5px 0px 12px 17px;

    @media ${device.mobile} {
      font-size: 1.5rem;
      padding-left: 14px;
    }
  }
`;

const TypeList = styled.ul`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: auto;
  list-style: none;
  scroll-behavior: smooth;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */

  @media ${device.mobile} {
    width: 90%;
  }
`;

const TypeCard = styled.li`
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
    @media ${device.mobile} {
      width: 130px;
      height: 130px;
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.medium || "17px"};
    font-weight: 600;
    @media ${device.mobile} {
      font-size: 1.4rem;
    }
  }
`;

export default ServicesType;
