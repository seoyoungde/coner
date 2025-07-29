import React from "react";
import styled from "styled-components";
import Services from "../components/Homesections/Services";
import ServicesType from "../components/Homesections/ServicesType";
import { useScaleLayout } from "../hooks/useScaleLayout";
import bannerIcon from "../assets/images/home/banner.jpg";

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

        <Services />
        <ServicesType />
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
