import styled from "styled-components";
import * as style from "../../../constants/StyleSheets";
import React, { useState } from "react";
import Profile from "../../../assets/images/mann.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCurrentUser } from "../../../redux/userSlice/userSlice";
import { useTranslation } from "react-i18next";
import { Image } from "antd";
import Loader from "../../../components/Items/Loader";

const ProfileDetails = ({ currentUser }) => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Content right={i18n.language === "ar-AR"}>
        <ContentService>
          <ImgService>
            <Image.PreviewGroup movable={true}>
              <TitelImg>
                <Image
                  style={{ objectFit: "cover" }}
                  width={150}
                  height={130}
                  src={
                    currentUser?.profilePicture
                      ? `${currentUser?.profilePicture?.url}`
                      : Profile
                  }
                />
              </TitelImg>
            </Image.PreviewGroup>
            
            <Profile_name>
              {`${currentUser?.firstName} ${currentUser?.lastName}`}
            </Profile_name>
          </ImgService>
          
          <User>{t("ClientProfile.User")}</User>
          
          <Address>
            <InputFlex>
              <InputBloc>
                <Label>{t("ClientProfile.FormInput.nom")}</Label>
                <InfoText>
                  {currentUser?.firstName}
                </InfoText>
              </InputBloc>
              
              <InputBloc>
                <Label>{t("ClientProfile.FormInput.Prénom")}</Label>
                <InfoText>
                  {currentUser?.lastName}
                </InfoText>
              </InputBloc>
            </InputFlex>

            <User>{t("ClientProfile.Contact")}</User>
            
            <InputFlex>
              <InputBloc>
                <Label>{t("ClientProfile.FormInput.email")}</Label>
                <InfoText>{currentUser?.email}</InfoText>
              </InputBloc>
              
              <InputBloc>
                <Label>{t("ClientProfile.FormInput.phone")}</Label>
                <InfoText>{currentUser?.phoneNumber}</InfoText>
              </InputBloc>
            </InputFlex>
          </Address>
        </ContentService>
      </Content>
    </>
  );
};

export default ProfileDetails;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.right === false ? "4.38rem" : "none")};
  margin-right: ${(props) => (props.right === true ? "4.38rem" : "none")};
  gap: 0.5rem;
  width: 44.75rem;
  padding-top: 2rem;
  @media (max-width: 1151px) {
    width: 100vw;
    margin-left: 0;
    padding: 20px 20px;
  }
`;

const Address = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  color: white;
  font-size: 12px;
`;

const TitelImg = styled.div``;

const InputBloc = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .CIN {
    width: calc(50% - 10px);
    @media (max-width: 1151px) {
      width: 100%;
    }
  }
`;

const InputFlex = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  @media (max-width: 1151px) {
    flex-direction: column;
  }
`;

const ContentService = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImgService = styled.div`
  display: flex;
  align-items: center;
  text-align: "center";
  gap: 2rem;
  flex-direction: row;
  padding-bottom: 10px;
  img {
    width: 180px;
    border-radius: 50%;
    box-shadow: -4px 12px 15px -11px #000;
  }
  .ant-image-preview-operations {
    z-index: 99999999999 !important;
  }
`;

const User = styled.h3`
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  line-height: 2.25rem;
  font-size: 16px;
`;

const Profile_name = styled.h2`
  width: 100%;
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const InfoText = styled.div`
  width: 100%;
  border: 1px solid white;
  color: white;
  border-radius: 16px;
  text-align: left;
  padding: 1rem 0.5rem;
`;
