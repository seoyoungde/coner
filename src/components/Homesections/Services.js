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
    title: "점검",
    icon: inspectionIcon,
    path: "/inspection",
  },
  {
    id: 3,
    title: "청소",
    icon: cleanIcon,
    path: "/clean",
  },
  {
    id: 4,
    title: "수리",
    icon: repairIcon,
    path: "/repair",
  },
  {
    id: 5,
    title: "냉매충전",
    icon: chargeIcon,
    path: "/charge",
  },
  {
    id: 6,
    title: "이전",
    icon: moveIcon,
    path: "/move",
  },

  {
    id: 7,
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

    if (service.title === "설치") {
      navigate("/install");
    } else {
      navigate(`/addresspage?service=${service.title}`, {
        state: { selectedService: service.title },
      });
    }
  };
  return (
    <ServiceContainer>
      <h1>일정만 남기면, 냉난방기 기사가 자동으로 도착합니다.</h1>
      <p className="subtitle">전화 없이, 검색없이, 오직 한번의 입력으로</p>

      <ServiceList>
        {[...serviceData, { id: "empty", hidden: true }].map((service) =>
          service.hidden ? (
            <ServiceItem key={service.id} style={{ visibility: "hidden" }} />
          ) : (
            <ServiceItem
              key={service.id}
              onClick={() => handleServiceClick(service)}
              $isSelected={selectedService === service.title}
            >
              <img src={service.icon} alt={`${service.title} 아이콘`} />
              <p className="service_title">{service.title}</p>
            </ServiceItem>
          )
        )}
        <LinkBox>
          <StyledLink to="/pricing">서비스비용이 궁금하신가요?</StyledLink>
          <ChatBox>
            <ChatTitle>서비스에대해 문의하실 사항이 있으신가요?</ChatTitle>
            <OnlineChat
              href="https://talk.naver.com/ct/w7a8bh2#nafullscreen"
              target="_blank"
              rel="noopener noreferrer"
            >
              온라인상담하기
            </OnlineChat>
          </ChatBox>
        </LinkBox>
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
    margin-left: 42px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};

    @media ${device.mobile} {
      font-size: 28px;
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
    margin: 5px 0px 32px 42px;

    @media ${device.mobile} {
      font-size: 20px;
      padding-left: 10px;
      padding-right: 38px;
    }
  }
  p:last-child {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    color: black;

    @media ${device.mobile} {
      font-size: 20px;
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
const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;
const StyledLink = styled(Link)`
  margin-bottom: 10px;
  color: #a0a0a0;
  font-size: 0.9rem;

  @media ${device.mobile} {
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
  }
`;
const OnlineChat = styled.a`
  font-size: 0.9rem;
  border: 1px solid #0080ff;

  padding: 7px;
  border-radius: 5px;
  text-decoration: none;
  color: #0080ff;
  @media ${device.mobile} {
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
  }
`;
const ChatTitle = styled.p`
  text-align: center;
  padding: 8px 0px 0px 0px;
  color: #a0a0a0;
  font-size: 0.9rem;
  @media ${device.mobile} {
    padding: 8px 0px 0px 10px;
  }
`;
const ChatBox = styled.div`
  display: flex;
  gap: 10px;
`;
export default Services;
