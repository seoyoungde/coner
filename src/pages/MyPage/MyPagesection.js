import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useScaleLayout } from "../../hooks/useScaleLayout";
import { device } from "../../styles/theme";
import { db } from "../../firebase";
import { collection, query, where } from "firebase/firestore";
import * as firebaseAuth from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthProvider";
import { onSnapshot } from "firebase/firestore";
import conerlogo3Icon from "../../assets/images/logo/conerlogo3.png";

const sections = [
  {
    items: [
      // {
      //   label: "협업 문의",
      //   link: "https://nid.naver.com/nidlogin.login?url=https%3A%2F%2Fform.naver.com%2Fresponse%2Fs8wLn9wIdzIKvwZsOUOxsw",
      // },

      {
        label: "공지사항",
        link: "https://coner-aircon.notion.site/e3cfa3b4d2e447cc8ee54048172e61db",
      },
    ],
  },
  {
    items: [
      { label: "자주 묻는 질문", link: "/qnapage" },
      {
        label: "개인정보처리방침",
        link: "https://seojinhyeong.notion.site/79b84540aa2642e2ba26db26c2d39e7d",
      },
    ],
  },
];

const MyPageSection = () => {
  const { scale, height, ref } = useScaleLayout();
  const navigate = useNavigate();
  const { currentUser, userInfo, setUserInfo } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!userInfo?.phone || userInfo?.isDeleted) return;

    const q = query(
      collection(db, "Request"),
      where("customer_phone", "==", userInfo.phone)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedRequests = snapshot.docs.map((doc) => doc.data());
      setRequests(fetchedRequests);
    });

    return () => unsubscribe();
  }, [userInfo]);

  const handleLogout = async () => {
    await firebaseAuth.signOut(auth);
    setUserInfo(null);
    navigate("/loginpage");
  };
  const requestStates = [
    {
      label: "진행예정",
      count: `${requests.filter((r) => r.status === 1).length}건`,
      statusValue: 1,
    },
    {
      label: "진행중",
      count: `${requests.filter((r) => r.status === 2).length}건`,
      statusValue: 2,
    },
    {
      label: "진행완료",
      count: `${requests.filter((r) => r.status === 4).length}건`,
      statusValue: 4,
    },
  ];

  return (
    <ScaleWrapper
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        height: `${height}px`,
      }}
    >
      <Container ref={ref}>
        <Content>
          <UserBox>
            <h1>반가워요 {userInfo?.name || "고객"}님</h1>

            {currentUser ? (
              <div></div>
            ) : (
              <Link to="/loginpage">로그인하기</Link>
            )}
          </UserBox>
          <ProfileSection>
            <Logo src={conerlogo3Icon} alt="앱 로고" />
            <p>{userInfo?.name || "고객"}님</p>
            {currentUser ? (
              <ModifyLink to="/infomodify">내 정보 수정하기</ModifyLink>
            ) : (
              <div></div>
            )}
          </ProfileSection>

          <UserRequestNumber>
            <StateBox>
              {requestStates.map((status, i) => (
                <StateItem
                  key={i}
                  $isLast={i === requestStates.length - 1}
                  onClick={() =>
                    navigate("/inquirydashboard", {
                      status: {
                        status: status.statusValue,
                        customer_uid: currentUser?.uid,
                      },
                    })
                  }
                >
                  <p>{status.label}</p>
                  <p>{status.count}</p>
                </StateItem>
              ))}
            </StateBox>
          </UserRequestNumber>

          {sections.map((section, index) => (
            <InfoSection key={index}>
              {section.items.map((item, idx) => (
                <InfoItem key={idx}>
                  {item.link.startsWith("http") ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.link}>{item.label}</Link>
                  )}
                </InfoItem>
              ))}
            </InfoSection>
          ))}

          <Footer>
            {currentUser ? (
              <LogoutBtn onClick={handleLogout}>로그아웃하기</LogoutBtn>
            ) : (
              <div></div>
            )}
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
      font-size: 24px;
    }
  }
  a {
    display: block;
    font-size: 14px;
    color: black;
    text-decoration: none;
    margin-top: 4px;
    @media ${device.mobile} {
      font-size: 18px;
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
    padding: 30px 20px;
  }
`;

const StateItem = styled.div`
  flex: 1;
  line-height: 1.5;
  border-right: ${({ $isLast }) => ($isLast ? "none" : "1px solid #b5b3b3")};

  p:nth-child(1) {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    @media ${device.mobile} {
      font-size: 18px;
      font-weight: 600;
    }
  }

  p:nth-child(2) {
    color: #0080ff;
    text-decoration: underline;
    font-size: 17px;
    @media ${device.mobile} {
      font-size: 18px;
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
    width: 200px;
    height: 200px;
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
      font-size: 18px;
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
    font-size: 16px;
    margin-top: 50px;
  }
`;
const ModifyLink = styled(Link)`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-decoration: none;
  color: #a2a2a2;
  cursor: pointer;
  @media ${device.mobile} {
    font-size: 18px;
  }
`;
const LogoutBtn = styled.button`
  border: none;
  backgroundcolor: #f9f9f9;
  textdecoration: underline;
  color: blue;
  margin-bottom: 0.5rem;
  @media ${device.mobile} {
    font-size: 16px;
  }
`;

export default MyPageSection;
