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


    const fakeData1 = [
      {
        description: "Service impeccable , Le chauffeur est arrivé à l'heure et le transport s'est fait sans souci. Jerecommande vivement Tawsilet",
        title: "Mohamed Ben Amor",
        tag: "Client ",

        imageSrc:  client7,
      },
      {
        description: "Déménagement rapide et efficace, merci à l'équipe Tawsilet pour leur professionnalisme ",
        title: "Sarra Khelifi ",
        tag: "Client",
        imageSrc: client3,
      },
      {
        description: "Facile à réserver , chauffeur professionnel et prix très correct. Excellente expérience",
        title: "Hichem Laabidi ",
        tag: "Client",
        imageSrc: client1,
      },
      {
        description: "Un service qui manquait en Tunisie ! Très pratique et simple à utiliser. Merci Tawsilet ",
        title: "Firas Messaoudi ",
        tag: "Client",

        imageSrc: client4,
      },
       
      ];
      
      const fakeData2 = [
        {
          description: "Je ne connaissais pas Tawsilet avant, mais maintenant je l'utilise à chaque besoin. Service fiable et sérieux",
          title: "Amira Dhouibi",
          tag: "Client ",
 
          imageSrc: client8,
        },
        {
          description: "Chauffeurs sérieux et service client réactif. Expérience parfaite du début à la fin ",
          title: "Oussama Tlili ",
          tag: "Client",
          imageSrc: client2,
        },
        {
          description: "Tawsilet, c'est la solution idéale pour un transport sans stress. Service professionnel et rapide ",
          title: "Anis Khouini ",
          tag: "Client",
          imageSrc: client6,
        },
        {
          description: "Application intuitive, chauffeur sérieux et prix compétitif. Je recommande vivement",
          title: "Houssem Jaziri",
          tag: "Client",

          imageSrc: client5,
        },
      ];
  return (
    <Wrapper>
        <Middle>
      <HeadingUp>
      {t("ABOUT.Review.title")}
      </HeadingUp>
      <Description>
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