import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import orangeTampon from "../../assets/icons/orangetampon.svg";
import { useTranslation } from "react-i18next";

const SliderOuter = styled.div`
  width: 430px;
  height: 400px;
  position: relative;

  @media (max-width: 744px) {
    width: 100%;
  }
`;

const SliderContainer = styled.div`
  width: 430px;
  height: 400px;
  gap: 0px;
  border-radius: 5px;
  opacity: 0px;
  overflow: hidden;
  position: relative;

  @media (max-width: 744px) {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    /* margin-left: 10px; */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => (props.active ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0px;

  @media (max-width: 744px) {
    /* width: 400px; */
    width: 100% !important;
    height: 80%;
  }
`;

const Tampon = styled.img`
  z-index: 99;
  width: 100px !important;
  height: 100px;
  position: absolute;
  top: -50px;
  left: -55px;

  @media (max-width: 744px) {
    width: 90px !important;
    z-index: 99;
    top: -40px;
    left: -20px;
  }
`;

const SliderTextBox = styled.div`
  z-index: 99999;
  padding: 1rem;
  position: absolute;
  bottom: 2rem;
  left: 20px;
  width: 70%;
  /* height: 100px; */
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: ${(props) => (props.active ? 1 : 0)};
  @media (max-width: 744px) {
 
    z-index: 99;
    bottom: 90px;
    
  }
`;

const SliderTitle = styled.h1`

  color: white;
  
  margin: 0;
  font-family: Inter;
font-size: 16px;
font-weight: 600;
margin-bottom: 10px;
text-align: start;

`;

const SliderDescription = styled.p`
  font-size: 18px;
  color: gray;
  margin: 0;
`;

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const { t, i18n } = useTranslation();

  const images = [
    {
      source: image1,
      title: t("ImageSlider.image1.title"),
      description: t("ImageSlider.image1.description"),
    },
    {
      source: image2,
      title: t("ImageSlider.image2.title"),
      description: t("ImageSlider.image2.description"),
    },
    {
      source: image3,
      title: t("ImageSlider.image3.title"),
      description: t("ImageSlider.image3.description"),
    },
    {
      source: image4,
      title: t("ImageSlider.image4.title"),
      description: t("ImageSlider.image4.description"),
    },
  ];

  return (
    <SliderOuter>
      <Tampon src={orangeTampon} alt="Tawsilt Tampon" />
      <SliderContainer>
        {images.map((img, index) => (
          <div key={index}>
            <Image
              src={img.source}
              alt={`Slide ${index}`}
              active={index === currentIndex}
            />
            <SliderTextBox active={index === currentIndex}>
              <SliderTitle>{img.title}</SliderTitle>
              <SliderDescription>{img.description}</SliderDescription>
            </SliderTextBox>
          </div>
        ))}
      </SliderContainer>
    </SliderOuter>
  );
};

export default ImageSlider;
