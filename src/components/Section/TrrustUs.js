import React, { Suspense, lazy } from 'react';
import styled from "styled-components";
import LightTypo from "../../constants/LightTypo";
import { useTranslation } from "react-i18next";

// Lazy load the Marque component
const Marque = lazy(() => import('../Items/Marque'));

// Statically import images
import image1 from "../../assets/icons/carfour.svg";
import image2 from "../../assets/icons/decalthon.svg";
import image3 from "../../assets/icons/gean.svg";
import image4 from "../../assets/icons/brigola.svg";

const TrrustUs = () => {
  const { t } = useTranslation();

  const images = [
    { id: crypto.randomUUID(), image: image1 },
    { id: crypto.randomUUID(), image: image2 },
    { id: crypto.randomUUID(), image: image3 },
    { id: crypto.randomUUID(), image: image4 },
  ];

  return (
    <Content>
      <Middle>
        <LightTypo headingupe={t("ACCEUILE.TRUSTUS.title2")} />
        <Container>
          {/* Wrap the Marque component with Suspense */}
          <Suspense fallback={<div>Loading...</div>}>
            <Marque images={images} speed={18000} />
          </Suspense>
        </Container>
      </Middle>
    </Content>
  );
};

export default TrrustUs;

// Styled components
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  border-radius: 32px;
  @media (max-width: 744px) {
    width: 80%;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.25rem;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  gap: 20%;
  display: flex;
`;
