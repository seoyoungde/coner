import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";

const sections = [
  {
    items: [
      {
        label: "협업 문의",
        link: "https://nid.naver.com/nidlogin.login?url=https%3A%2F%2Fform.naver.com%2Fresponse%2Fs8wLn9wIdzIKvwZsOUOxsw",
      },
      { label: "코너 블로그", link: "https://blog.naver.com/coner-" },
      {
        label: "공지사항",
        link: "https://coner-aircon.notion.site/e3cfa3b4d2e447cc8ee54048172e61db",
      },
    ],
  },
  {
    items: [
      { label: "카카오톡 문의하기", link: "https://open.kakao.com/o/sJi3SUpf" },
      {
        label: "개인정보처리방침",
        link: "https://seojinhyeong.notion.site/79b84540aa2642e2ba26db26c2d39e7d",
      },
    ],
  },
];

const requestStates = [
  { label: "진행예정", count: "1건" },
  { label: "진행중", count: "1건" },
  { label: "진행완료", count: "1건" },
];

const MyPageSection = () => {
  const { scale, height, ref } = useScaleLayout();

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <UserBox>
          <h1> 반가워요 박서영님</h1>
          <Link to="/infomodify">내 정보 수정하기</Link>
          <Link to="/loginpage">로그인하기</Link>
        </UserBox>
        <Content>
          <ProfileSection>
            <Logo src="../conerlogo3.png" alt="앱 로고" />
            <p>박서영님</p>
          </ProfileSection>

          <UserRequestNumber>
            <StateBox>
              {requestStates.map((state, i) => (
                <StateItem key={i} isLast={i === requestStates.length - 1}>
                  <p>{state.label}</p>
                  <p>{state.count}</p>
                </StateItem>
              ))}
            </StateBox>
          </UserRequestNumber>

          {sections.map((section, index) => (
            <InfoSection key={index}>
              {section.items.map((item, idx) => (
                <InfoItem key={idx}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </InfoItem>
              ))}
            </InfoSection>
          ))}

          <Footer>
            <p>©CONER Co., All rights reserved.</p>
          </Footer>
        </Content>
      </Container>
    </ScaleWrapper>
  );
};

const ScaleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const UserBox = styled.div`
  padding: 40px;
  h1 {
    font-size: 20px;
    @media ${device.mobile} {
      font-size: 1.9rem;
    }
  }
  a {
    display: block;
    font-size: 14px;
    color: black;
    text-decoration: none;
    margin-top: 4px;
    @media ${device.mobile} {
      font-size: 1.2rem;
    }
  }
`;

const UserRequestNumber = styled.div`
  width: 100%;
  margin: auto;
  background-color: white;
  margin-bottom: 13px;
  border-radius: 10px;
`;

const StateBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 30px;
  text-align: center;
  @media ${device.mobile} {
    padding: 40px 30px;
  }
`;

const StateItem = styled.div`
  flex: 1;
  line-height: 1.5;
  border-right: ${({ isLast }) => (isLast ? "none" : "1px solid #b5b3b3")};

  p:nth-child(1) {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    @media ${device.mobile} {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  p:nth-child(2) {
    color: #00d6ed;
    text-decoration: underline;
    font-size: 17px;
    @media ${device.mobile} {
      font-size: 1.4rem;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
  p {
    font-size: 1.4rem;
  }
`;

const Logo = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 17px;
  @media ${device.mobile} {
    width: 220px;
    height: 220px;
  }
`;

const InfoSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px 0 5px 42px;
  margin-bottom: 15px;
`;

const InfoItem = styled.div`
  padding: 10px 0;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};

  a {
    text-decoration: none;
    color: #333;
    @media ${device.mobile} {
      font-size: 1.3rem;
      font-weight: 500;
      padding-left: 20px;
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  @media ${device.mobile} {
    font-size: 1.2rem;
    margin-top: 50px;
  }
`;

export default MyPageSection;
