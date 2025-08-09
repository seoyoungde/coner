import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "../../context/context";
import { device } from "../../styles/theme";
import installIcon from "../../assets/images/services/services_install.png";
import inspectionIcon from "../../assets/images/services/services_inspection.png";
import cleanIcon from "../../assets/images/services/services_clean.png";
import repairIcon from "../../assets/images/services/services_repair.png";
import chargeIcon from "../../assets/images/services/services_charge.png";
import moveIcon from "../../assets/images/services/services_move.png";
import demolishIcon from "../../assets/images/services/services_demolish.png";

const serviceData = [
  {
    id: 1,
    title: "설치",
    icon: installIcon,
    path: "/install",
  },
  {
    id: 2,
    title: "설치&에어컨구매",
    icon: installIcon,
    path: "/install-purchase",
  },

  {
    id: 3,
    title: "점검",
    icon: inspectionIcon,
    path: "/inspection",
  },
  {
    id: 4,
    title: "청소",
    icon: cleanIcon,
    path: "/clean",
  },

  {
    id: 5,
    title: "수리",
    icon: repairIcon,
    path: "/repair",
  },

  {
    id: 6,
    title: "냉매충전",
    icon: chargeIcon,
    path: "/charge",
  },
  {
    id: 7,
    title: "이전",
    icon: moveIcon,
    path: "/move",
  },

  {
    id: 8,
    title: "철거",
    icon: demolishIcon,
    path: "/demolish",
  },
];

const Services = () => {
  const navigate = useNavigate();
  const { requestData, updateRequestData } = useRequest();
  const [selectedService, setSelectedService] = useState(
    requestData.service_type || ""
  );

  useEffect(() => {
    if (requestData.service_type) {
      setSelectedService(requestData.service_type);
    }
  }, [requestData.service]);

  const handleServiceClick = (service) => {
    updateRequestData("service_type", service.title);
    setSelectedService(service.title);

    if (service.path === "/install" || service.path === "/install-purchase") {
      navigate(service.path);
    } else {
      navigate(`/addresspage?service=${service.title}`, {
        state: { selectedService: service.title },
      });
    }
  };

  return (
    <ServiceContainer>
      <h1>전화 없이, 검색 없이, 오직 한번의 입력으로</h1>
      <p className="subtitle">
        일정만 남기면, 냉난방기 기사가 자동으로 도착합니다.
      </p>

      <ServiceList>
        {serviceData.map((service) => (
          <ServiceItem
            key={service.id}
            onClick={() => handleServiceClick(service)}
            $isSelected={selectedService === service.title}
          >
            <img src={service.icon} alt={`${service.title} 아이콘`} />
            <p className="service_title">{service.title}</p>
          </ServiceItem>
        ))}
      </ServiceList>
    </ServiceContainer>
  );
};

const ServiceContainer = styled.section`
  margin-top: 80px;
  background-color: #ffffff;
  padding-top: 22px;
  h1 {
    margin-left: 42px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};

    @media ${device.mobile} {
      font-size: 26px;
      padding-left: 10px;
      padding-right: 20px;
    }
  }
  h1:nth-child(2) {
    margin-bottom: 35px;
  }
  p.subtitle {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: ${({ theme }) => theme.colors.subtext};
    margin: 6px 0px 52px 42px;

    @media ${device.mobile} {
      font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
      padding-left: 10px;
      padding-right: 38px;
    }
  }
  p:last-child {
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fonts.weights.smallmedium};
    color: black;
    margin-top: 7px;
    @media ${device.mobile} {
      ${({ theme }) => theme.fonts.mobilesizes.medium}
      margin-top: 15px;
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
  justify-content: flex-start;
  gap: 10px @media ${device.mobile} {
    padding: 10px 10px 0px 10px;
  }
`;

const ServiceItem = styled.li`
  flex: 0 0 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  height: 90px;
  margin-bottom: 20px;

  @media ${device.mobile} {
    flex: 0 0 33%;
    height: 129px;
    margin-bottom: 0px;
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
`;

export default Services;
