import styled, { css } from "styled-components";
import * as style from "../../../constants/StyleSheets";
import React, { useEffect, useRef, useState } from "react";
import Profile from "../../../assets/images/mann.png";
// import update from "../../../assets/icons/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
// import ErrorMessage from "../../../components/Form/ErrorMessage";
import Loader from "../../../components/Items/Loader";
import { getCurrentUser, updateUser } from "../../../redux/userSlice/userSlice";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Image } from "antd";

const ProfileDetails = ({ currentUser }) => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValues,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      cin: currentUser?.accountOverview?.[0]?.cin,
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phoneNumber: currentUser?.phoneNumber,
    },
  });

  useEffect(() => {
    const defaultValues = {
      cin: currentUser?.accountOverview?.[0]?.cin,
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phoneNumber: currentUser?.phoneNumber,
    };
    reset({ ...defaultValues });
  }, []);

  const loadingStatus = useSelector((state) => state?.user?.isLoading);
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();
  // const user = useSelector(store=>store.user?.currentUser)
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    setisLoading(true);

    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("ref", "plugin::users-permissions.user");
    formData.append("refId", currentUser.id);
    formData.append("field", "profile_picture");
    formData.append("files", file);
    // console.log(formData.values());
    axios
      .post(`${process.env.REACT_APP_DOMAIN_URL}/api/upload`, formData)
      .then((res) => {
        // console.log(res);
        dispatch(getCurrentUser());
        setisLoading(false);
      });
    // Do something with the selected file
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const myPromise = (data) => Promise.resolve(dispatch(updateUser(data)));

  // console.log(currentUser?.profile_picture);
  //    isLoading ? (

  //   <Loader />
  // ) : (
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Content right={i18n.language === "ar-AR"}>
        {/* <User>Informations personnelles</User> */}

        <ContentService>
          <ImgService>
            <Image.PreviewGroup movable={true}>
              <TitelImg>
                {/* <h3 className="company_details_main_title">Face Gauche</h3> */}
                <Image
                style={{ objectFit: "cover"}}
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
            {/* <LazyLoadImage
              effect="blur"
              src={
                currentUser?.profile_picture
                  ? `${process.env.REACT_APP_DOMAIN_URL}${currentUser?.profile_picture?.formats?.small?.url}`
                  : Profile
              }
              alt="Profile"
            /> */}
            {/* <div style={{ display: "flex", flexDirection: "column", gap: 10 }}> */}
            <Profile_name>
              {`${currentUser?.firstName} ${currentUser?.lastName}`}
            </Profile_name>
            {/* <Profile_name>  
                {currentUser?.accountOverview[0]?.lastName}
              </Profile_name>
              <h3>{currentUser?.phoneNumber}</h3>
              <h3>{currentUser?.email}</h3> */}
            {/* </div> */}
            {/* <ButtonImage hasborder onClick={handleButtonClick}>
              {/* <FontAwesomeIcon icon={faUpload} />  
              {t("ClientProfile.Nouvelle-image")}
            </ButtonImage> */}
            {/* <FileInput
              accept="image/png, image/jpeg"
              multiple={false}
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
            /> */}
          </ImgService>
          <User>{t("ClientProfile.User")}</User>
          <form
          // onSubmit={handleSubmit((data) => {
          //   setisLoading(true);
          //   myPromise({
          //     id: currentUser.id,
          //     username: data.email,
          //     email: data.email,
          //     phoneNumber: data.phoneNumber,
          //     // user_role: "client",
          //     // password: data.password,
          //     accountOverview: [
          //       {
          //         __component: "section.client",
          //         firstName: data.firstName,
          //         lastName: data.lastName,
          //         cin: data.cin,
          //       },
          //     ],
          //   }).then(() => {
          //     setisLoading(false);
          //     dispatch(getCurrentUser());
          //   });
          // })}
          >
            <Address>
              <InputFlex>
                {/* --------------------- */}
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.nom")}</Label>
                  <InputContainer>
                    {/* <Input
                      defaultValue={currentUser?.accountOverview[0]?.firstName}
                      errorBorder={errors.firstName}
                      {...register("firstName", {
                        required: t("ClientProfile.validation.nom"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.accountOverview[0]?.firstName}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                    )} */}
                    <InfoText>
                      {currentUser?.firstName}
                    </InfoText>
                    {/* <UpdateIcon src={update} alt="Update" /> */}
                  </InputContainer>
                </InputBloc>
                {/* ------------------------ */}
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.Prénom")}</Label>

                  <InputContainer>
                    <InfoText>
                      {currentUser?.lastName}
                    </InfoText>
                    {/* <Input
                      defaultValue={currentUser?.accountOverview[0]?.lastName}
                      errorBorder={errors.lastName}
                      {...register("lastName", {
                        required: t("ClientProfile.validation.Prénom"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.accountOverview[0]?.lastName}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                    )} */}
                    {/* <UpdateIcon src={update} alt="Update" /> */}
                  </InputContainer>
                </InputBloc>
              </InputFlex>

              <User>{t("ClientProfile.Contact")}</User>
              <InputFlex>
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.email")}</Label>
                  {/*     <InputContainer>
                    <Input
                      defaultValue={currentUser?.email}
                      errorBorder={errors.email}
                      {...register("email", {
                        required: t("ClientProfile.validation.email"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.email}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    {/* <UpdateIcon src={update} alt="Update" /> 
                  </InputContainer> */}
                  <InfoText>{currentUser?.email}</InfoText>
                </InputBloc>
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.phone")}</Label>
                  {/*  <InputContainer>
                    <Input
                      defaultValue={currentUser?.phoneNumber}
                      errorBorder={errors.phoneNumber}
                      {...register("phoneNumber", {
                        required: t("ClientProfile.validation.phone"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
                    )}
                    {/* <UpdateIcon src={update} alt="Update" /> 
                  </InputContainer> */}
                  <InfoText>{currentUser?.phoneNumber}</InfoText>
                </InputBloc>
              </InputFlex>
            </Address>
            {/* <Button hasBackground> {t("ClientProfile.MTA")}</Button> */}
          </form>
          {/* // <Button hasBackground> {t("ClientProfile.MTA")}</Button> */}
        </ContentService>
      </Content>
      {/* </Content> */}
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
const TitelImg = styled.div`
 /* background-color: #ded4cc;
 border: 5px solid  #fff;
 border-radius: 50%; */
 
`;

const ButtonImage = styled.button`
  cursor: pointer;
  margin-inline: ${style.spacing.MARGIN_MEDIUM};
  padding: ${style.spacing.PADDING_SMALL} ${style.spacing.PADDING_LARGE};
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;

  ${(props) =>
    props.hasBackground
      ? css`
          border-width: 2px;
          background-color: ${(props) => props.theme.PRIMARY_COLOR};
          border-color: ${(props) =>
            props.hasborder ? props.theme.PRIMARY_COLOR : "transparent"};

          color: ${(props) => props.theme.BACKGROUND_COLOR};
          &:hover {
            background-color: ${(props) =>
              props.variant !== "outline"
                ? props.theme.BACKGROUND_COLOR
                : props.theme.PRIMARY_COLOR};
            color: ${(props) =>
              props.variant !== "outline"
                ? props.theme.PRIMARY_COLOR
                : props.theme.BACKGROUND_COLOR};
          }
        `
      : css`
          ${props.hasborder
            ? css`
                border-width: 2px;
                background-color: ${(props) => props.theme.BACKGROUND_COLOR};
                border-color: ${(props) =>
                  props.hasborder ? props.theme.PRIMARY_COLOR : "transparent"};
                color: ${(props) => props.theme.PRIMARY_COLOR};
                &:hover {
                  background-color: ${props.theme.PRIMARY_COLOR};
                  color: ${(props) =>
                    props.variant !== "outline" ? "#18365a" : "#F37A1D"};
                }
              `
            : css`
                color: ${props.theme.TEXT_COLOR};
                border: "none";
                border-color: transparent;
                &:hover {
                  color: ${props.theme.PRIMARY_COLOR};
                }
              `}
        `}/* &:hover {
    background-color: ${(props) =>
    props.variant !== "outline" ? "#F37A1D" : "#18365a"};
    color: ${(props) => (props.variant !== "outline" ? "#18365a" : "#F37A1D")};
  } */
`;

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
  /* width: 50%; */
  gap: 0.5rem;
  /* border-radius: 32px; */
  /* border: 1px solid white; */
  /* overflow: hidden; */
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

`;

const Input = styled.input`
  width: 100%;
  /* height: 3rem; */
  border-radius: 10px;
  border: transparent;
  padding-right: 2.5rem;
  padding: 0.5rem;
  color: var(--body-text-2, #666);
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 1.5rem;
`;

const UpdateIcon = styled(LazyLoadImage)`
  background-color: white;
  padding-left: 4px;
  position: absolute;
  right: 1rem;
  height: 1.5rem;
  @media (max-width: 1151px) {
    display: none;
  }
  /* padding-right: 1.37rem; */
`;

const ImgService = styled.div`
  display: flex;
  align-items: center;
  /* height: 50%; */
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
  /* font-size: 2rem; */
  font-style: normal;
  font-weight: 600;
  line-height: 2.25rem;
  font-size: 16px;
`;

const Profile_name = styled.h2`
  width: 100%;
  font-family: ${style.font.FONT_FAMILY};
  color: var(--white, #fff);
  /* font-size: 1.625rem; */
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

// const Button = styled.button`
//   margin-top: 20px;
//   background-color: ${(props) => props.theme.BACKGROUND_COLOR};
//   border-radius: 5px;
//   width: 38rem;
//   height: 2.5rem;
//   border-width: 2px;
//   background-color: ${(props) => props.theme.PRIMARY_COLOR};
//   border-color: #F37A1D;
//   font-family: ${style.font.FONT_FAMILY};
//   font-weight: 600;
//   font-size: 0.75rem;
//   border-radius: 0.75rem;
//   color: ${(props) => props.theme.BACKGROUND_COLOR};
//   padding: 0;
//   justify-content: center;
//   align-items: center;
//   flex-shrink: 0;
//   &:hover {
//     background-color: ${(props) =>
//       props.variant !== "outline"
//         ? props.theme.BACKGROUND_COLOR
//         : props.theme.PRIMARY_COLOR};
//     color: ${(props) =>
//       props.variant !== "outline"
//         ? props.theme.PRIMARY_COLOR
//         : props.theme.BACKGROUND_COLOR};
//   }
//   @media (max-width: 1151px) {
//     height: 50px;
//     width: 100%;
//     margin-inline: auto;
//     margin-top: 30px;
//     font-size: 18px;
//     font-weight: 700;
//   }
// `;

// ------------------------ - ------- - - - - --  - - -

const FileInput = styled.input`
  display: none;
`;

// const ImgService = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   cursor: pointer;
// `;

// const ButtonImage = styled.button`
//   padding: 10px;
//   border: ${(props) => (props.hasborder ? "1px solid #000" : "none")};
// `;

const ProfileImage = styled(LazyLoadImage)`
  /* max-width: 100px; */
  width: 150px !important;
  height: 150px !important;
  border-radius: 8px;
  border: none;
  object-fit: cover;
  object-position: top;
  border: 1px solid rgba(250, 250, 250, 0.8);
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 44.75rem;
  height: 3rem;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #F37A1D;
  font-family: ${style.font.FONT_FAMILY};
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  color: ${(props) => props.theme.BACKGROUND_COLOR};
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
  &:hover {
    background-color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.BACKGROUND_COLOR
        : props.theme.PRIMARY_COLOR};
    color: ${(props) =>
      props.variant !== "outline"
        ? props.theme.PRIMARY_COLOR
        : props.theme.BACKGROUND_COLOR};
  }
  @media (max-width: 1151px) {
    width: 100%;
    padding: 2px;
  }
`;

const InfoText = styled.div`
  width: 100%;
  border: 1px solid white;
  color: white;
  border-radius: 16px;
  text-align: left;
  padding: 1rem 0.5rem;
`;
