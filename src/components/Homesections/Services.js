import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../../context/context";
import { device } from "../../styles/theme";

const serviceData = [
  {
    id: 1,
    title: "설치",
    icon: "../servicesimage/services_install.png",
    path: "/install",
  },
  {
    id: 2,
    title: "점검",
    icon: "../servicesimage/services_inspection.png",
    path: "/inspection",
  },
  {
    id: 3,
    title: "청소",
    icon: "../servicesimage/services_clean.png",
    path: "/clean",
  },
  {
    id: 4,
    title: "수리",
    icon: "../servicesimage/services_repair.png",
    path: "/repair",
  },
  {
    id: 5,
    title: "냉매 충전",
    icon: "../servicesimage/services_charge.png",
    path: "/charge",
  },
  {
    id: 6,
    title: "이전",
    icon: "../servicesimage/services_move.png",
    path: "/move",
  },

  {
    id: 7,
    title: "철거",
    icon: "../servicesimage/services_demolish.png",
    path: "/demolish",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const { requestData, updateRequestData } = useRequest();
  const [selectedService, setSelectedService] = useState(
    requestData.service || ""
  );

  useEffect(() => {
    if (requestData.service) {
      setSelectedService(requestData.service);
    }
  }, [requestData.service]);

  const handleServiceClick = (service) => {
    updateRequestData("service", service.title);
    setSelectedService(service.title);
    navigate(service.path, { state: { selectedService: service.title } });
  };

  return (
    <ServiceContainer>
      <h1>간편하게 서비스 예약하고, 3시간 안에 배정받으세요!</h1>
      <p class="subtitle">
        누적 120건+,만족도 98%의 냉난방기 전문가 지금 배정 받으세요.
      </p>

      <ServiceList>
        {[...serviceData, { id: "empty", hidden: true }].map((service) =>
          service.hidden ? (
            <ServiceItem key={service.id} style={{ visibility: "hidden" }} />
          ) : (
            <ServiceItem
              key={service.id}
              onClick={() => handleServiceClick(service)}
              isSelected={selectedService === service.title}
            >
              <img src={service.icon} alt={`${service.title} 아이콘`} />
              <p class="service_title">{service.title}</p>
            </ServiceItem>
          )
        )}
      </ServiceList>
    </ServiceContainer>
  );
};

const ServiceContainer = styled.section`
  background-color: #ffffff;
  padding-top: 22px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  h1 {
    margin-left: 17px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};

    @media ${device.mobile} {
      font-size: 1.9rem;
      padding-left: 14px;
    }
  }
  h1:nth-child(2) {
    margin-bottom: 35px;
  }
  p.subtitle {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: ${({ theme }) => theme.colors.subtext};
    margin: 5px 0px 32px 17px;

    @media ${device.mobile} {
      font-size: 1.5rem;
      padding-left: 14px;
    }
  }
  p:last-child {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: ${({ theme }) => theme.colors.subtext};

    @media ${device.mobile} {
      font-size: 1.5rem;
      padding-left: 14px;
    }
  }
`;

const ServiceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: auto;
  list-style: none;
  padding: 0;

  @media ${device.mobile} {
    padding: 10px 10px 0px 10px;
  }
`;

const ServiceItem = styled.li`
  flex: 1 0 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
  height: 90px;

  @media ${device.mobile} {
    margin-bottom: 0px;
    height: 129px;
  }

  img {
    width: 45px;
    height: 45px;
    object-fit: contain;

    @media ${device.mobile} {
      width: 50px;
      height: 50px;
    }
  }

  p {
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;

    @media ${device.mobile} {
      font-size: 1.4rem;
      margin-top: 15px;
    }
  }
`;

export default Services;
