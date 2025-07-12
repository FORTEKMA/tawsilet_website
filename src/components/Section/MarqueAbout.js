import React, { useState, useEffect } from 'react';
import Marquee from '../Items/Marquee'
import MarqueeCard from '../Items/MarqueeCard'
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import client1 from '../../assets/images/client1.png';
import client2 from '../../assets/images/client2.png';
import client3 from '../../assets/images/client3.png';
import client4 from '../../assets/images/client4.png';
import client5 from '../../assets/images/client5.jpg';
import client6 from '../../assets/images/client6.jpeg';
import client7 from '../../assets/images/client7.jpg';
import client8 from '../../assets/images/client8.png';

const MarqueAbout = () => {

  const { t, i18n } = useTranslation();
  
  // Determine text direction based on current language
  const isRTL = i18n.language.startsWith('ar');
  const textDirection = isRTL ? 'rtl' : 'ltr';

  const fakeData1 = [
    {
      description: t("ABOUT.Review.reviews.review1.description"),
      title: t("ABOUT.Review.reviews.review1.title"),
      tag: t("ABOUT.Review.reviews.review1.tag"),
      imageSrc: client7,
    },
    {
      description: t("ABOUT.Review.reviews.review2.description"),
      title: t("ABOUT.Review.reviews.review2.title"),
      tag: t("ABOUT.Review.reviews.review2.tag"),
      imageSrc: client3,
    },
    {
      description: t("ABOUT.Review.reviews.review3.description"),
      title: t("ABOUT.Review.reviews.review3.title"),
      tag: t("ABOUT.Review.reviews.review3.tag"),
      imageSrc: client1,
    },
    {
      description: t("ABOUT.Review.reviews.review4.description"),
      title: t("ABOUT.Review.reviews.review4.title"),
      tag: t("ABOUT.Review.reviews.review4.tag"),
      imageSrc: client4,
    },
  ];
      
  const fakeData2 = [
    {
      description: t("ABOUT.Review.reviews.review5.description"),
      title: t("ABOUT.Review.reviews.review5.title"),
      tag: t("ABOUT.Review.reviews.review5.tag"),
      imageSrc: client8,
    },
    {
      description: t("ABOUT.Review.reviews.review6.description"),
      title: t("ABOUT.Review.reviews.review6.title"),
      tag: t("ABOUT.Review.reviews.review6.tag"),
      imageSrc: client2,
    },
    {
      description: t("ABOUT.Review.reviews.review7.description"),
      title: t("ABOUT.Review.reviews.review7.title"),
      tag: t("ABOUT.Review.reviews.review7.tag"),
      imageSrc: client6,
    },
    {
      description: t("ABOUT.Review.reviews.review8.description"),
      title: t("ABOUT.Review.reviews.review8.title"),
      tag: t("ABOUT.Review.reviews.review8.tag"),
      imageSrc: client5,
    },
  ];
  return (
    <Wrapper>
        <Middle>
      <HeadingUp dir={textDirection}>
      {t("ABOUT.Review.title")}
      </HeadingUp>
      <Description dir={textDirection}>
      {t("ABOUT.Review.desc")}
         </Description>
         </Middle>
         <Container>
         <Marquee>
        {fakeData1.map((face, index) => (
          <MarqueeCard
            key={index}
            description={face.description}
            title={face.title}
            tag={face.tag}
            imageSrc={face.imageSrc}
            dir={textDirection}
          />
        ))}
      </Marquee>

     
      <SecondMarque>
        <Marquee reverse>
          {fakeData2.map((face, index) => (
            <MarqueeCard
              key={index}
              description={face.description}
              title={face.title}
              tag={face.tag}
              imageSrc={face.imageSrc}
              dir={textDirection}
            />
          ))}
        </Marquee>
        </SecondMarque>
    </Container>
  </Wrapper>
  )
}

export default MarqueAbout;
export const SecondMarque= styled.div`

@media (max-width: 744px) {
  display: none;

}
`;
export const Container = styled.div`

@media (max-width: 744px) {
  display: flex;

}
`;
export const Description = styled.div`
font-weight: 400;
font-size: 16px;
color: #0c0c0c;
line-height: 30px;
width: 65%;
text-align: center;
direction: ${props => props.dir || 'ltr'};
@media (max-width: 744px) {
  font-size: 16px;
  width: 280px;
  margin-bottom: 1.25rem;
}
`;
export const HeadingUp = styled.div`
font-weight: 700;
font-size: 2.8125rem;
color: #0c0c0c;
text-align: center;
direction: ${props => props.dir || 'ltr'};
@media (max-width: 744px) {
  font-size: 24px;
}
`;
const Middle = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 1.25rem;
`;
export const Wrapper = styled.div`
  background: white;
  border-radius: 26px;
  margin-left: 30px;
  margin-right: 30px;
  padding-ttp:30px
`;