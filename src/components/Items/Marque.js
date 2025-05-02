import React from 'react';
import styled, { keyframes } from 'styled-components';

const Marque = ({ images, speed = 0 }) => {
  return (
    <AppContainer>
      <Inner>
        <Wrapper>
          <Section style={{ animationDuration: `${speed}ms` }}>
            {images?.map(({ id, image }) => (
              <ImageContainer className="image" key={id}>
                <Image src={image} alt={id} />
              </ImageContainer>
            ))}
          </Section>
          <Section style={{ animationDuration: `${speed}ms` }}>
            {images?.map(({ id, image }) => (
              <ImageContainer className="image" key={id}>
                <Image src={image} alt={id} />
              </ImageContainer>
            ))}
          </Section>
          <Section style={{ animationDuration: `${speed}ms` }}>
            {images?.map(({ id, image }) => (
              <ImageContainer className="image" key={id}>
                <Image src={image} alt={id} />
              </ImageContainer>
            ))}
          </Section>
          <Section style={{ animationDuration: `${speed}ms` }}>
            {images?.map(({ id, image }) => (
              <ImageContainer className="image" key={id}>
                <Image src={image} alt={id} />
              </ImageContainer>
            ))}
          </Section>
         
        </Wrapper>
      </Inner>
    </AppContainer>
  );
};

export default Marque;

const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 100%;
  background: white;
  border-radius: 10px;
  /* height: 150px; */
  padding-top: 10px;
  padding-bottom: 10px;

  /* -webkit-box-shadow: inset 73px 3px 44px 22px #bf1212;
-moz-box-shadow: inset 73px 3px 44px 22px #bf1212; */
/* box-shadow: inset 73px 3px 44px 22px #bf1212; */
  

`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 6rem;
  
`;

const Wrapper = styled.div`
  display: flex;
  gap:250px;
  @media (max-width: 744px) {
    gap:80px;
  }
 
`;
const swipe = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
const Section = styled.section`
  display: flex;
  gap:250px;
  
  animation: ${swipe} linear infinite;
  @media (max-width: 744px) {
    gap:90px;
  }
  
`;



const ImageContainer = styled.div`
  padding: 0 15px;

  &:last-of-type {
    padding-left: 0;
  }
`;

const Image = styled.img`
  max-width: 170px;
  height: 6rem;
  @media (max-width: 744px) {
    max-width: 120px;
  height: 4rem;
  }
  /* object-fit: cover; */
`;
