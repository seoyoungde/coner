import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { IoIosArrowBack } from "react-icons/io";
import { device } from "../../styles/theme";
import FormLayout from "../../components/Apply/FormLayout";
import { useRequest } from "../../context/context";

const TechnicianSelectionPage = () => {
  const [technicians, setTechnicians] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const { scale, height, ref } = useScaleLayout();
  const { updateRequestData } = useRequest();

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

        const shuffled = partners.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setTechnicians(selected);
      } catch (err) {
        console.error("업체 데이터를 불러오는 데 실패했습니다:", err);
      }
    };

    fetchTechnicians();
  }, []);

  const handleRandomMatch = () => {
    if (technicians.length === 0) return;
    const randomTech =
      technicians[Math.floor(Math.random() * technicians.length)];
    updateRequestData("selectedTechnician", randomTech);
    navigate(`/technician-address/${randomTech.id}`, {
      state: {
        flowType: "randomTechnician",
        selectedTechnician: randomTech,
      },
    });
  };

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon>
              <IoIosArrowBack size={32} color="#333" />
            </BackIcon>
          </BackButton>
        </Header>
        <InnerWrapper>
          <FormLayout
            title="협력업체 선택"
            subtitle="서비스 받고 싶은 업체를 선택해서 의뢰하세요!"
          >
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

            <TechCard onClick={handleRandomMatch}>
              <TechInfo>
                <Name>기사님 랜덤 매칭하기</Name>
                <RandomDesc>
                  원하는 시간과 날짜에 바로 서비스가 가능한 기사님을 바로
                  매칭해드립니다
                </RandomDesc>
              </TechInfo>
              <SubmitButton>랜덤으로 의뢰하기</SubmitButton>
            </TechCard>
          </FormLayout>
        </InnerWrapper>
      </Container>
    </ScaleWrapper>
  );
};

export default TechnicianSelectionPage;

const ScaleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const InnerWrapper = styled.div`
  width: 95%;
  margin: auto;
  @media ${device.mobile} {
    width: 86%;
    margin: auto;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 10px;
  padding-top: 10px;
  @media ${device.mobile} {
    padding-left: 20px;
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
  align-items: flex-start;

  @media ${device.mobile} {
    margin-left: 5px;
    margin-right: 5px;
    align-items: center;
    text-align: center;
  }
`;
const BackIcon = styled(IoIosArrowBack)`
  font-size: 30px;
  @media ${device.mobile} {
    font-size: 40px;
  }
`;
const TechCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background: ${(props) => (props.selected ? "#C2E1FF" : "#fff")};
  cursor: pointer;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;

  @media ${device.mobile} {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;
const ProfileImage = styled.img`
  width: 73px;
  height: 73px;
  border-radius: 8px;
  object-fit: cover;
  background: #eee;

  @media ${device.mobile} {
    width: 90px;
    height: 90px;
    margin-bottom: 10px;
  }
`;
const TechInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media ${device.mobile} {
    align-items: center;
    margin-bottom: 20px;
  }
`;

const Tag = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
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
  width: 100%;
  cursor: pointer;

  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    text-align: center;
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
const RandomDesc = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizes.smaller};
  color: #777;
  margin-top: 5px;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.small};
  }
`;
const SubmitButton = styled.button`
  background: #007aff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  cursor: pointer;
  @media ${device.mobile} {
    font-size: ${({ theme }) => theme.fonts.mobilesizes.smallmedium};
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
