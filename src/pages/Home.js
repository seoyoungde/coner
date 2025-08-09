import React from "react";
import styled from "styled-components";
import Services from "../components/Homesections/Services";
import ServicesType from "../components/Homesections/ServicesType";
import { useScaleLayout } from "../hooks/useScaleLayout";
import bannerIcon from "../assets/images/home/banner.jpg";
import TechnicianList from "../components/Homesections/TechnicianList";
import ServiceInquirySection from "../components/Homesections/ServiceInquirySection";

const Home = () => {
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
        {/* <BannerSection>
          <BannerImg src={bannerIcon} alt="Coner 메인 배너" />
        </BannerSection> */}
        <MainContent>
          <Services />
          <Divider2 />
          <ServiceInquirySection />
          <Divider />
          <TechnicianList />
          <Divider />
          <ServicesType />
        </MainContent>
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
  box-sizing: border-box;
`;
const Divider2 = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f8f8f8;
  border-radius: 2px;
  margin: 20px 0 50px 0;
`;
const Divider = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f8f8f8;
  border-radius: 2px;
  margin: 60px 0 50px 0;
`;

const BannerSection = styled.section`
  width: 100%;
  height: 340px;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
`;

const MainContent = styled.section`
  width: 100%;
`;

export default Home;
