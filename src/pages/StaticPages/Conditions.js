import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
// import { Helmet } from "react-helmet-async";
 import { useTranslation } from "react-i18next";
const Conditions = () => {
 
  const { t, i18n } = useTranslation();
  return (
    <>
   
      <Content>
        <Content_politique>
          <Content_heading>{t('Conditions.heading')}</Content_heading>

          <Title_Description>{t('Conditions.identity.title')}</Title_Description>
          <Description>
            {t('Conditions.identity.description')}
          </Description>

          <Title_Description>{t('Conditions.dataProcessing.title')}</Title_Description>
          <Description>
            {t('Conditions.dataProcessing.description')}
          </Description>

          <Title_Description>{t('Conditions.dataPurposes.title')}</Title_Description>
          <Description>
            {t('Conditions.dataPurposes.description')}
          </Description>

          <Title_Description>{t('Conditions.legalBasis.title')}</Title_Description>
          <Description>
            {t('Conditions.legalBasis.description')}
          </Description>

          <Title_Description>{t('Conditions.rights.title')}</Title_Description>
          <Description>
            {t('Conditions.rights.description')}
          </Description>

          <Title_Description>{t('Conditions.dataRetention.title')}</Title_Description>
          <Description>
            {t('Conditions.dataRetention.description')}
          </Description>

          <Title_Description>{t('Conditions.securityMeasures.title')}</Title_Description>
          <Description>
            {t('Conditions.securityMeasures.description')}
          </Description>

          <Title_Description>{t('Conditions.dpd.title')}</Title_Description>
          <Description>
            {t('Conditions.dpd.description')}
          </Description>
          <br></br>
          <Descriptione>
            {t('Conditions.dpd.mrc')}
          </Descriptione>
        </Content_politique>
      </Content>
    </>
  );
};

export default Conditions;
const Bold = styled.span`
  color: var(--white, #fff);
  /* Title text */
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 155.556%; /* 1.94444rem */
  @media (max-width: 744px) {
    font-size: 0.8rem;
  }
`;

const Content_politique = styled.div`
  width: 45%;
  @media (max-width: 744px) {
    width: 100%;
  }
`;
const Description = styled.h1`
  width: 100%;
  color: #d8d8d8;
  /* Body 2 */
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;

  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0.01rem;
  text-align: justify;
  @media (max-width: 744px) {
    width: 100vw;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.5rem;
    text-align: center;
  }
`;
const Descriptione = styled.h1`
  width: 100%;
  color: #d8d8d8;
  /* Body 2 */
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 700;

  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0.01rem;
  text-align: justify;
  @media (max-width: 744px) {
    width: 100vw;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.5rem;
    text-align: center;
  }
`;

const Title_Description = styled.div`
  color: var(--white, #fff);
  /* Title text */
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  whiteSpace: "pre-line" ,
  padding-top: 2rem;
  padding-bottom: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 155.556%; /* 1.94444rem */

  @media (max-width: 744px) {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 0rem;
  }
`;
const Title_Description_Two = styled.div`
  color: var(--white, #fff);
  /* Title text */
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 155.556%; /* 1.94444rem */

  @media (max-width: 744px) {
    width: 100%;
    font-size: 1rem;
    text-align: center;

    padding: 1rem 1rem 0.5rem 1rem;
  }
`;
const Title_Description_Three = styled.div`
  color: var(--white, #fff);
  /* Title text */
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 155.556%; /* 1.94444rem */

  @media (max-width: 744px) {
    width: 100%;
    font-size: 1rem;
    text-align: center;
    padding: 1rem 1rem 0.5rem 1rem;
  }
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0rem 3rem 0rem;
  background-color: #18365A;
`;
const Content_heading = styled.div`
  padding-bottom: 2rem;
  color: var(--white, #fff);
  /* hero2 */
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 900;
  line-height: 155.556%; /* 4.375rem */
  text-align: center;
  @media (max-width: 744px) {
    width: 100vw;
    font-size: 1.3rem;
    text-align: center;
    padding-bottom: 0rem;
  }
`;
const List = styled.div`
  & ul {
    padding-left: 2rem;
  }
  @media (max-width: 744px) {
    & ul {
      list-style-type: none;
      padding: 0rem;
    }
  }
`;
