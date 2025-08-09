import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { device } from "../../styles/theme";

const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const partnerSnapshot = await getDocs(collection(db, "Partner"));
        const engineerSnapshot = await getDocs(collection(db, "Engineer"));

        const engineersByPartner = new Map();

        engineerSnapshot.docs.forEach((doc) => {
          const engineer = doc.data();
          if (!engineersByPartner.has(engineer.partner_id)) {
            engineersByPartner.set(engineer.partner_id, engineer);
          }
        });

        const OUR_STAFF_PARTNER_ID = "pozMcVxtmmsXvtMLaItJ";

        const partners = partnerSnapshot.docs
          .map((doc) => {
            const partner = doc.data();
            const engineer = engineersByPartner.get(partner.partner_id) || {};

            return {
              id: doc.id,
              name: partner.name,
              partner_id: partner.partner_id,
              career: partner.career,
              address: partner.address,
              address_detail: partner.address_detail || "",
              experience: engineer.registered_at || "정보 없음",
              count: partner.completed_request_count || 0,
              logo_image_url: partner.logo_image_url,
            };
          })
          .filter((p) => p.partner_id !== OUR_STAFF_PARTNER_ID);

        // const shuffled = partners.sort(() => 0.5 - Math.random());

        const sortedByCount = partners.sort((a, b) => b.count - a.count);
        const selected = sortedByCount.slice(0, 3);

        setTechnicians(selected);
      } catch (err) {
        console.error("업체 데이터를 불러오는 데 실패했습니다:", err);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <Wrapper>
      <Title>협력업체 리스트</Title>
      <SubTitle>서비스 받고 싶은 업체를 선택해서 의뢰하세요!</SubTitle>

      {technicians.map((tech) => (
        <Card
          key={tech.id}
          selected={tech.id === selectedId}
          onClick={() => setSelectedId(tech.id)}
        >
          <LeftBox>
            <ProfileImage
              src={tech.logo_image_url || "/default-profile.png"}
              alt={tech.name}
            />
            <InfoContent>
              <Name>{tech.name}</Name>
              <Address>{tech.address}</Address>
              <Tag>경력 : {tech.career}</Tag>
              <Tag>
                완료한 건수 : <strong>{tech.count}</strong>
              </Tag>
            </InfoContent>
          </LeftBox>

          <ActionText
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/technician-address/${tech.id}`, {
                state: {
                  flowType: "fromTechnician",
                  selectedTechnician: tech,
                },
              });
            }}
          >
            이 업체에 의뢰하기
          </ActionText>
        </Card>
      ))}

      <MoreButton
        onClick={(e) => {
          navigate("/technician-select");
        }}
      >
        협력업체 더보기 &gt;
      </MoreButton>
    </Wrapper>
  );
};

export default TechnicianList;

const Wrapper = styled.div`
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-left: 42px;
  @media ${device.mobile} {
    font-size: 26px;
    padding-left: 10px;
    padding-right: 20px;
  }
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.subtext};
  margin: 5px 0px 32px 42px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    padding-left: 10px;
    padding-right: 38px;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid ${(props) => (props.selected ? "#C2E1FF" : "#eee")};
  border-radius: 8px;
  margin: 0 auto 10px;
  width: 87%;
  cursor: pointer;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;
const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 16px;
  @media ${device.mobile} {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #ddd;
  margin-right: 16px;
  object-fit: cover;
  @media ${device.mobile} {
    width: 85px;
    height: 85px;
    margin-right: 0px;
  }
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
  }
`;

const Address = styled.div`
  color: #555;
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
    margin-left: 0;
  }
`;

const Tag = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
  }
`;

const ActionText = styled.button`
  background: #007aff;
  color: #fff;
  border: none;
  padding: 8px 5px;
  border-radius: 7px;
  width: 130px;

  font-size: ${({ theme }) => theme.fonts.sizes.small};
  cursor: pointer;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
    width: 180px;
    margin: 30px auto 0 auto;
    display: block;
    padding: 10px 8px;
  }
`;

const MoreButton = styled.button`
  margin: 16px auto 0 auto;
  font-size: 15px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  text-align: center;
  display: block;
  border: none;
  background-color: white;

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.smallmedium};
    margin-top: 30px;
  }
`;
