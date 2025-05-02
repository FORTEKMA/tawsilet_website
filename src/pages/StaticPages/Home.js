import React from "react";
import { useRef, lazy } from "react";
import styled from "styled-components";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const ContentWhiteBox = lazy(() =>
  import("../../components/Section/ContentWhiteBox")
);
const HomeAbout = lazy(() => import("../../components/Section/HomeAbout"));
const ContactezNous = lazy(() =>
  import("../../components/Section/ContactezNous")
);
const SuiviLivraision = lazy(() =>
  import("../../components/Section/SuiviLivraision")
);
const ExelentService = lazy(() =>
  import("../../components/Section/ExelentService")
);

const Telecharger = lazy(() => import("../../components/Items/Telecharger"));

const TrrustUs = lazy(() => import("../../components/Section/TrrustUs"));

const JoinSheelni = lazy(() => import("../../components/Section/JoinSheelni"));

import MapHome from "../../components/Section/MapHome";
// import Hero from "../../components/Section/Hero";
// import { Helmet } from "react-helmet-async";
const Footer = lazy(() => import("../../components/Section/Footer"));
const GetEstimate = lazy(() => import("../EstimationFormStepper"));

const Home = () => {
  const MapRef = useRef(null);
  // const ScrollToMap = () => {
  //   MapRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  // };

  return (
    <>
 
      <Container_Home>
        {/* <GetEstimate /> */}
        <MapHome MapRef={MapRef} />

        {/* <Hero MapRef={MapRef} ScrollToMap={ScrollToMap} /> */}
        <ContentWhiteBox>
          {/* <MapHome MapRef={MapRef} /> */}
          <HomeAbout />
        </ContentWhiteBox>
        <SuiviLivraision />
        <ExelentService />
        {/* <TrrustUs /> */}
        {/* <LazyLoadComponent> */}
          <Telecharger />

          <JoinSheelni />
          <ContactezNous />
        {/* </LazyLoadComponent> */}
        {/* <ContactezNous /> */}
        {/* <Commencer /> */}
      </Container_Home>
      <Footer />
    </>
  );
};

export default Home;

const Container_Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  @media (max-width: 894px) {
    gap: 3rem;
  }
`;
