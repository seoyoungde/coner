import React from "react";
import styled from "styled-components";
import { device } from "../../styles/theme";
import Type1Icon from "../../assets/images/services/servicesType_1.png";
import Type2Icon from "../../assets/images/services/servicesType_2.png";
import Type3Icon from "../../assets/images/services/servicesType_3.png";
import Type4Icon from "../../assets/images/services/servicesType_4.png";
import Type5Icon from "../../assets/images/services/servicesType_5.png";

const types = [
  {
    id: 1,
    title: "벽걸이형",
    image: Type1Icon,
  },
  {
    id: 2,
    title: "스탠드형",
    image: Type2Icon,
  },
  {
    id: 3,
    title: "천장형",
    image: Type3Icon,
  },
  {
    id: 4,
    title: "창문형",
    image: Type4Icon,
  },
  {
    id: 5,
    title: "항온항습기",
    image: Type5Icon,
  },
];

const ServicesType = () => {
  return (
    <TypeCards>
      <h1>서비스 가능한 기기</h1>
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
  margin-bottom: 20px;

  @media ${device.mobile} {
    margin-bottom: 19px;
  }

  h1 {
    margin-left: 42px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    @media ${device.mobile} {
      font-size: 26px;
      padding-left: 10px;
    }
  }

  p {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: ${({ theme }) => theme.colors.subtext};
    margin: 5px 0px 12px 42px;

    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
      padding-left: 10px;
    }
  }
`;

const TypeList = styled.ul`
  display: flex;
  width: 87%;
  justify-content: space-between;
  margin: auto;
  list-style: none;
  scroll-behavior: smooth;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */

  @media ${device.mobile} {
    width: 87%;
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
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fonts.weights.smallmedium};
    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    }
  }
`;

export default ServicesType;
