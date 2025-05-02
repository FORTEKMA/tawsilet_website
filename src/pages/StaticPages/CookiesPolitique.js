import React from "react";
// import { Helmet } from "react-helmet-async";
import styled from "styled-components";
// import * as style from "../../constants/StyleSheets";
import { useTranslation } from "react-i18next";

const CookiesPolitique = () => { 
   const { t, i18n } = useTranslation();
  return (
    <>
 
    <Content>
      <Content_politique>
        <Content_heading>
          {t("COOKIES.title")}
        </Content_heading>
        <Content_heading small style={{ marginTop: -20 }}>
          {t("COOKIES.lastUpdate")}
        </Content_heading>
        <Description>
          {t("COOKIES.description")}
        </Description>
        <Title_Description>
          {t("COOKIES.whatAreCookies.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.whatAreCookies.description")}
        </Description>
        <Title_Description>
          {t("COOKIES.howDoTheyWork.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.howDoTheyWork.description")}
        </Description>
        <Title_Description>
          {t("COOKIES.whatInformationDoWeCollect.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.whatInformationDoWeCollect.description")}
        </Description>
        <Title_Description>
          {t("COOKIES.cookieTypes.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.cookieTypes.necessaryCookies")}
          <List>
            <ul>
              {t("COOKIES.cookieTypes.list", { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </List>
        </Description>
        <Title_Description>
          {t("COOKIES.cookieRetention.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.cookieRetention.description")}
        </Description>
        <Title_Description>
          {t("COOKIES.howToDisableCookies.title")}
        </Title_Description>
        <Description>
          {t("COOKIES.howToDisableCookies.description")}
        </Description>

        <Title_Description>
          {t("COOKIES.cookieList.title")}
        </Title_Description>

        <StyledTable>
          <thead>
            <tr>
              <StyledTh>{t("COOKIES.cookieList.tableHeader.group")}</StyledTh>
              <StyledTh>{t("COOKIES.cookieList.tableHeader.cookie")}</StyledTh>
              <StyledTh>{t("COOKIES.cookieList.tableHeader.usage")}</StyledTh>
            </tr>
          </thead>
          <tbody>
            {t("COOKIES.cookieList.rows", { returnObjects: true }).map((row, index) => (
              <tr key={index}>
                <StyledTd>{row.group}</StyledTd>
                <StyledTd>{row.cookie}</StyledTd>
                <StyledTd>{row.usage}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        <Title_Description>
          {t("COOKIES.emailAnalysis.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.emailAnalysis.description")}
        </Description>

        <Title_Description>
          {t("COOKIES.consent.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.consent.description")}
        </Description>

        <Title_Description>
          {t("COOKIES.moreInfo.title")}
        </Title_Description>

        <Description>
          {t("COOKIES.moreInfo.description")}
        </Description>
      </Content_politique>
    </Content>
    </>
  );
};

export default CookiesPolitique;
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
const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0rem 8rem 0rem;
  background-color: #18365A;
  @media (max-width: 744px) {
  }
`;
const Content_heading = styled.div`
  padding-bottom: 2rem;
  color: var(--white, #fff);
  /* hero2 */
  font-family: "Inter", sans-serif;
  font-size: ${(props) => (props.small ? " 1.2rem;" : "1.8rem")};
  font-style: normal;
  font-weight: 900;
  line-height: 155.556%; /* 4.375rem */
  text-align: center;
  @media (max-width: 744px) {
    width: 100vw;
    font-size: ${(props) => (props.small ? " 1rem;" : "1.3rem")};
    text-align: center;
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

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  color: white;
`;

const StyledTh = styled.th`
  border: 2px solid white;
  padding: 8px;
  text-align: left;
  color: white;
`;

const StyledTd = styled.td`
  border: 2px solid white;
  color: white;
  padding: 8px;
  text-align: left;
  font-weight: 300;
`;
