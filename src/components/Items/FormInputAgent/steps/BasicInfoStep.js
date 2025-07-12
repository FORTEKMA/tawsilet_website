import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "../../../Form/ErrorMessage";
import { BTNn, DISP, DISPA, Container, In, Label } from "../styles";
import ProfilePicUploader from "../components/ProfilePicUploader";
import PhoneInput from "react-phone-input-2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styled from "styled-components";

const BasicInfoStep = ({
  t, i18n, register, control, errors, getValues, pictures, picturesErrors, setPasswordVisible, passwordVisible, setValidatePasswordVisible, validatePasswordVisible, setPictures, createUploadProps, setPicturesErrors, onSubmit, handleSubmit
}) => {
  const tunisiaRegions = [
    { key: "Ariana", label: t("regions.Ariana") },
    { key: "Beja", label: t("regions.Beja") },
    { key: "Ben Arous", label: t("regions.BenArous") },
    { key: "Bizerte", label: t("regions.Bizerte") },
    { key: "Gabes", label: t("regions.Gabes") },
    { key: "Gafsa", label: t("regions.Gafsa") },
    { key: "Jendouba", label: t("regions.Jendouba") },
    { key: "Kairouan", label: t("regions.Kairouan") },
    { key: "Kasserine", label: t("regions.Kasserine") },
    { key: "Kebili", label: t("regions.Kebili") },
    { key: "Kef", label: t("regions.Kef") },
    { key: "Mahdia", label: t("regions.Mahdia") },
    { key: "Manouba", label: t("regions.Manouba") },
    { key: "Medenine", label: t("regions.Medenine") },
    { key: "Monastir", label: t("regions.Monastir") },
    { key: "Nabeul", label: t("regions.Nabeul") },
    { key: "Sfax", label: t("regions.Sfax") },
    { key: "Sidi Bouzid", label: t("regions.SidiBouzid") },
    { key: "Siliana", label: t("regions.Siliana") },
    { key: "Sousse", label: t("regions.Sousse") },
    { key: "Tataouine", label: t("regions.Tataouine") },
    { key: "Tozeur", label: t("regions.Tozeur") },
    { key: "Tunis", label: t("regions.Tunis") },
    { key: "Zaghouan", label: t("regions.Zaghouan") },
  ];

  // Local submit handler to require avatar
  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (!pictures.profile_picture) {
      setPicturesErrors((prev) => ({ ...prev, profile_picture: true }));
      return;
    } else {
      setPicturesErrors((prev) => ({ ...prev, profile_picture: false }));
    }
    // Call parent's onSubmit (which will call nextStep or submit)
    handleSubmit(onSubmit)(e);
  };

  return (
    <>
      <ProfilePicUploader
        pictures={pictures}
        picturesErrors={picturesErrors}
        createUploadProps={(field, onFileChange) => createUploadProps(field, setPictures, setPicturesErrors, onFileChange)}
        t={t}
        onChange={(file) => setPictures((prev) => ({ ...prev, profile_picture: file }))}
      />
      <DISP>
        <Container>
          <In
            right={i18n.language === "ar-AR"}
            type="text"
            {...register("firstName", {
              required: t("SINSCRIREpartenaire.validation.nomPre"),
            })}
            errorBorder={errors.firstName}
            placeholder={t("SINSCRIREpartenaire.FormInput.indivname")}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.indivname")}
          </Label>
        </Container>
        <Container>
          <In
            right={i18n.language === "ar-AR"}
            type="text"
            {...register("lastName", {
              required: t("SINSCRIREpartenaire.validation.nomP"),
            })}
            errorBorder={errors.lastName}
            placeholder={t("SINSCRIREpartenaire.FormInput.nomP")}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.nomP")}
          </Label>
        </Container>
      </DISP>
      <DISP>
        <Container>
          <In
            type="text"
            {...register("email", {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: t("SINSCRIREpartenaire.validation.testemail"),
              },
              required: t("SINSCRIREpartenaire.validation.email"),
            })}
            errorBorder={errors.email}
            placeholder="example@email.com"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.email")}
          </Label>
        </Container>
        <Container phoneborder={errors.phoneNumber} isRtl={i18n.language.startsWith("ar")}> 
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true, minLength: 7 }}
            render={({ field: { onChange } }) => (
              <PhoneInput
                enableSearch={true}
                preferredCountries={["tn", "ae", "fr"]}
                excludeCountries={["il"]}
                placeholder={t("SINSCRIREpartenaire.FormInput.phone")}
                inputStyle={{
                  width: "100%",
                  height: 45,
                  fontSize: 16,
                  padding: 10,
                  paddingLeft: 55,
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  color: "gray",
                  borderColor: errors.phoneNumber ? "red" : "black",
                }}
                inputProps={{ name: "phoneNumber", required: true }}
                onChange={onChange}
                country="tn"
                countryCodeEditable={false}
                enableAreaCodes={true}
                defaultMask={".. ... ..."}
              />
            )}
          />
          {errors.phoneNumber && (
            <ErrorMessage>
              {t("SINSCRIREpartenaire.validation.phone")}
            </ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.phone")}
          </Label>
        </Container>
      </DISP>
      <DISP>
        <Container>
          <Controller
            name="region"
            control={control}
            rules={{ required: t("SINSCRIREpartenaire.validation.Required") }}
            render={({ field }) => (
              <SelectStyled
                {...field}
                errorBorder={errors.region}
                right={i18n.language === "ar-AR"}
              >
                <option value="" disabled>{t("SINSCRIREpartenaire.FormInput.État")}</option>
                {tunisiaRegions.map((region) => (
                  <option key={region.key} value={region.key}>{region.label}</option>
                ))}
              </SelectStyled>
            )}
          />
          {errors.region && (
            <ErrorMessage>{errors.region.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.État")}
          </Label>
        </Container>
      </DISP>
      <DISPA>
        <Container>
          <In
            right={i18n.language === "ar-AR"}
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
                message: t(
                  "SINSCRIREpartenaire.validation.passwordRequirement"
                ),
              },
              required: t("SINSCRIREpartenaire.validation.pswd"),
            })}
            errorBorder={errors.password}
            type={passwordVisible ? "text" : "password"}
            placeholder={t("SINSCRIREpartenaire.FormInput.pswd")}
          />
          {passwordVisible ? (
            <span
              style={{ position: "absolute", right: 10, top: 14, cursor: "pointer", color: "black" }}
              onClick={() => setPasswordVisible(false)}
            >
              <AiOutlineEyeInvisible />
            </span>
          ) : (
            <span
              style={{ position: "absolute", right: 10, top: 14, cursor: "pointer", color: "black" }}
              onClick={() => setPasswordVisible(true)}
            >
              <AiOutlineEye />
            </span>
          )}
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.pswd")}
          </Label>
        </Container>
        <Container>
          <In
            right={i18n.language === "ar-AR"}
            {...register("confirm_password", {
              validate: (value) => {
                const { password } = getValues();
                return (
                  password === value ||
                  t("SINSCRIREpartenaire.validation.confpswd")
                );
              },
            })}
            errorBorder={errors.confirm_password}
            type={validatePasswordVisible ? "text" : "password"}
            placeholder={t("SINSCRIREpartenaire.FormInput.confpswd")}
          />
          {validatePasswordVisible ? (
            <span
              style={{ position: "absolute", right: 10, top: 14, cursor: "pointer", color: "black" }}
              onClick={() => setValidatePasswordVisible(false)}
            >
              <AiOutlineEyeInvisible />
            </span>
          ) : (
            <span
              style={{ position: "absolute", right: 10, top: 14, cursor: "pointer", color: "black" }}
              onClick={() => setValidatePasswordVisible(true)}
            >
              <AiOutlineEye />
            </span>
          )}
          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.confpswd")}
          </Label>
        </Container>
      </DISPA>
      <div style={{ display: "flex", gap: 8, width: "70%" }}>
        <BTNn type="submit" onClick={handleLocalSubmit}>{t("FormInputAgent.buttons.next")}</BTNn>
      </div>
    </>
  );
};

// Styled select for region
const SelectStyled = styled.select`
  direction: ${(props) => (props.right ? "rtl" : "ltr")};
  width: 100%;
  height: 45px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.errorBorder ? "#ff6961" : "#cccccc")};
  background-color: transparent;
  border-radius: 8px;
  transition: border-color 0.3s;
  &::placeholder {
    font-size: 14px;
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: #0c0c0c;
  }
`;

export default BasicInfoStep; 