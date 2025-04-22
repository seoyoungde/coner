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
      <h1>간편하게 신청하고 바로 연결!</h1>
      <h1>필요한 에어컨 서비스는 무엇인가요?</h1>

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
              <p>{service.title}</p>
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
  text-align: center;
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
