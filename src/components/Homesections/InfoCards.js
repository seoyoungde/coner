import React from "react";
import styled from "styled-components";
import Divider from "../layout/Divider";

const cards = [
  {
    id: 1,
    title: ["간단한 에어컨 문제 해결", "가이드"],
    image: "../infocardsimage/infocards_1.png",
    link: "https://blog.naver.com/coner-/223477313584",
  },
  {
    id: 2,
    title: ["에어컨 종류별 장단점"],
    image: "../infocardsimage/infocards_2.png",
    link: "https://blog.naver.com/coner-/223470297317",
  },
  {
    id: 3,
    title: ["실내기 관리만큼 중요한 실", "외기 관리 방법"],
    image: "../infocardsimage/infocards_3.png",
    link: "https://blog.naver.com/coner-/223470297317",
  },
];

const InfoCards = () => {
  return (
    <InfoContainer>
      <h2>코너가 알려주는 에어컨 정보</h2>
      <CardList>
        {cards.map((card) => (
          <InfoCard
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={card.image} alt={card.title.join("")} />
            <h3>
              {card.title.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </h3>
          </InfoCard>
        ))}
      </CardList>
      <Divider />
    </InfoContainer>
  );
};

const InfoContainer = styled.section`
  width: 100%;
  margin-top: 23px;
  h2 {
    margin-left: 17px;
    margin-bottom: 18px;
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};

    @media (max-width: 600px) {
      width: 80%;
      margin: auto;
    }
  }
`;

const CardList = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
  margin: auto;
  list-style: none;
  margin-bottom: 42px;

  white-space: nowrap;

  @media (max-width: 600px) {
    width: 78%;
    margin-top: 17px;
  }
`;

const InfoCard = styled.a`
  display: inline-flex;
  flex-direction: column;
  gap: 3px;
  min-width: 180px;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  img {
    width: 180px;
    height: 180px;
    object-fit: contain;

    @media (max-width: 600px) {
      margin-bottom: 6px;
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.medium || "17px"};
    font-weight: ${({ theme }) => theme.fonts.weights.bold || "980"};
  }
`;
export default InfoCards;
