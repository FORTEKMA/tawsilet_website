import React from "react";
import styled from "styled-components";
import * as style from "../../constants/StyleSheets";
// import { Helmet } from "react-helmet-async";
  import { useTranslation } from "react-i18next";
const Politiques = () => {

  const { t, i18n } = useTranslation();
  return (
    <>
   
     <Content>
        <Content_politique>
          <Content_heading>
            {t("Politiques.title")}
          </Content_heading>
          {/* <Description>
            {t("Politiques.description")}
          </Description> */}

          <Title_Description>
            {t("Politiques.personalData.title")}
          </Title_Description>
          <Description>
          {t("Politiques.personalData.description")}
          </Description>
           {/* /***************2. Données Personnelles Collectées*******************/}
          <Title_Description>
            {t("Politiques.applicableLaws.title")}
          </Title_Description>
          <Title_little>
            {t("Politiques.applicableLaws.title1")}
          </Title_little>
          <Description>
            {t("Politiques.applicableLaws.description")}
          </Description>
          <Title_little>
            {t("Politiques.applicableLaws.title2")}
          </Title_little>
          <Description>
            {t("Politiques.applicableLaws.description2")}
          </Description>
          <ul style={{marginLeft:"50px"}}>
          <DescriptionList>
          <li> {t("Politiques.applicableLaws.dataList1")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.applicableLaws.dataList2")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.applicableLaws.dataList3")}</li>
          </DescriptionList> 
      </ul>
      <Title_little>
            {t("Politiques.applicableLaws.title3")}
          </Title_little>
          <Description>
            {t("Politiques.applicableLaws.description3")}
          </Description>
         
          {/* /**********************************/}

          <Title_Description>
            {t("Politiques.lawfulBasis.title")}
          </Title_Description>

          <Description>
            {t("Politiques.lawfulBasis.description")}
          </Description>
          <ul style={{marginLeft:"50px"}}>
          <DescriptionList>
          <li> {t("Politiques.lawfulBasis.dataList1")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.lawfulBasis.dataList2")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.lawfulBasis.dataList3")}</li>
          </DescriptionList> 
      </ul>
          <Title_Description>
            {t("Politiques.dataUse.title")}
          </Title_Description>

          <Description>
            {t("Politiques.dataUse.description")}
          </Description>

          <Title_Description>
            {t("Politiques.dataSharing.title")}
          </Title_Description>

          <Description>
            {t("Politiques.dataSharing.description")}
          </Description>

          <Title_Description>
            {t("Politiques.dataRetention.title")}
          </Title_Description>

          <Description>
            {t("Politiques.dataRetention.description")}
          </Description>

          <Title_Description>
            {t("Politiques.minors.title")}
          </Title_Description>

          <Description>
            {t("Politiques.minors.description")}
          </Description>

          <Title_Description>
            {t("Politiques.userRights.title")}
          </Title_Description>

          <Description>
            {t("Politiques.userRights.description")}
          </Description>
          <ul style={{marginLeft:"50px"}}>
          <DescriptionList>
          <li> {t("Politiques.userRights.dataList1")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.userRights.dataList2")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.userRights.dataList3")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.userRights.dataList4")}</li>
          </DescriptionList> 
          <DescriptionList>
          <li> {t("Politiques.userRights.dataList5")}</li>
          </DescriptionList> 
      </ul>
      <Description>
            {t("Politiques.userRights.desc")}
          </Description>
          <Descriptione>
            {t("Politiques.userRights.email")}
          </Descriptione>

          <Title_Description>
            {t("Politiques.cookiePolicy.title")}
          </Title_Description>

          <Description>
            {t("Politiques.cookiePolicy.description")}
            <br />
            {/* <a href="#">{t("Politiques.cookiePolicy.link")}</a> */}
          </Description>

          <Title_Description>
            {t("Politiques.modifications.title")}
          </Title_Description>

          <Description>
            {t("Politiques.modifications.description")}
          </Description>

          <Title_Description>
            {t("Politiques.contact.title")}
          </Title_Description>

          <Description>
            {t("Politiques.contact.description")}
          </Description>
          <Descriptione>
            {t("Politiques.contact.email")}
          </Descriptione>
          <Description>
            {t("Politiques.contact.mrc")}
          </Description>
        </Content_politique>
      </Content>
    </>
  );
};

export default Politiques;
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
const Description = styled.div`
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
    text-align: center;
  }
`;
const Descriptione = styled.div`
  width: 100%;
  color: #FFF;
  /* Body 2 */
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem; /* 187.5% */
  letter-spacing: 0.01rem;
  text-align: justify;
  @media (max-width: 744px) {
    width: 100vw;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    text-align: center;
  }
`;
const DescriptionList = styled.li`
  width: 90%;
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
    text-align: center;
  }
`;

const Title_Description = styled.div`
  color: var(--white, #fff);
  /* Title text */
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
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
  }
`;
const Title_little = styled.div`
  color: #ffdbc0;
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
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0rem 3rem 0rem;
  background-color: #18365A;
  @media (max-width: 744px) {
  }
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
  }
`;
