import styled, { css } from "styled-components";
import * as style from "../../../constants/StyleSheets";
import React, { useEffect, useRef, useState } from "react";
import Profile from "../../../assets/images/mann.png";
// import update from "../../../assets/icons/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import Loader from "../../../components/Items/Loader";
import { getCurrentUser, updateUser } from "../../../redux/userSlice/userSlice";

import { useTranslation } from "react-i18next";

import { LazyLoadImage } from "react-lazy-load-image-component";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ProfileDetailsUpdates = ({ currentUser }) => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValues,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      cin: currentUser?.cin,
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phoneNumber: currentUser?.phoneNumber,
    },
  });

  useEffect(() => {
    const defaultValues = {
      cin: currentUser?.cin,
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
    formData.append("field", "profilePicture");
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
        <Profile_name>
          {`${currentUser?.firstName} ${currentUser?.lastName}`}
        </Profile_name>
        <ContentService>
          <ImgService>
            <LazyLoadImage
              className="profileImage"
              effect="blur"
              src={
                currentUser?.profilePicture?.formats
                  ? `${currentUser?.profilePicture?.formats?.thumbnail?.url}`
                  : currentUser?.profilePicture
                  ? `${currentUser?.profilePicture?.url}`
                  : Profile
              }
              alt="Profile"
            />
            <ButtonImage hasborder onClick={handleButtonClick}>
              {/* <FontAwesomeIcon icon={faUpload} />  */}
              {t("ClientProfile.Nouvelle-image")}
            </ButtonImage>
            <FileInput
              accept="image/png, image/jpeg"
              multiple={false}
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
            />
          </ImgService>
          <User>{t("ClientProfile.User")}</User>
          <form
            onSubmit={handleSubmit((data) => {
              setisLoading(true);
              myPromise({
                id: currentUser.id,
                username: data.email,
                // email: data.email,
                phoneNumber: data.phoneNumber,
                // user_role: "client",
                // password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
              }).then(() => {
                setisLoading(false);
                dispatch(getCurrentUser());
              });
            })}
          >
            <Address>
              <InputFlex>
                {/* --------------------- */}
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.nom")}</Label>
                  <InputContainer>
                    <Input
                      defaultValue={currentUser?.firstName}
                      errorBorder={errors.firstName}
                      {...register("firstName", {
                        required: t("ClientProfile.validation.nom"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.firstName}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                    )}
                    {/* <UpdateIcon src={update} alt="Update" /> */}
                  </InputContainer>
                </InputBloc>
                {/* ------------------------ */}
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.Prénom")}</Label>

                  <InputContainer>
                    <Input
                      defaultValue={currentUser?.lastName}
                      errorBorder={errors.lastName}
                      {...register("lastName", {
                        required: t("ClientProfile.validation.Prénom"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.lastName}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                    )}
                    {/* <UpdateIcon src={update} alt="Update" /> */}
                  </InputContainer>
                </InputBloc>
              </InputFlex>
              {/* <InputBloc>
                <Label>{t("ClientProfile.FormInput.cin")}</Label>

                <InputContainer className="CIN">
                  <Input
                    defaultValue={currentUser?.accountOverview?.[0]?.cin}
                    errorBorder={errors.cin}
                    {...register("cin", {
                      required: t("ClientProfile.validation.cin")
                    })}
                    type="text"
                    className="oinput"
                    placeholder={currentUser?.accountOverview?.[0]?.cin}
                  />
                  {errors.cin && (
                    <ErrorMessage>{errors.cin.message}</ErrorMessage>
                  )}
                  {/* <UpdateIcon src={update} alt="Update" /> *
                </InputContainer>
              </InputBloc> */}
              <User>{t("ClientProfile.Contact")}</User>
              <InputFlex>
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.email")}</Label>
                  <InputContainer>
                    <Input
                      disabled
                      defaultValue={currentUser?.email}
                      errorBorder={errors.email}
                      {...register("email", {
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: t(
                            "SINSCRIREpartenaire.validation.testemail"
                          ),
                        },
                        required: t("ClientProfile.validation.email"),
                      })}
                      type="text"
                      className="oinput"
                      placeholder={currentUser?.email}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    {/* <UpdateIcon src={update} alt="Update" /> */}
                  </InputContainer>
                </InputBloc>
                <InputBloc>
                  <Label>{t("ClientProfile.FormInput.phone")}</Label>
                  <InputContainer>
                    <Container phoneborder={errors.phoneNumber}>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                          required: true,
                          minLength: 7,
                          message: "ffffffffff",
                        }}
                        render={({ field: { onChange } }) => (
                          <PhoneInput
                            enableSearch={true}
                            preferredCountries={["tn", "ae", "fr"]}
                            excludeCountries={["il"]}
                            defaultMask={".. ... ..."}
                            placeholder="Numéro de téléphone"
                            inputRef={register}
                            value={currentUser?.phoneNumber}
                            inputStyle={{
                              width: "100%",
                              height: 45,
                              fontSize: 16,
                              padding: 10,
                              paddingLeft: 55,
                              // borderWidth: errors.phoneNumber ? "1px" : "2px",
                              // borderColor: errors.phoneNumber ? "red" : "initial",
                              borderRadius: "8px",
                              backgroundColor: "white",
                              color: "gray",
                            }}
                            dropdownStyle={{ color: "white" }}
                            inputProps={{
                              name: "phoneNumber",
                              required: true,
                              message: "test",
                              // autoFocus: true,
                            }}
                            id="phoneNumber"
                            specialLabel=""
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            onChange={(value) => onChange(value)}
                            error={!!errors.phoneNumber}
                            helperText={
                              errors.phoneNumber &&
                              "Un numéro valide est obligatoire"
                            }
                            country="tn"
                            // regions={"europe"}
                            // disableCountryCode={true}
                            countryCodeEditable={true}
                            enableAreaCodes={true}
                            // enableAreaCodeStretch={false}
                          />
                        )}
                      />

                      {errors.phoneNumber && (
                        <ErrorMessage>
                          {/* {console.log(errors.phoneNumber)}
                  {errors.phoneNumber.message} */}
                          Numéro de téléphone invalide
                        </ErrorMessage>
                      )}
                    </Container>

                    {/* <UpdateIcon src={update} alt="Update" /> */}
                  </InputContainer>
                </InputBloc>
              </InputFlex>
            </Address>
            <Button hasBackground> {t("ClientProfile.MTA")}</Button>
          </form>
        </ContentService>
      </Content>
      {/* </Content> */}
    </>
  );
};

export default ProfileDetailsUpdates;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => (props.right === false ? "4.38rem" : "none")};
  margin-right: ${(props) => (props.right === true ? "4.38rem" : "none")};
  gap: 0.5rem;
  padding-top: 2rem;
  @media (max-width: 1151px) {
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
  font-size: 12px;
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
  border-radius: 32px;
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
  &:disabled {
    color: white;
  }
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
  height: 50%;
  border-radius: 32px;
  text-align: "center";
  gap: 1rem;
  flex-direction: row;
  padding-bottom: 10px;
  .profileImage {
    width: 80px !important;
    height: 80px;
    border-radius: 50%;
    border: none;
    object-fit: cover;
    object-position: top;
  }
  img {
    width: 80px;
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

const Button = styled.button`
  background-color: ${(props) => props.theme.BACKGROUND_COLOR};
  border-radius: 5px;
  width: 44.75rem;
  height: 3rem;
  border-width: 2px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-color: #f37a1d;
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
  width: 80px !important;
  height: 80px;
  border-radius: 50%;
  border: none;
  object-fit: cover;
  object-position: top;
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  .In {
    padding: 0px 10px;
    height: 45px;
    @media (max-width: 1050px) {
      height: 60px !important;
    }
    &::placeholder {
      font-size: 12px;
    }
  }

  :where(.css-byeoj0).ant-upload-wrapper .ant-upload-list {
    overflow: hidden;
  }
  .ant-upload-list-item-name {
    @media (max-width: 1050px) {
      color: white !important;
    }
  }
  .ant-upload-icon {
    @media (max-width: 1050px) {
      color: white !important;
      fill: white !important;
      filter: invert(80%) sepia(41%) saturate(2273%) hue-rotate(0deg)
        brightness(105%) contrast(104%);
    }
  }
  .ant-upload-list-item-actions {
    @media (max-width: 1050px) {
      color: white !important;
      fill: white !important;
      filter: invert(80%) sepia(41%) saturate(2273%) hue-rotate(0deg)
        brightness(105%) contrast(104%);
    }
  }

  .react-tel-input {
    height: 45px;
    @media (max-width: 1050px) {
      height: 60px;
    }
  }
  .form-control .flag-dropdown {
    background-color: transparent !important;
    border: none !important;
    padding-left: 10px;
    color: black;
    width: 100%;
  }
  .react-tel-input .flag-dropdown.open {
    width: 100%;
  }
  .react-tel-input .country-list {
    width: 100%;
  }
  .country-name {
    color: black;
  }

  .selected-flag {
    background-color: transparent !important;
  }
  .country-list {
    margin: 0 !important;
    /* width: 100%; */
    left: 0;
    right: 0 !important;
  }
  .react-tel-input .form-control {
    height: 100%;
    border-width: 1px;
    border-color: ${(props) =>
      props.phoneborder ? "red !important" : "black !important"};
    @media (max-width: 1050px) {
      height: 100% !important;
      color: white !important;
      border-color: ${(props) =>
        props.phoneborder ? "red !important" : "white !important"};
      /* border-width: ${(props) => (props.phoneborder ? "1px" : "2px")}; */
    }
  }
`;
