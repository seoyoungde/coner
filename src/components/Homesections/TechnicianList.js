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

        const partners = partnerSnapshot.docs.map((doc) => {
          const partner = doc.data();
          const engineer = engineersByPartner.get(partner.partner_id) || {};

          return {
            id: doc.id,
            name: partner.name,
            career: partner.career,
            address: partner.address,
            address_detail: partner.address_detail || "",
            experience: engineer.registered_at || "정보 없음",
            count: engineer.completed_request_count || 0,
            logo_image_url: partner.logo_image_url,
          };
        });

        const shuffled = partners.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        setTechnicians(selected);
      } catch (err) {
        console.error("업체 데이터를 불러오는 데 실패했습니다:", err);
      }
    };

    fetchTechnicians();
  }, []);

  return (
    <Wrapper>
      <Title>업체 리스트</Title>
      <SubTitle>업체를 먼저 정해보세요</SubTitle>

      {technicians.map((tech) => (
        <Card
          key={tech.id}
          selected={tech.id === selectedId}
          onClick={() => setSelectedId(tech.id)}
        >
          <ProfileImage
            src={tech.logo_image_url || "/default-profile.png"}
            alt={tech.name}
          />
          <ContentBox>
            <NameContent>
              <Name>{tech.name}</Name>
              <Address>{tech.address}</Address>
            </NameContent>

            <CardContent>
              <TagContent>
                <Tag>경력 : {tech.career}</Tag>
                <Tag>
                  완료한 건수 : <strong>{tech.count}</strong>
                </Tag>
              </TagContent>
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
                [ 이 업체에 의뢰하기 ]
              </ActionText>
            </CardContent>
          </ContentBox>
        </Card>
      ))}

      <MoreButton
        onClick={(e) => {
          navigate("/technician-select");
        }}
      >
        + 더보기
      </MoreButton>
    </Wrapper>
  );
};

export default TechnicianList;

const Wrapper = styled.div`
  padding-top: 22px;
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
  width: 87%;
  margin: auto;
  margin-bottom: 10px;
  align-items: center;
  border: 2px solid ${(props) => (props.selected ? "#C2E1FF" : "#eee")};
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  @media ${device.mobile} {
    width: 81%;
    padding: 10px 10px 0px 10px;
    display: flex;
    flex-direction: row;
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
    width: 75px;
    height: 75px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
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
  margin-bottom: 8px;
  margin-left: 5px;

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

const ActionText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  white-space: nowrap;
  @media ${device.mobile} {
    margin-bottom: 10px;
  }
`;

const MoreButton = styled.div`
  margin-top: 16px;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  cursor: pointer;
  margin-left: 42px;

  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.medium};
    margin-left: 50px;
  }
`;
const NameContent = styled.div`
  display: flex;
  @media ${device.mobile} {
    disply: flex;
    flex-direction: column;
  }
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const TagContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  @media ${device.mobile} {
    width: 190px;
    margin-bottom: 10px;
  }
`;
