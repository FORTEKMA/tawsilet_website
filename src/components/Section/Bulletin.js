import React from "react";
import styled from "styled-components";
import Send from "../../assets/icons/Send.svg"
import { useTranslation } from "react-i18next";


const Bulletin = () => {

  const { t, i18n } = useTranslation();
  return ( 

  <>
  <Hr></Hr>
    <BulletinSection>
      
      <InfoContainer>
        
        <Subtitle>{t("Bulletin.title")}</Subtitle>
      </InfoContainer>
      <FormContainer>
        <EmailInput type="email" placeholder="Your Email" />
        <SendButton>
        {t("Bulletin.button")} <Icon><img src={Send}/></Icon>
        </SendButton>
      </FormContainer>
    </BulletinSection>
    </>
  );
};

export default Bulletin;



const BulletinSection = styled.section`
  background-color: #ffffff; 
  padding: 0px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;


  @media (max-width: 744px) {
    flex-direction: column;
    /* align-items: flex-start; */
    gap: 15px;
    padding: 10px 20px;
  }
`;

const InfoContainer = styled.div`
  color: #000;
`;



const Subtitle = styled.p`

font-family: Inter;
font-size: 18px;
font-weight: 300;
line-height: 30px;
  color: #1b2b40;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 744px) {
    width: 100%;
  }
`;

const EmailInput = styled.input`

  margin-right: 20px; 
  width: 270px;
  height: 48px;
  outline: none;
    font-size: 1rem;
  border-radius: 5px ;
  padding: 10px 20px;
  border: 1px solid #1b2b40;
  &::placeholder  {
    color: #1b2b40;
    font-weight: 300;
    font-size: 16px;
    font-family: Inter;
  }
@media (max-width: 744px) {
    width: 100%;

  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color:  #fff; 
  color: #1b2b40;
  border: 1px solid #1b2b40;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 2px 2px 0px 0px rgba(24, 54, 90, 1);

`;

const Icon = styled.span`
  font-size: 1.2rem;

`;
export const Hr = styled.hr`
  width: 80%;
  align-self: center;
  justify-content: center;
  display: flex;
margin-top: 50px;
  align-items: center;
  margin-inline: auto;
  @media (max-width: 744px) {
   display: none;

  }
`;