import React, { lazy } from "react";
import styled from "styled-components";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const ContentWhiteBox = lazy(() => import("../../components/Section/ContentWhiteBox"));
const HomeAbout = lazy(() => import("../../components/Section/HomeAbout"));
const ContactezNous = lazy(() => import("../../components/Section/ContactezNous"));
const SuiviLivraision = lazy(() => import("../../components/Section/SuiviLivraision"));
const ExelentService = lazy(() => import("../../components/Section/ExelentService"));
const Telecharger = lazy(() => import("../../components/Items/Telecharger"));
const Footer = lazy(() => import("../../components/Section/Footer"));

const Home = () => {
  return (
    <>
      <Container_Home>
        <ContentWhiteBox>
          <HomeAbout />
        </ContentWhiteBox>
        <SuiviLivraision />
        <ExelentService />
        <Telecharger />
        <ContactezNous />
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