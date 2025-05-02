import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/icons/logoo.svg';
import car from '../../assets/icons/litlelogo.svg';

const StyledImage = () => {
  const [imageSrc, setImageSrc] = useState(car);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1050px)');

    const handleMediaChange = (e) => {
      if (e.matches) {
        setImageSrc (car); 
            
          
      } else {
        setImageSrc(logo); 
      }
    };

    handleMediaChange(mediaQuery); 
    mediaQuery.addListener(handleMediaChange); 

    return () => {
      mediaQuery.removeListener(handleMediaChange); 
    };
  }, []);

  return (
    <div>
      <StyleLogo src={imageSrc} alt="logo" />
      
    </div>
  );
};

export default StyledImage;

// Styled Image Component
const StyleLogo = styled.img`

  

  @media (max-width: 1050px) {
  position: absolute;
  left: 0;
  top: 0;
  width: 65px;
  }
`;

