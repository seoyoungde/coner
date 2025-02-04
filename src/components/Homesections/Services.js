import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Divider from "../layout/Divider";

const serviceData = [
  {
    id: 1,
    title: "청소",
    icon: "../servicesimage/services_clean.png",
    path: "/clean",
  },
  {
    id: 2,
    title: "설치",
    icon: "../servicesimage/services_install.png",
    path: "/install",
  },
  {
    id: 3,
    title: "이전",
    icon: "../servicesimage/services_move.png",
    path: "/move",
  },
  {
    id: 4,
    title: "수리",
    icon: "../servicesimage/services_repair.png",
    path: "/repair",
  },
  {
    id: 5,
    title: "철거",
    icon: "../servicesimage/services_demolish.png",
    path: "/demolish",
  },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (path) => {
    navigate(path);
  };
  return (
    <ServiceContainer>
      <Title>서비스 예약하기</Title>
      <ServiceList>
        {serviceData.map((service) => (
          <ServiceItem
            key={service.id}
            onClick={() => handleServiceClick(service.path)}
          >
            <img src={service.icon} alt={`${service.title} 아이콘`} />
            <p>{service.title}</p>
          </ServiceItem>
        ))}
      </ServiceList>
      <Divider />
    </ServiceContainer>
  );
};

const ServiceContainer = styled.section`
  margin-top: 23px;
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.large || "20px"};
  font-weight: ${({ theme }) => theme.fonts.weights.bold || "700"};
  margin-bottom: 15px;
  margin-left: 17px;
  @media (max-width: 600px) {
    width: 80%;
    margin: auto;
    margin-bottom: 15px;
  }
`;
const ServiceList = styled.ul`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin: auto;
  margin-bottom: 27px;
  list-style: none;

  @media (max-width: 600px) {
    width: 78%;
  }
`;

const ServiceItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  p {
    margin-top: 5px;
    font-size: ${({ theme }) => theme.fonts.sizes.medium || "17px"};
    font-weight: ${({ theme }) => theme.fonts.weights.bold || "980"};
  }
`;

export default Services;
