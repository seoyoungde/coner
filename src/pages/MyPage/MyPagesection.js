import React, { useState } from "react";
import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const sections = [
  {
    items: [
      {
        label: "공지사항",
        link: "https://coner-aircon.notion.site/e3cfa3b4d2e447cc8ee54048172e61db",
      },
      {
        label: "카카오톡 문의",
        link: "https://open.kakao.com/o/sJi3SUpf",
      },
      {
        label: "협업 문의",
        link: "https://nid.naver.com/nidlogin.login?url=https%3A%2F%2Fform.naver.com%2Fresponse%2Fs8wLn9wIdzIKvwZsOUOxsw",
      },
    ],
  },
  {
    items: [
      {
        label: "개인정보처리방침",
        link: "https://seojinhyeong.notion.site/79b84540aa2642e2ba26db26c2d39e7d",
      },
      {
        label: "코너 블로그",
        link: "https://blog.naver.com/coner-",
      },
    ],
  },
];

const MyPageSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <Container>
      <Content>
        <ProfileSection>
          <Logo src="../conerlogo3.png" alt="앱 로고" />
          {/* <Instruction>
            앱에서 회원가입하고 편하게 서비스를 관리하세요.
          </Instruction>
          <DownloadLink onClick={togglePopup}>앱 다운로드하기</DownloadLink> */}
        </ProfileSection>

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

        {/* <HelpCenter>
          <h4>Help Center</h4>
          <p>coner.aircon@gmail.com</p>
          <SocialIcons>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size="40" color="#3C5999" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram size="40" color="#E4405F" />
            </a>
          </SocialIcons>
        </HelpCenter> */}

        <Footer>
          <p>©CONER Co., All rights reserved.</p>
        </Footer>
      </Content>

      {isPopupOpen && (
        <PopupOverlay>
          <Popup>
            <QrCodeContainer>
              <QrCodeItem>
                <h3>안드로이드</h3>
                <img src="../Android.png" alt="Android QR Code" />
              </QrCodeItem>
              <QrCodeItem>
                <h3>아이폰</h3>
                <img src="../iphone.png" alt="iPhone QR Code" />
              </QrCodeItem>
            </QrCodeContainer>
            <CloseButton onClick={togglePopup}>닫기</CloseButton>
          </Popup>
        </PopupOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  height: 100%;
  background-color: #f9f9f9;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 35px;
  margin-top: 30px;
`;

const Logo = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 17px;
`;

const Instruction = styled.p`
  font-size: 19px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 10px;
`;

const DownloadLink = styled.button`
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: black;
  text-decoration: underline;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  background: none;
  border: none;
  cursor: pointer;
`;

const InfoSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 5px;
  padding-left: 42px;
  margin-bottom: 15px;
`;

const InfoItem = styled.div`
  padding: 10px 0;
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};

  a {
    text-decoration: none;
    color: #333;
  }
`;

const HelpCenter = styled.div`
  margin-top: 95px;

  h4 {
    font-size: ${({ theme }) => theme.fonts.sizes.large};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    margin-bottom: 10px;
  }

  p {
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: white;
  border-radius: 10px;
  text-align: center;
  width: 400px;
`;

const QrCodeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: auto;
  margin-top: 25px;
`;

const QrCodeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }

  img {
    width: 140px;
    height: 140px;

    margin-bottom: 20px;
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border-radius: 5px;
  cursor: pointer;
`;

export default MyPageSection;
