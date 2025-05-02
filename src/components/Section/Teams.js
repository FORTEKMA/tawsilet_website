import React from "react";
import styled from "styled-components";
import avatar1 from "../../assets/images/avatar1.svg"
import avatar2 from "../../assets/images/avatar2.svg"
import avatar3 from "../../assets/images/avatar3.svg"
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t, i18n } = useTranslation();
  return (
    <TeamSection>
     <Middle>
      <HeadingUp>
      {t("Team.title")}
      </HeadingUp>
      <Description>{t("Team.description")}
         </Description>
         </Middle>
      {/* <TeamContainer>
        <TeamMember>
          <BlueAvatar />
          <Name>{t("Team.image1.title")}</Name>
          <Position>{t("Team.image1.description")}</Position>
        </TeamMember>
        <TeamMember>
          <Avatar>
            <img
              src={avatar1}
              alt="Maybelle Willms"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </Avatar>
          <Name>{t("Team.image1.title")}</Name>
          <Position>{t("Team.image1.description")}</Position>
        </TeamMember>
        <TeamMember>
          <Avatar>
            <img
              src={avatar2}
              alt="Bridle Ledner"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </Avatar>
          <Name>{t("Team.image1.title")}</Name>
          <Position>{t("Team.image1.description")}</Position>
        </TeamMember>
        <TeamMember>
          <Avatar>
            <img
              src={avatar3}
              alt="Missouri Gulgowski"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </Avatar>
          <Name>{t("Team.image1.title")}</Name>
          <Position>{t("Team.image1.description")}</Position>
        </TeamMember>
      </TeamContainer> */}
    </TeamSection>
  );
};

export default Team;


const TeamSection = styled.section`
  background-color: white;
  padding-bottom: 50px;
  text-align: center;
  color: #18365A;
  @media (max-width: 744px) {
    padding-bottom: 0px;
  }
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: rgba(24, 54, 90, 1);
  line-height: 30px;
  width: 65%;
  text-align: center;
  @media (max-width: 744px) {
    font-size: 14px;
    width: 70%;
    margin-bottom: 1.25rem;
  }
`;
export const HeadingUp = styled.div`
  font-weight: 700;

  font-size: 2.8125rem;
  color: rgba(24, 54, 90, 1);

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
const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  @media (max-width: 744px) {
    gap: 10px;
  }
`;

const TeamMember = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  width: 180px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 160px;
  height: 190px;
  border-radius: 10px;
  margin-bottom: 15px;
`;
const BlueAvatar = styled.div`
  width: 160px;
  height: 170px;
  background-color: #18365A;
  border-radius: 10px;
  margin-bottom: 15px;
`;
const Name = styled.h3`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Position = styled.p`
  font-size: 0.8rem;
  color: #18365A;
`;
