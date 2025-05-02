import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import ErrorMessage from "../Form/ErrorMessage";
import "react-phone-input-2/lib/style.css";
import homeIcon from "../../assets/icons/homeicon.svg";
import { useNavigate } from "react-router";
import { createUserAndCompany } from "../../redux/userSlice/userSlice";

registerLocale("fr", fr);

const FormInputAgent = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  // console.log("🚀 ~ FormInputAgent ~ watch:", watch());

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validatePasswordVisible, setValidatePasswordVisible] = useState(false);
  const [stepRegister, setStepRegister] = useState(true);
  const [isIndividual, setIsIndividual] = useState(false);

  // Document state management
  const initialDocumentState = {
    urssaf: null,
    attestation_fiscale: null,
    kabis_picture: null,
    assurance_rc_pro: null,
    cin_recto_picture: null,
    cin_verso_picture: null,
    licence_de_transport_picture: null,
    rib_picture: null,
    assurance_rc_pro_date: null,
    licence_de_transport_date: null,
    carte_professionnelle: null,
    carte_professionnelle_transport: null,
  };

  const [pictures, setPictures] = useState(initialDocumentState);
  const [picturesErrors, setPicturesErrors] = useState(
    Object.keys(initialDocumentState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  // File upload handler
  const handleFileUpload = async (file, fieldName) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/upload`,
        formData
      );
      setPictures((prev) => ({ ...prev, [fieldName]: response?.data[0] }));
      setPicturesErrors((prev) => ({ ...prev, [fieldName]: false }));
      message.success(`${file.name} uploaded successfully`);
      return true;
    } catch (error) {
      message.error(`${file.name} upload failed`);
      return false;
    }
  };

  // Create upload props for each field
  const createUploadProps = (fieldName) => ({
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      handleFileUpload(file, fieldName);
      return false;
    },
    onRemove: () => {
      setPictures((prev) => ({ ...prev, [fieldName]: null }));
      setPicturesErrors((prev) => ({ ...prev, [fieldName]: true }));
    },
    showUploadList: {
      showPreviewIcon: false,
    },
  });

  // Submit handler
  const onSubmit = async (data) => {
    if (stepRegister) {
      setStepRegister(false);
      return;
    }

    // Validate required documents based on registration type
    const requiredDocuments = isIndividual
      ? [
          "cin_recto_picture",
          "cin_verso_picture",
          "assurance_rc_pro",
          "urssaf",
          "attestation_fiscale",
          "licence_de_transport_picture",
          "rib_picture",
          "carte_professionnelle",
          "carte_professionnelle_transport",
        ]
      : [
          "cin_recto_picture",
          "cin_verso_picture",
          "kabis_picture",
          "assurance_rc_pro",
          "urssaf",
          "attestation_fiscale",
          "licence_de_transport_picture",
          "rib_picture",
        ];

    const documentErrors = requiredDocuments.reduce((acc, field) => {
      acc[field] = !pictures[field];
      return acc;
    }, {});

    const dateErrors = {
      assurance_rc_pro_date: !pictures.assurance_rc_pro_date,
      licence_de_transport_date: !pictures.licence_de_transport_date,
    };

    setPicturesErrors({ ...documentErrors, ...dateErrors });

    if (Object.values(documentErrors).some(Boolean)) {
      message.error("Please upload all required documents");
      return;
    }

    if (Object.values(dateErrors).some(Boolean)) {
      message.error("Please select all required dates");
      return;
    }

    setLoading(true);

    try {
      const companyData = {
        name: isIndividual
          ? data.lastName + "-" + data.firstName + "-" + data.phoneNumber
          : data.nameE,
        activity: data.activity,
        // ownerFirstName: data.ownerFirstName,
        address: data.address,
        region: data.region,
        city: data.city,
        postalCode: data.postalCode,
        Documents: {
          ...(isIndividual
            ? {
                carte_professionnelle: {
                  pictureDetails: pictures.carte_professionnelle,
                },
                carte_professionnelle_transport: {
                  pictureDetails: pictures.carte_professionnelle_transport,
                },
              }
            : {
                rne: { pictureDetails: pictures.kabis_picture },
              }),
          attestation_cnss: { pictureDetails: pictures.urssaf },
          attestation_fiscale: { pictureDetails: pictures.attestation_fiscale },
          assurance_rc_pro: {
            pictureDetails: pictures.assurance_rc_pro,
          },
          cin_recto_picture: { pictureDetails: pictures.cin_recto_picture },
          cin_verso_picture: { pictureDetails: pictures.cin_verso_picture },
          licence_transport: {
            pictureDetails: pictures.licence_de_transport_picture,
          },
          rib: { pictureDetails: pictures.rib_picture },
          assurance_expiration_date: pictures.assurance_rc_pro_date
            .toISOString()
            .split("T")[0],
          licence_transport_expiration_date: pictures.licence_de_transport_date
            .toISOString()
            .split("T")[0],
        },
      };

      const userData = {
        username: data.email,
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phoneNumber,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      await dispatch(
        createUserAndCompany({
          userData,
          user_role: "company",
          validation: {
            description: null,
            validation_state: "waiting",
          },
          isIndiv: isIndividual,
          country: "Tunisia",
          companyData,
        })
      ).then(() => window.location.replace(process.env.REACT_APP_DASH_URL));
    } catch (error) {
      console.log(error.message);
      message.error(
        error.response?.data?.error?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Render form sections
  const renderBasicInfo = () => (
    <>
      <DISP>
        {!isIndividual && (
          <Container>
            <In
              type="text"
              {...register("nameE", {
                required: t("SINSCRIREpartenaire.validation.nomE"),
              })}
              errorBorder={errors.nameE}
              placeholder={
                isIndividual
                  ? t("SINSCRIREpartenaire.FormInput.indivname")
                  : t("SINSCRIREpartenaire.FormInput.nomE")
              }
            />
            {errors.nameE && (
              <ErrorMessage>{errors.nameE.message}</ErrorMessage>
            )}
            <Label right={i18n.language === "ar-AR"}>
              {isIndividual
                ? t("SINSCRIREpartenaire.FormInput.indivname")
                : t("SINSCRIREpartenaire.FormInput.nomE")}
            </Label>
          </Container>
        )}
        <Container>
          <In
            type="text"
            {...register("firstName", {
              required: t("SINSCRIREpartenaire.validation.nomPre"),
            })}
            errorBorder={errors.firstName}
            placeholder={
              isIndividual
                ? t("SINSCRIREpartenaire.FormInput.indivname")
                : t("SINSCRIREpartenaire.FormInput.indivname")
            }
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {isIndividual
              ? t("SINSCRIREpartenaire.FormInput.indivname")
              : t("SINSCRIREpartenaire.FormInput.indivname")}
          </Label>
        </Container>
      </DISP>

      <DISP>
        <Container>
          <In
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

        <Container
          phoneborder={errors.phoneNumber}
          isRtl={i18n.language.startsWith("ar")}
        >
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true, minLength: 7 }}
            render={({ field: { onChange } }) => (
              <PhoneInput
              enableSearch={true}
              preferredCountries={['tn', 'ae','fr']}
              excludeCountries={['il']}
                placeholder="Numéro de téléphone"
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
                // autoFormat={false}
                defaultMask={'.. ... ...'}
              />
            )}
          />
          {errors.phoneNumber && (
            <ErrorMessage>Numéro de téléphone invalide</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.phone")}
          </Label>
        </Container>
      </DISP>

      <Container>
        <Input
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

      <DISPA>
        <Container>
          <In
            {...register("password", {
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
                message:
                  "Mot de passe invalide. Longueur minimale de 8 caractères requise, avec au moins une lettre et un chiffre.",
              },
              required: t("SINSCRIREpartenaire.validation.pswd"),
            })}
            errorBorder={errors.password}
            type={passwordVisible ? "text" : "password"}
            placeholder={t("SINSCRIREpartenaire.FormInput.pswd")}
          />
          {passwordVisible ? (
            <IconContainer onClick={() => setPasswordVisible(false)}>
              <AiOutlineEyeInvisible />
            </IconContainer>
          ) : (
            <IconContainer onClick={() => setPasswordVisible(true)}>
              <AiOutlineEye />
            </IconContainer>
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
            <IconContainer onClick={() => setValidatePasswordVisible(false)}>
              <AiOutlineEyeInvisible />
            </IconContainer>
          ) : (
            <IconContainer onClick={() => setValidatePasswordVisible(true)}>
              <AiOutlineEye />
            </IconContainer>
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
        <BTNn type="submit">Suivant</BTNn>
        {/* <BTNb onClick={() => window.location.replace(`${process.env.REACT_APP_DASH_URL}`)}>
          S'identifier
        </BTNb> */}
      </div>
    </>
  );

  const renderDocuments = () => (
    <>
      <DISP>
        <Container>
          <Upload
            fileList={
              pictures.cin_recto_picture
                ? [{ uid: 1, name: pictures.cin_recto_picture.name }]
                : []
            }
            accept="image/*"
            {...createUploadProps("cin_recto_picture")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.cin_recto_picture && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            Pièce d'identité recto
          </Label>
        </Container>

        <Container>
          <Upload
            fileList={
              pictures.cin_verso_picture
                ? [{ uid: 1, name: pictures.cin_verso_picture.name }]
                : []
            }
            accept="image/*"
            {...createUploadProps("cin_verso_picture")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.cin_verso_picture && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            Pièce d'identité Verso
          </Label>
        </Container>
      </DISP>

      {!isIndividual && (
        <DISP>
          <Container full={true}>
            <Upload
              fileList={
                pictures.kabis_picture
                  ? [{ uid: 1, name: pictures.kabis_picture.name }]
                  : []
              }
              accept="image/*"
              {...createUploadProps("kabis_picture")}
              className="In"
            >
              <Button className="InBtn" icon={<UploadOutlined />}>
                Télécharger
              </Button>
            </Upload>
            {picturesErrors.kabis_picture && (
              <ErrorMessage>Image obligatoire</ErrorMessage>
            )}
            <Label right={i18n.language === "ar-AR"}>
              Extrait du Registre de Commerce
            </Label>
          </Container>
        </DISP>
      )}

      {isIndividual && (
        <DISP>
          <Container>
            <Upload
              fileList={
                pictures.carte_professionnelle
                  ? [{ uid: 1, name: pictures.carte_professionnelle.name }]
                  : []
              }
              accept="image/*"
              {...createUploadProps("carte_professionnelle")}
              className="In"
            >
              <Button className="InBtn" icon={<UploadOutlined />}>
                Télécharger
              </Button>
            </Upload>
            {picturesErrors.carte_professionnelle && (
              <ErrorMessage>Image obligatoire</ErrorMessage>
            )}
            <Label right={i18n.language === "ar-AR"}>
              Carte professionnelle
            </Label>
          </Container>

          <Container>
            <Upload
              fileList={
                pictures.carte_professionnelle_transport
                  ? [
                      {
                        uid: 1,
                        name: pictures.carte_professionnelle_transport.name,
                      },
                    ]
                  : []
              }
              accept="image/*"
              {...createUploadProps("carte_professionnelle_transport")}
              className="In"
            >
              <Button className="InBtn" icon={<UploadOutlined />}>
                Télécharger
              </Button>
            </Upload>
            {picturesErrors.carte_professionnelle_transport && (
              <ErrorMessage>Image obligatoire</ErrorMessage>
            )}
            <Label right={i18n.language === "ar-AR"}>
              Carte professionnelle de transport
            </Label>
          </Container>
        </DISP>
      )}

      <DISP>
        <Container>
          <Upload
            fileList={
              pictures.assurance_rc_pro
                ? [{ uid: 1, name: pictures.assurance_rc_pro.name }]
                : []
            }
            accept="image/*"
            {...createUploadProps("assurance_rc_pro")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.assurance_rc_pro && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {isIndividual
              ? "Photo Assurance RC Pro"
              : "Photo d'Attestation d'assurance"}
          </Label>
        </Container>

        <Container>
          <Upload
            fileList={
              pictures.urssaf ? [{ uid: 1, name: pictures.urssaf.name }] : []
            }
            accept="image/*"
            {...createUploadProps("urssaf")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.urssaf && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            Photo d'Attestation CNSS
          </Label>
        </Container>
      </DISP>

      <DISP>
        <Container>
          <Upload
            fileList={
              pictures.attestation_fiscale
                ? [{ uid: 1, name: pictures.attestation_fiscale.name }]
                : []
            }
            accept="image/*"
            {...createUploadProps("attestation_fiscale")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.attestation_fiscale && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {isIndividual
              ? "Photo d'Attestation fiscale personnelle"
              : "Photo d'Attestation Fiscale"}
          </Label>
        </Container>

        <Container>
          <Upload
            fileList={
              pictures.licence_de_transport_picture
                ? [{ uid: 1, name: pictures.licence_de_transport_picture.name }]
                : []
            }
            accept="image/*"
            {...createUploadProps("licence_de_transport_picture")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.licence_de_transport_picture && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {isIndividual
              ? "Carte professionnelle de transport"
              : "Licence de transport"}
          </Label>
        </Container>
      </DISP>

      <DISP>
        <Container full={true}>
          <Upload
            fileList={
              pictures.rib_picture
                ? [{ uid: 1, name: pictures.rib_picture.name }]
                : []
            }
            accept="image/*"
            {...createUploadProps("rib_picture")}
            className="In"
          >
            <Button className="InBtn" icon={<UploadOutlined />}>
              Télécharger
            </Button>
          </Upload>
          {picturesErrors.rib_picture && (
            <ErrorMessage>Image obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {isIndividual ? "RIB" : "RIB Société"}
          </Label>
        </Container>
      </DISP>

      <DISP>
        <Container>
          <In
            {...register("address", {
              required: t("SINSCRIREpartenaire.validation.adresse"),
            })}
            errorBorder={errors.address}
            type="text"
            placeholder={t("SINSCRIREpartenaire.FormInput.adresse")}
          />
          {errors.address && (
            <ErrorMessage>{errors.address.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.adresse")}
          </Label>
        </Container>

        <Container>
          <In
            type="text"
            {...register("postalCode", {
              required: t("SINSCRIREpartenaire.validation.postalcode"),
            })}
            errorBorder={errors.postalCode}
            placeholder={t("SINSCRIREpartenaire.FormInput.postalcode")}
          />
          {errors.postalCode && (
            <ErrorMessage>{errors.postalCode.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.postalcode")}
          </Label>
        </Container>
      </DISP>

      <DISP>
        <Container>
          <In
            {...register("city", {
              required: t("SINSCRIREpartenaire.validation.Required"),
            })}
            errorBorder={errors.city}
            type="text"
            placeholder={t("SINSCRIREpartenaire.FormInput.Ville")}
          />
          {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.Ville")}
          </Label>
        </Container>

        <Container>
          <In
            type="text"
            {...register("region", {
              required: t("SINSCRIREpartenaire.validation.Required"),
            })}
            errorBorder={errors.region}
            placeholder={t("SINSCRIREpartenaire.FormInput.État")}
          />
          {errors.region && (
            <ErrorMessage>{errors.region.message}</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            {t("SINSCRIREpartenaire.FormInput.État")}
          </Label>
        </Container>
      </DISP>

      <DISP>
        <Container>
          <DatePicker
            locale="fr"
            className="In"
            placeholderText="Date d'expiration"
            selected={pictures.assurance_rc_pro_date}
            onChange={(date) =>
              setPictures({ ...pictures, assurance_rc_pro_date: date })
            }
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
          {picturesErrors.assurance_rc_pro_date && (
            <ErrorMessage>Obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            Date expiration assurance rc pro
          </Label>
        </Container>

        <Container>
          <DatePicker
            locale="fr"
            className="In"
            placeholderText="Date d'expiration"
            selected={pictures.licence_de_transport_date}
            onChange={(date) =>
              setPictures({ ...pictures, licence_de_transport_date: date })
            }
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
          {picturesErrors.licence_de_transport_date && (
            <ErrorMessage>Obligatoire</ErrorMessage>
          )}
          <Label right={i18n.language === "ar-AR"}>
            Date expiration licence de transport
          </Label>
        </Container>
      </DISP>

      <DISP>
        <input
          type="checkbox"
          onChange={(e) => setAccept(e.target.checked)}
          style={checkboxStyle}
          {...register("terms", {
            required: t("SINSCRIREpartenaire.validation.accepter"),
          })}
          errorBorder={errors.terms}
        />
        <Pi>
          J'accepte tous{" "}
          <a href="/Politiques" target="_blank" rel="noopener noreferrer">
            les termes
          </a>{" "}
          et{" "}
          <a href="/Conditions" target="_blank" rel="noopener noreferrer">
            conditions
          </a>
        </Pi>
        {errors.terms && <ErrorMessage>{errors.terms.message}</ErrorMessage>}
      </DISP>

      <div className="registerBtn">
        <button
          className="retourBtn"
          type="button"
          onClick={() => setStepRegister(true)}
        >
          Retour
        </button>
        <Buttonn type="submit">
          {t("SINSCRIREpartenaire.FormInput.Inscrire")}
        </Buttonn>
      </div>
    </>
  );

  return (
    <AppContainer>
      {/* <FormSwitcher>
        <SwitchButton
          active={!isIndividual}
          onClick={() => setIsIndividual(false)}
          disabled={!stepRegister}
        >
          {t("SINSCRIREpartenaire.FormInput.organisation")}
        </SwitchButton>
        <SwitchButton
          active={isIndividual}
          onClick={() => setIsIndividual(true)}
          disabled={!stepRegister}
        >
          {t("SINSCRIREpartenaire.FormInput.indiv")}
        </SwitchButton>
      </FormSwitcher> */}

      <FormContainer>
        {isLogin ? (
          <>
            <FormContainer dir="auto" right={i18n.language === "ar-AR"}>
              <HomeIcon
                src={homeIcon}
                onClick={() => navigate("/")}
                alt="homeicon"
              />
              {stepRegister ? (
                <Formulaire
                  dir="auto"
                  right={i18n.language === "ar-AR"}
                  onSubmit={handleSubmit((data) => {
                    setstepRegister(false);
                    setIsSuivantClicked(true);
                  })}
                >
                  <DISP>
                    <Container>
                      <In
                        type="text"
                        {...register("name", {
                          required: t("SINSCRIREpartenaire.validation.nomE"),
                        })}
                        errorBorder={errors.name}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.nomE")}
                      />
                      {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.nomE")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.nomE")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <In
                        type="text"
                        {...register("nameOwner", {
                          required: t("SINSCRIREpartenaire.validation.nomP"),
                        })}
                        errorBorder={errors.nameOwner}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.nomP")}
                      />
                      {errors.nameOwner && (
                        <ErrorMessage>{errors.nameOwner.message}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.nomP")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.nomP")}
                        </Label>
                      )}
                    </Container>

                    <Container phoneborder={errors.phoneNumber}   isRtl={i18n.language.startsWith("ar")}>
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
                          
                            // dir="auto" right={true}
                            placeholder="Numéro de téléphone"
                            inputRef={register}
                            inputStyle={{
                              textAlign: "left",
                              direction: "ltr",
                              width: "100%",
                              height: 45,
                              fontSize: 16,
                              padding: 10,
                              paddingLeft: 55,
                              // borderWidth: errors.phoneNumber ? "1px" : "2px",
                              // borderColor: errors.phoneNumber ? "red" : "initial",
                              borderRadius: "8px",
                              backgroundColor: "transparent",
                              color: "gray",
                            }}
                            dropdownStyle={{ color: "black" }}
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
                            // style={{
                            //   direction: i18n.language.startsWith("ar")
                            //     ? "rtl"
                            //     : "ltr",
                            //   textAlign: i18n.language.startsWith("ar")
                            //     ? "right"
                            //     : "left",
                            // }}
                            country="tn"
                            // regions={"europe"}
                            // disableCountryCode={true}
                            countryCodeEditable={false}
                            enableAreaCodes={true}
                            // enableAreaCodeStretch={false}
                          />
                        )}
                      />

                      {/* <In
                type="text"
                {...register("phoneNumber", {
                  pattern: {
                    value:
                      /^(?:(?:\+|00)33[\s-]*\d{1,2}[\s-]*)?(?:(?:(?:\d{2}[\s-]*){4}\d{2})|(?:(?:\d{2}[\s-]*){3}\d{2}[\s-]*\d{2}))$/,
                    message: t("SINSCRIREpartenaire.validation.testPhone"),
                  },

                  required: t("SINSCRIREpartenaire.validation.phone"),
                })}
                errorBorder={errors.phoneNumber}
                // value={inputValue}
                // onChange={handleInputChange}
                placeholder="+33 -- -- -- --"
              /> */}
                      {errors.phoneNumber && (
                        <ErrorMessage>
                          {/* {console.log(errors.phoneNumber)}
                  {errors.phoneNumber.message} */}
                          Numéro de téléphone invalide
                        </ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.phone")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.phone")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <Container>
                    <Input
                      type="text"
                      {...register("email", {
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: t(
                            "SINSCRIREpartenaire.validation.testemail"
                          ),
                        },

                        required: t("SINSCRIREpartenaire.validation.email"),
                      })}
                      errorBorder={errors.email}
                      // value={inputValue}
                      // onChange={handleInputChange}
                      placeholder="example@email.com "
                      id="adr"
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    {i18n.language === "ar-AR" ? (
                      <Label right={true}>
                        {t("SINSCRIREpartenaire.FormInput.email")}
                      </Label>
                    ) : (
                      <Label right={false}>
                        {t("SINSCRIREpartenaire.FormInput.email")}
                      </Label>
                    )}
                  </Container>
                  <DISPA>
                    <Container>
                      <In
                        {...register("password", {
                          pattern: {
                            value:
                              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
                            message:
                              "Mot de passe invalide. Longueur minimale de 8 caractères requise, avec au moins une lettre et un chiffre.",
                          },
                          required: t("SINSCRIREpartenaire.validation.pswd"),
                        })}
                        errorBorder={errors.password}
                        type={passwordVisible ? "text" : "password"}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.pswd")}
                        id="mdp"
                      />
                      {passwordVisible ? (
                        <IconContainer
                          onClick={() => setPasswordVisible(false)}
                        >
                          <AiOutlineEyeInvisible />
                        </IconContainer>
                      ) : (
                        <IconContainer onClick={() => setPasswordVisible(true)}>
                          <AiOutlineEye />
                        </IconContainer>
                      )}
                      {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.pswd")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.pswd")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <In
                        {...register(
                          "confirm_password",
                          {
                            validate: (value) => {
                              const { password } = getValues();
                              return (
                                password === value ||
                                t("SINSCRIREpartenaire.validation.confpswd")
                              );
                            },
                          }
                          //  {
                          //   required: password === confirm_password ? "test" : "required",
                          // }
                        )}
                        errorBorder={errors.confirm_password}
                        type={validatePasswordVisible ? "text" : "password"}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t(
                          "SINSCRIREpartenaire.FormInput.confpswd"
                        )}
                        id="mdp"
                      />
                      {validatePasswordVisible ? (
                        <IconContainer
                          onClick={() => setValidatePasswordVisible(false)}
                        >
                          <AiOutlineEyeInvisible />
                        </IconContainer>
                      ) : (
                        <IconContainer
                          onClick={() => setValidatePasswordVisible(true)}
                        >
                          <AiOutlineEye />
                        </IconContainer>
                      )}
                      {errors.confirm_password && (
                        <ErrorMessage>
                          {errors.confirm_password.message}
                        </ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.confpswd")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.confpswd")}
                        </Label>
                      )}
                    </Container>
                  </DISPA>
                  <div style={{display:"flex", gap:8}}>
                  <BTNn
                    type="submit"
                    onSubmit={(e) => e.preventDefault()}
                    // onClick={() => setstepRegister(false)}
                  >
                    Suivant
                  </BTNn>{" "}
                  <BTNb
                    onClick={() => window.location.replace(`${process.env.REACT_APP_DASH_URL}`)}
                  >
                    S'identifier
                  </BTNb></div>
                </Formulaire>
              ) : (
                <Formulaire
                  dir="auto"
                  right={i18n.language === "ar-AR"}
                  onSubmit={handleSubmit((data) => {
                    // console.log({
                    //   username: data.email,
                    //   email: data.email,
                    //   user_role: "company",
                    //   phoneNumber: data.phoneNumber,
                    //   password: data.password,
                    //   accountOverview: [
                    //     {
                    //       __component: "section.company",
                    //       name: data.name,
                    //       activity: data.activity,
                    //       category: data.category,
                    //       cinOwner: data.cinOwner,
                    //       nameOwner: data.nameOwner,
                    //       address: data.address,
                    //       region: data.region,
                    //       city: data.city,
                    //       postalCode: data.postalCode,
                    //       kabis: data.kabis,
                    //       assurance_rc_pro: data.assurance_rc_pro,
                    //       numSiret: data.numSiret,
                    //       logo: null,
                    //       kabis_picture: [pictures.kabis_picture],
                    //       assurance_rc_pro_picture: [pictures.assurance_rc_pro_picture],
                    //       cin_recto_picture: pictures.cin_recto_picture,
                    //       cin_verso_picture: pictures.cin_verso_picture,
                    //       licence_de_transport_picture:
                    //         pictures.licence_de_transport_picture,
                    //       rib_picture: pictures.rib_picture,
                    //     },
                    //   ],
                    // });
                    // kabis_picture: null,
                    // assurance_rc_pro_picture: null,
                    // cin_recto_picture: null,
                    // cin_verso_picture: null,
                    // licence_de_transport_picture: null,
                    // rib_picture: null,
                    if (
                      pictures.urssaf &&
                      pictures.attestation_fiscale &&
                      pictures.kabis_picture &&
                      pictures.assurance_rc_pro_picture &&
                      pictures.cin_recto_picture &&
                      pictures.cin_verso_picture &&
                      pictures.licence_de_transport_picture &&
                      pictures.rib_picture &&
                      pictures.assurance_rc_pro_date &&
                      pictures.licence_de_transport_date
                    ) {
                      setLoading(true);
                      myPromise({
                        userData: {
                          username: data.email,
                          email: data.email.toLowerCase().trim(),
                          phoneNumber: data.phoneNumber,
                          password: data.password,
                        },

                        user_role: "company",

                        validation: {
                          description: null,
                          validation_state: "waiting",
                        },
                        isIndiv: false,
                        country: "Tunisia",
                        companyData: {
                          name: data.name,
                          activity: data.activity,
                          // category: data.category,
                          // cinOwner: data.cinOwner,
                          nameOwner: data.nameOwner,
                          address: data.address,
                          region: data.region,
                          city: data.city,
                          postalCode: data.postalCode,
                          Documents: {
                            rne: { pictureDetails: pictures.kabis_picture },
                            attestation_cnss: {
                              pictureDetails: pictures.urssaf,
                            },
                            attestation_fiscale: {
                              pictureDetails: pictures.attestation_fiscale,
                            },
                            assurance_rc_pro_picture: {
                              pictureDetails: pictures.assurance_rc_pro_picture,
                            },
                            cin_recto_picture: {
                              pictureDetails: pictures.cin_recto_picture,
                            },
                            cin_verso_picture: {
                              pictureDetails: pictures.cin_verso_picture,
                            },
                            licence_transport: {
                              pictureDetails:
                                pictures.licence_de_transport_picture,
                            },
                            rib: { pictureDetails: pictures.rib_picture },
                            assurance_rc_pro_date:
                              pictures.assurance_rc_pro_date
                                .toISOString()
                                .split("T")[0],
                            licence_de_transport_date:
                              pictures.licence_de_transport_date
                                .toISOString()
                                .split("T")[0],
                          },
                        },
                      })
                        .then((user) => {
                          setLoading(false),
                            window.location.replace(
                              process.env.REACT_APP_DASH_URL
                            );
                        })
                        .catch((error) => {
                          setLoading(false),
                            alert(
                              error.response.data.error.message &&
                                "email et/ou mot de passe incorrect(s)"
                            );
                          window.location.replace("/Sidentifierpartenaire");
                        });
                    } else {
                      setPicturesErrors({
                        urssaf: !pictures.urssaf,
                        attestation_fiscale: !pictures.attestation_fiscale,
                        kabis_picture: !pictures.kabis_picture,
                        assurance_rc_pro_picture:
                          !pictures.assurance_rc_pro_picture,
                        cin_recto_picture: !pictures.cin_recto_picture,
                        cin_verso_picture: !pictures.cin_verso_picture,
                        licence_de_transport_picture:
                          !pictures.licence_de_transport_picture,
                        rib_picture: !pictures.rib_picture,
                        assurance_rc_pro_date: !pictures.assurance_rc_pro_date,
                        licence_de_transport_date: !licence_de_transport_date,
                      });
                    }
                  })}
                >
                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.cin_recto_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.cin_recto_picture?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props}
                        className="In"
                        // {...register("pictures", {
                        //   required: t("SINSCRIREpartenaire.validation.Activité"),
                        // })}
                        // errorBorder={errors.pictures}
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.cin_recto_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}> {t("SINSCRIREpartenaire.FormInput.Pièce d'identité recto")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité recto")}</Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.cin_verso_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.cin_verso_picture?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props1}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.cin_verso_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité Verso")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité Verso")}</Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.kabis_picture
                            ? [{ uid: 1, name: pictures?.kabis_picture?.name }]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props2}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.kabis_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.Extrait du Registre de Commerce")}
                        </Label>
                      ) : (
                        <Label right={false}>
                      {t("SINSCRIREpartenaire.FormInput.Extrait du Registre de Commerce")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.assurance_rc_pro_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.assurance_rc_pro_picture
                                    ?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props3}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.assurance_rc_pro_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.Photo d'Attestation d'assurance")}{" "} 
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.Photo d'Attestation d'assurance")}{" "}
                        </Label>
                      )}
                    </Container>
                  </DISP>

                  {/* ============================================================================== */}
                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.urssaf
                            ? [{ uid: 1, name: pictures?.urssaf?.name }]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props7}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.urssaf && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}> {t("SINSCRIREpartenaire.FormInput.Photo d'Attestation CNSS")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.Photo d'Attestation CNSS")}</Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.attestation_fiscale
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.attestation_fiscale?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props8}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.attestation_fiscale && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>{t("SINSCRIREpartenaire.FormInput.Photo d'Attestation Fiscale")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.Photo d'Attestation Fiscale")}</Label>
                      )}
                    </Container>
                  </DISP>

                  {/* ============================================================================= */}

                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.licence_de_transport_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.licence_de_transport_picture
                                    ?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props4}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.licence_de_transport_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>{t("SINSCRIREpartenaire.FormInput.licence de transport")}  </Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.licence de transport")}</Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.rib_picture
                            ? [{ uid: 1, name: pictures?.rib_picture?.name }]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props5}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.rib_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>{t("SINSCRIREpartenaire.FormInput.RIB Société")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.RIB Société")}</Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <In
                        {...register("address", {
                          required: t("SINSCRIREpartenaire.validation.adresse"),
                        })}
                        errorBorder={errors.address}
                        type="text"
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.adresse")}
                      />
                      {errors.address && (
                        <ErrorMessage>{errors.address.message}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.adresse")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.adresse")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <In
                        type="text"
                        {...register("postalCode", {
                          required: t(
                            "SINSCRIREpartenaire.validation.postalcode"
                          ),
                        })}
                        errorBorder={errors.postalCode}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t(
                          "SINSCRIREpartenaire.FormInput.postalcode"
                        )}
                      />
                      {errors.postalCode && (
                        <ErrorMessage>{errors.postalCode.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.postalcode")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.postalcode")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <In
                        {...register("city", {
                          required: t(
                            "SINSCRIREpartenaire.validation.Required"
                          ),
                        })}
                        errorBorder={errors.city}
                        type="text"
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.Ville")}
                      />
                      {errors.city && (
                        <ErrorMessage>{errors.city.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.Ville")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.Ville")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <In
                        type="text"
                        {...register("region", {
                          required: t(
                            "SINSCRIREpartenaire.validation.Required"
                          ),
                        })}
                        errorBorder={errors.region}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.État")}
                      />
                      {errors.region && (
                        <ErrorMessage>{errors.region.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.État")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.État")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <DatePicker
                        locale="fr"
                        className="In"
                        placeholderText={t("Step1.Aujourd")}
                        // locale="fr"
                        selected={pictures?.assurance_rc_pro_date}
                        onChange={(date) =>
                          setPictures({
                            ...pictures,
                            assurance_rc_pro_date: date,
                          })
                        }
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                      />
                      {picturesErrors?.assurance_rc_pro_date && (
                        <ErrorMessage>Obligatoire</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                        {t("SINSCRIREpartenaire.FormInput.Date expiration assurance rc pro")}
                        </Label>
                      ) : (
                        <Label right={false}>
                        {t("SINSCRIREpartenaire.FormInput.Date expiration assurance rc pro")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <DatePicker
                        locale="fr"
                        className="In"
                        placeholderText={t("Step1.Aujourd")}
                        // locale="fr"
                        selected={pictures?.licence_de_transport_date}
                        onChange={(date) =>
                          setPictures({
                            ...pictures,
                            licence_de_transport_date: date,
                          })
                        }
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                      />
                      {picturesErrors?.licence_de_transport_date && (
                        <ErrorMessage>Obligatoire</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.Date expiration licence de transport")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.Date expiration licence de transport")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <input
                      type="checkbox"
                      onChange={(e) => setAccept(e.value.checked)}
                      style={checkboxStyle}
                      {...register("terms", {
                        required: t("SINSCRIREpartenaire.validation.accepter"),
                      })}
                      errorBorder={errors.terms}
                    />
                    <Pi>
                      {" "}
                      {t("SINSCRIREpartenaire.FormInput.J'accepte tous les termes et conditions")}
                      <a href="/Politiques" target="_blank">
                      {t("SINSCRIREpartenaire.FormInput.termes")}
                      </a>{" "}
                      {t("SINSCRIREpartenaire.FormInput.et")}{" "}
                      <a href="/Conditions" target="_blank">
                      {t("SINSCRIREpartenaire.FormInput.conditions")}
                      </a>
                    </Pi>
                    {errors.terms && (
                      <ErrorMessage>{errors.terms.message}</ErrorMessage>
                    )}
                  </DISP>

                  <div className="registerBtn">
                    <button
                      className="retourBtn"
                      type="submit"
                      onSubmit={(e) => e.preventDefault()}
                      onClick={() => setstepRegister(true)}
                    >
                        {t("SINSCRIREpartenaire.FormInput.Retour")}
                      
                    </button>{" "}
                    <Buttonn
                      type="submit"
                      onSubmit={(e) => {
                        e.FormInput.preventDefault();
                      }}
                      onClick={() =>
                        setPicturesErrors({
                          urssaf: !pictures.urssaf,
                          attestation_fiscale: !pictures.attestation_fiscale,
                          kabis_picture: !pictures.kabis_picture,
                          assurance_rc_pro_picture:
                            !pictures.assurance_rc_pro_picture,
                          cin_recto_picture: !pictures.cin_recto_picture,
                          cin_verso_picture: !pictures.cin_verso_picture,
                          licence_de_transport_picture:
                            !pictures.licence_de_transport_picture,
                          rib_picture: !pictures.rib_picture,
                          assurance_rc_pro_date:
                            !pictures.assurance_rc_pro_date,
                          licence_de_transport_date:
                            !pictures.licence_de_transport_date,
                        })
                      }
                    >
                      {" "}
                      {t("SINSCRIREpartenaire.FormInput.Inscrire")}
                    </Buttonn>{" "}
                  </div>
                </Formulaire>
              )}
            </FormContainer>
          </>
        ) : (
          <>
            <FormContainer dir="auto" right={i18n.language === "ar-AR"}>
              <h2
                style={{
                  margin: "10px",
                  paddingBottom: "20px",
                  width: "500px",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                {t("SINSCRIREpartenaire.FormInput.indivre")}
              </h2>
              <HomeIcon
                src={homeIcon}
                onClick={() => navigate("/")}
                alt="homeicon"
              />
              {stepRegister ? (
                <Formulaire
                  dir="auto"
                  right={i18n.language === "ar-AR"}
                  onSubmit={handleSubmit((data) => {
                    setstepRegister(false);
                    setIsSuivantClicked(true);
                  })}
                >
                  <DISP>
                    <Container>
                      <In
                        type="text"
                        {...register("name", {
                          required: t(
                            "SINSCRIREpartenaire.validation.indivname"
                          ),
                        })}
                        errorBorder={errors.name}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t(
                          "SINSCRIREpartenaire.FormInput.indivname"
                        )}
                      />
                      {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.indivname")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.indivname")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <In
                        type="text"
                        {...register("nameOwner", {
                          required: t(
                            "SINSCRIREpartenaire.validation.indivlast"
                          ),
                        })}
                        errorBorder={errors.nameOwner}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t(
                          "SINSCRIREpartenaire.FormInput.indivlast"
                        )}
                      />
                      {errors.nameOwner && (
                        <ErrorMessage>{errors.nameOwner.message}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.indivlast")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.indivlast")}
                        </Label>
                      )}
                    </Container>

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
                            placeholder="Numéro de téléphone"
                            inputRef={register}
                            inputStyle={{
                              width: "100%",
                              height: 45,
                              fontSize: 16,
                              textAlign: "left",
                              direction: "ltr",
                              padding: 10,
                              paddingLeft: 55,
                              // borderWidth: errors.phoneNumber ? "1px" : "2px",
                              // borderColor: errors.phoneNumber ? "red" : "initial",
                              borderRadius: "8px",
                              backgroundColor: "transparent",
                              color: "gray",
                            }}
                            dropdownStyle={{ color: "black" }}
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
                            countryCodeEditable={false}
                            enableAreaCodes={true}
                            // enableAreaCodeStretch={false}
                          />
                        )}
                      />

                      {/* <In
                type="text"
                {...register("phoneNumber", {
                  pattern: {
                    value:
                      /^(?:(?:\+|00)33[\s-]*\d{1,2}[\s-]*)?(?:(?:(?:\d{2}[\s-]*){4}\d{2})|(?:(?:\d{2}[\s-]*){3}\d{2}[\s-]*\d{2}))$/,
                    message: t("SINSCRIREpartenaire.validation.testPhone"),
                  },

                  required: t("SINSCRIREpartenaire.validation.phone"),
                })}
                errorBorder={errors.phoneNumber}
                // value={inputValue}
                // onChange={handleInputChange}
                placeholder="+33 -- -- -- --"
              /> */}
                      {errors.phoneNumber && (
                        <ErrorMessage>
                          {/* {console.log(errors.phoneNumber)}
                  {errors.phoneNumber.message} */}
                          Numéro de téléphone invalide
                        </ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.phone")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.phone")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <Container>
                    <Input
                      type="text"
                      {...register("email", {
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: t(
                            "SINSCRIREpartenaire.validation.testemail"
                          ),
                        },

                        required: t("SINSCRIREpartenaire.validation.email"),
                      })}
                      errorBorder={errors.email}
                      // value={inputValue}
                      // onChange={handleInputChange}
                      placeholder="example@email.com "
                      id="adr"
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    {i18n.language === "ar-AR" ? (
                      <Label right={true}>
                        {t("SINSCRIREpartenaire.FormInput.email")}
                      </Label>
                    ) : (
                      <Label right={false}>
                        {t("SINSCRIREpartenaire.FormInput.email")}
                      </Label>
                    )}
                  </Container>
                  <DISPA>
                    <Container>
                      <In
                        {...register("password", {
                          pattern: {
                            value:
                              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
                            message:
                              "Mot de passe invalide. Longueur minimale de 8 caractères requise, avec au moins une lettre et un chiffre.",
                          },
                          required: t("SINSCRIREpartenaire.validation.pswd"),
                        })}
                        errorBorder={errors.password}
                        type={passwordVisible ? "text" : "password"}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.pswd")}
                        id="mdp"
                      />
                      {passwordVisible ? (
                        <IconContainer
                          onClick={() => setPasswordVisible(false)}
                        >
                          <AiOutlineEyeInvisible />
                        </IconContainer>
                      ) : (
                        <IconContainer onClick={() => setPasswordVisible(true)}>
                          <AiOutlineEye />
                        </IconContainer>
                      )}
                      {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.pswd")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.pswd")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <In
                        {...register(
                          "confirm_password",
                          {
                            validate: (value) => {
                              const { password } = getValues();
                              return (
                                password === value ||
                                t("SINSCRIREpartenaire.validation.confpswd")
                              );
                            },
                          }
                          //  {
                          //   required: password === confirm_password ? "test" : "required",
                          // }
                        )}
                        errorBorder={errors.confirm_password}
                        type={validatePasswordVisible ? "text" : "password"}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t(
                          "SINSCRIREpartenaire.FormInput.confpswd"
                        )}
                        id="mdp"
                      />
                      {validatePasswordVisible ? (
                        <IconContainer
                          onClick={() => setValidatePasswordVisible(false)}
                        >
                          <AiOutlineEyeInvisible />
                        </IconContainer>
                      ) : (
                        <IconContainer
                          onClick={() => setValidatePasswordVisible(true)}
                        >
                          <AiOutlineEye />
                        </IconContainer>
                      )}
                      {errors.confirm_password && (
                        <ErrorMessage>
                          {errors.confirm_password.message}
                        </ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.confpswd")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.confpswd")}
                        </Label>
                      )}
                    </Container>
                  </DISPA>
                  <BTNn
                    type="submit"
                    onSubmit={(e) => e.preventDefault()}
                    // onClick={() => setstepRegister(false)}
                  >
                    Suivant
                  </BTNn>{" "}
                </Formulaire>
              ) : (
                <Formulaire
                  dir="auto"
                  right={i18n.language === "ar-AR"}
                  onSubmit={handleSubmit((data) => {
                    // console.log({
                    //   username: data.email,
                    //   email: data.email,
                    //   user_role: "company",
                    //   phoneNumber: data.phoneNumber,
                    //   password: data.password,
                    //   accountOverview: [
                    //     {
                    //       __component: "section.company",
                    //       name: data.name,
                    //       activity: data.activity,
                    //       category: data.category,
                    //       cinOwner: data.cinOwner,
                    //       nameOwner: data.nameOwner,
                    //       address: data.address,
                    //       region: data.region,
                    //       city: data.city,
                    //       postalCode: data.postalCode,
                    //       kabis: data.kabis,
                    //       assurance_rc_pro: data.assurance_rc_pro,
                    //       numSiret: data.numSiret,
                    //       logo: null,
                    //       kabis_picture: [pictures.kabis_picture],
                    //       assurance_rc_pro_picture: [pictures.assurance_rc_pro_picture],
                    //       cin_recto_picture: pictures.cin_recto_picture,
                    //       cin_verso_picture: pictures.cin_verso_picture,
                    //       licence_de_transport_picture:
                    //         pictures.licence_de_transport_picture,
                    //       rib_picture: pictures.rib_picture,
                    //     },
                    //   ],
                    // });
                    // kabis_picture: null,
                    // assurance_rc_pro_picture: null,
                    // cin_recto_picture: null,
                    // cin_verso_picture: null,
                    // licence_de_transport_picture: null,
                    // rib_picture: null,
                    if (
                      pictures.urssaf &&
                      pictures.attestation_fiscale &&
                      pictures.kabis_picture &&
                      pictures.assurance_rc_pro_picture &&
                      pictures.cin_recto_picture &&
                      pictures.cin_verso_picture &&
                      pictures.licence_de_transport_picture &&
                      pictures.rib_picture &&
                      pictures.assurance_rc_pro_date &&
                      pictures.licence_de_transport_date
                    ) {
                      setLoading(true);
                      myPromise({
                        userData: {
                          username: data.email,
                          email: data.email.toLowerCase().trim(),
                          phoneNumber: data.phoneNumber,
                          password: data.password,
                        },
                        isIndiv: true,
                        country: "Tunisia",
                        companyData: {
                          name: data.name,
                          activity: data.activity,
                          // category: data.category,
                          // cinOwner: data.cinOwner,
                          nameOwner: data.nameOwner,
                          address: data.address,
                          region: data.region,
                          city: data.city,
                          postalCode: data.postalCode,
                          Documents: {
                            kabis_picture: [pictures.kabis_picture],
                            urssaf: [pictures.urssaf],
                            attestation_fiscale: [pictures.attestation_fiscale],
                            assurance_rc_pro_picture: [
                              pictures.assurance_rc_pro_picture,
                            ],
                            cin_recto_picture: pictures.cin_recto_picture,
                            cin_verso_picture: pictures.cin_verso_picture,
                            licence_de_transport_picture:
                              pictures.licence_de_transport_picture,
                            rib_picture: pictures.rib_picture,
                            assurance_rc_pro_date:
                              pictures.assurance_rc_pro_date
                                .toISOString()
                                .split("T")[0],
                            licence_de_transport_date:
                              pictures.licence_de_transport_date
                                .toISOString()
                                .split("T")[0],
                          },
                        },
                        user_role: "company",

                        validation: {
                          description: null,
                          validation_state: "waiting",
                        },
                        // accountOverview: [
                        //   {
                        //     __component: "section.company",
                        //     name: data.name,
                        //     activity: data.activity,
                        //     // category: data.category,
                        //     // cinOwner: data.cinOwner,
                        //     nameOwner: data.nameOwner,
                        //     address: data.address,
                        //     region: data.region,
                        //     city: data.city,
                        //     postalCode: data.postalCode,
                        //     // kabis: data.kabis,
                        //     // assurance_rc_pro: data.assurance_rc_pro,
                        //     // numSiret: data.numSiret,
                        //     // logo: null,

                        //   },
                        // ],
                      })
                        .then((user) => {
                          setLoading(false),
                            window.location.replace(
                              process.env.REACT_APP_DASH_URL
                            );
                        })
                        .catch((error) => {
                          setLoading(false),
                            alert(
                              error.response.data.error.message &&
                                "email et/ou mot de passe incorrect(s)"
                            );
                          window.location.replace("/Sidentifierpartenaire");
                        });
                    } else {
                      setPicturesErrors({
                        urssaf: !pictures.urssaf,
                        attestation_fiscale: !pictures.attestation_fiscale,
                        kabis_picture: !pictures.kabis_picture,
                        assurance_rc_pro_picture:
                          !pictures.assurance_rc_pro_picture,
                        cin_recto_picture: !pictures.cin_recto_picture,
                        cin_verso_picture: !pictures.cin_verso_picture,
                        licence_de_transport_picture:
                          !pictures.licence_de_transport_picture,
                        rib_picture: !pictures.rib_picture,
                        assurance_rc_pro_date: !pictures.assurance_rc_pro_date,
                        licence_de_transport_date: !licence_de_transport_date,
                      });
                    }
                  })}
                >
                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.cin_recto_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.cin_recto_picture?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props}
                        className="In"
                        // {...register("pictures", {
                        //   required: t("SINSCRIREpartenaire.validation.Activité"),
                        // })}
                        // errorBorder={errors.pictures}
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.cin_recto_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité recto")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité recto")}</Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.cin_verso_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.cin_verso_picture?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props1}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.cin_verso_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité Verso")}</Label>
                      ) : (
                        <Label right={false}>{t("SINSCRIREpartenaire.FormInput.Pièce d'identité Verso")}</Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    {/* <Container>
                      <Upload
                        fileList={
                          pictures?.kabis_picture
                            ? [{ uid: 1, name: pictures?.kabis_picture?.name }]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props2}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.kabis_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>Photo Carte professionnelle</Label>
                      ) : (
                        <Label right={false}>Photo Carte professionnelle</Label>
                      )}
                    </Container> */}
                    <Container>
                      <Upload
                        fileList={
                          pictures?.assurance_rc_pro_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.assurance_rc_pro_picture
                                    ?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props3}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.assurance_rc_pro_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>Photo Assurance RC Pro </Label>
                      ) : (
                        <Label right={false}>Photo Assurance RC Pro</Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.urssaf
                            ? [{ uid: 1, name: pictures?.urssaf?.name }]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props7}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.urssaf && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>Photo d'Attestation CNSS</Label>
                      ) : (
                        <Label right={false}>Photo d'Attestation CNSS</Label>
                      )}
                    </Container>
                  </DISP>

                  {/* ============================================================================== */}
                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.attestation_fiscale
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.attestation_fiscale?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props8}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.attestation_fiscale && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          Photo d'Attestation fiscale personnelle
                        </Label>
                      ) : (
                        <Label right={false}>
                          Photo d'Attestation fiscale personnelle
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.licence_de_transport_picture
                            ? [
                                {
                                  uid: 1,
                                  name: pictures?.licence_de_transport_picture
                                    ?.name,
                                },
                              ]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props4}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.licence_de_transport_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          Carte professionnelle de transport
                        </Label>
                      ) : (
                        <Label right={false}>
                          Carte professionnelle de transport
                        </Label>
                      )}
                    </Container>
                  </DISP>

                  {/* ============================================================================= */}

                  <DISP>
                    <Container>
                      <Upload
                        fileList={
                          pictures?.rib_picture
                            ? [{ uid: 1, name: pictures?.rib_picture?.name }]
                            : []
                        }
                        accept="image/png, image/jpeg"
                        multiple={false}
                        {...props5}
                        className="In"
                      >
                        <Button className="InBtn" icon={<UploadOutlined />}>
                          {t("SINSCRIREpartenaire.FormInput.télécharger")}
                        </Button>
                      </Upload>
                      {picturesErrors?.rib_picture && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Image obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>RIB </Label>
                      ) : (
                        <Label right={false}>RIB </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <In
                        {...register("address", {
                          required: t("SINSCRIREpartenaire.validation.adresse"),
                        })}
                        errorBorder={errors.address}
                        type="text"
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.adresse")}
                      />
                      {errors.address && (
                        <ErrorMessage>{errors.address.message}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.adresse")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.adresse")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <In
                        type="text"
                        {...register("postalCode", {
                          required: t(
                            "SINSCRIREpartenaire.validation.postalcode"
                          ),
                        })}
                        errorBorder={errors.postalCode}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t(
                          "SINSCRIREpartenaire.FormInput.postalcode"
                        )}
                      />
                      {errors.postalCode && (
                        <ErrorMessage>{errors.postalCode.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.postalcode")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.postalcode")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <In
                        {...register("city", {
                          required: t(
                            "SINSCRIREpartenaire.validation.Required"
                          ),
                        })}
                        errorBorder={errors.city}
                        type="text"
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.Ville")}
                      />
                      {errors.city && (
                        <ErrorMessage>{errors.city.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.Ville")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.Ville")}
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <In
                        type="text"
                        {...register("region", {
                          required: t(
                            "SINSCRIREpartenaire.validation.Required"
                          ),
                        })}
                        errorBorder={errors.region}
                        // value={inputValue}
                        // onChange={handleInputChange}
                        placeholder={t("SINSCRIREpartenaire.FormInput.État")}
                      />
                      {errors.region && (
                        <ErrorMessage>{errors.region.message}</ErrorMessage>
                      )}
                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          {t("SINSCRIREpartenaire.FormInput.État")}
                        </Label>
                      ) : (
                        <Label right={false}>
                          {t("SINSCRIREpartenaire.FormInput.État")}
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <Container>
                      <DatePicker
                        locale="fr"
                        className="In"
                        placeholderText={t("Step1.Aujourd")}
                        // locale="fr"
                        selected={pictures?.assurance_rc_pro_date}
                        onChange={(date) =>
                          setPictures({
                            ...pictures,
                            assurance_rc_pro_date: date,
                          })
                        }
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                      />
                      {picturesErrors?.assurance_rc_pro_date && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          Date expiration assurance rc pro
                        </Label>
                      ) : (
                        <Label right={false}>
                          Date expiration assurance rc pro
                        </Label>
                      )}
                    </Container>
                    <Container>
                      <DatePicker
                        locale="fr"
                        className="In"
                        placeholderText={t("Step1.Aujourd")}
                        // locale="fr"
                        selected={pictures?.licence_de_transport_date}
                        onChange={(date) =>
                          setPictures({
                            ...pictures,
                            licence_de_transport_date: date,
                          })
                        }
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                      />
                      {picturesErrors?.licence_de_transport_date && (
                        <ErrorMessage>{t("SINSCRIREpartenaire.FormInput.Obligatoire")}</ErrorMessage>
                      )}

                      {i18n.language === "ar-AR" ? (
                        <Label right={true}>
                          Date expiration licence de transport
                        </Label>
                      ) : (
                        <Label right={false}>
                          Date expiration licence de transport
                        </Label>
                      )}
                    </Container>
                  </DISP>
                  <DISP>
                    <input
                      type="checkbox"
                      onChange={(e) => setAccept(e.value.checked)}
                      style={checkboxStyle}
                      {...register("terms", {
                        required: t("SINSCRIREpartenaire.validation.accepter"),
                      })}
                      errorBorder={errors.terms}
                    />
                    <Pi>
                      {" "}
                      {t("SINSCRIREpartenaire.FormInput.J'accepte tous les termes et conditions")}
                      <a href="/Politiques" target="_blank">
                      {t("SINSCRIREpartenaire.FormInput.termes")}
                      </a>{" "}
                      {t("SINSCRIREpartenaire.FormInput.et")}{" "}
                      <a href="/Conditions" target="_blank">
                      {t("SINSCRIREpartenaire.FormInput.conditions")}
                      </a>
                    </Pi>
                    {errors.terms && (
                      <ErrorMessage>{errors.terms.message}</ErrorMessage>
                    )}
                  </DISP>

                  <div className="registerBtn">
                    <button
                      className="retourBtn"
                      type="submit"
                      onSubmit={(e) => e.preventDefault()}
                      onClick={() => setstepRegister(true)}
                    >
                      Retour
                    </button>{" "}
                    <Buttonn
                      type="submit"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() =>
                        setPicturesErrors({
                          urssaf: !pictures.urssaf,
                          attestation_fiscale: !pictures.attestation_fiscale,
                          kabis_picture: !pictures.kabis_picture,
                          assurance_rc_pro_picture:
                            !pictures.assurance_rc_pro_picture,
                          cin_recto_picture: !pictures.cin_recto_picture,
                          cin_verso_picture: !pictures.cin_verso_picture,
                          licence_de_transport_picture:
                            !pictures.licence_de_transport_picture,
                          rib_picture: !pictures.rib_picture,
                          assurance_rc_pro_date:
                            !pictures.assurance_rc_pro_date,
                          licence_de_transport_date:
                            !pictures.licence_de_transport_date,
                        })
                      }
                    >
                      {" "}
                      {t("SINSCRIREpartenaire.FormInput.Inscrire")}
                    </Buttonn>{" "}
                  </div>
                </Formulaire>
              )}
            </FormContainer>
          </>
        )}
      </FormContainer>
    </AppContainer>
  );
};

export default FormInputAgent;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw !important;
  @media (max-width: 1050px) {
    width: 90vw;
  }
`;

const FormSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SwitchButton = styled.button`
  background: ${(props) => (props.active ? "#F37A1D" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#ffffff" : "#000000")};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 5px;
  margin: 0 5px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  &:hover {
    background: ${(props) => (props.disabled ? "#e0e0e0" : "#F37A1D")};
    color: ${(props) => (props.disabled ? "#000000" : "#ffffff")};
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #f37a1d;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #f37a1d;
  color: #ffffff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }
`;
const Formulaire = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  @media (max-width: 1050px) {
    margin-top: 5%;
    width: 95%;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding-bottom: 50px;
  @media (max-width: 1050px) {
    margin-top: 5%;
    width: 95%;
  }
`;

const checkboxStyle = {
  width: "20px",
  height: "20px",
};

export const Pi = styled.p`
  color: var(--dark-main-color, #020111);
  font-size: 15px;
  font-family: "Inter", sans-serif;
  line-height: 150%;
  letter-spacing: 0.24px;
  a {
    color: #f37a1d;
  }

  @media (max-width: 1050px) {
    color: white;
    margin-left: 12px;
    font-size:14px;
  }
`;
export const DISPA = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  @media (max-width: 1050px) {
    /* display: none; */
  }
`;
export const DISPO = styled.section`
  display: none;
  @media (max-width: 1050px) {
    display: block;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  direction: ltr;
  .In {
    padding: 0px 10px;
    height: 45px;
    max-width: 100%;
    @media (max-width: 1050px) {
      height: 60px !important;
    }
    &::placeholder {
      font-size: 12px;
    }
  }

  .ant-upload-wrapper {
    ${(props) => props.full && { width: "100%" }};
    overflow: hidden;
    text-align: start;
  }

  .ant-upload-list-text {
    width: ${(props) => (props.full ? "70%" : "47%")};
    min-width: ${(props) => (props.full ? "70%" : "47%")};
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
    direction: ${({ isRtl }) => (isRtl ? "ltr" : "ltr")};
    @media (max-width: 1050px) {
      height: 60px;
    }
  }
  .flag-dropdown {
    background-color: transparent !important;
    border: none !important;
    padding-left: 10px;
  }
  .selected-flag {
    background-color: transparent !important;
  }
  .country-list {
    margin: 0 !important;
    /* width: 100%; */
    color: grey;
    left: 0;
    right: 0 !important;
  }
  .react-tel-input .form-control {
    height: 100%;
    // color: grey;
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
  .react-datepicker-wrapper {
    width: 100%;
  }
  &[type="text"]::react-datepicker__input-container {
    @media (max-width: 1050px) {
      color: white;
    }
  }
`;

const HomeIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 50px;
  width: 35px;
  cursor: pointer;
  @media (max-width: 1050px) {
    display: none;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "1px solid #000"};
  outline: none;
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  @media (max-width: 1050px) {
    width: 100%;
    color: white;
    border-color: white;
    height: 60px;
    padding: 10px;
    &::placeholder {
      @media (max-width: 1050px) {
        color: #18365a;
      }
    }
  }
`;

export const Buttonn = styled.button`
  cursor: pointer;
  width: 70%;
  align-self: center;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d;
  margin-top: 20px;
  @media (max-width: 1050px) {
    color: #18365a;
    background-color: white;
    border: none;
    height: 60px;
    width: 60%;
    margin-bottom: 16px;
  }
`;
export const BTNn = styled.button`
  cursor: pointer;
  width: 100%;
  align-self: center;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d;
  margin-top: 20px;
  @media (max-width: 1050px) {
    color: white;
    background-color: #f37a1d;
    border: none;
    height: 60px;
    width: 100%;
    margin-bottom: 16px;
  }
`;
export const BTNb = styled.button`
  cursor: pointer;
  width: 100%;
  align-self: center;
  height: 45px;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  background-color: #f37a1d;
  margin-top: 20px;
  @media (max-width: 1050px) {
    color: #18365a;
    background-color: white;
    border: none;
    height: 60px;
    width: 40%;
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 10px;
  /* left:10px; */
  left: ${(props) => (props.right ? "120px" : "10px")};
  font-size: 13px;
  color: #999;
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  width: max-content;
  @media (max-width: 1050px) {
    color: white;
    background-color: #18365a;
  }
`;
const Labell = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 13px;
  color: #999;
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  /* width: max-content; */
  @media (max-width: 1050px) {
    color: white;
    background-color: #18365a;
    top: 10px;
    left: 12px;
  }
`;
export const DISP = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  @media (max-width: 1050px) {
    flex-wrap: wrap;
    gap: 0px;
  }
`;
const In = styled.input`
  width: 100%;
  height: 45px;
  font-size: 16px;
  padding: 10px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "1px solid #000"};
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;
  &::placeholder {
    font-size: 12px;
  }

  &[type="file"]::file-selector-button {
    border: none;
    background: #18365a;
    padding: 3px 7px;
    font-size: 13px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  &::file-selector-button:hover {
    background-color: #18365a;
  }
  @media (max-width: 1050px) {
    width: 100%;
    color: white;
    border-color: white;
    height: 60px;
    &::placeholder {
      @media (max-width: 1050px) {
        color: #18365a;
      }
    }
  }
  &,
  #mdp {
    padding-right: 15%;
    overflow: hidden;
    @media (max-width: 1050px) {
      padding-right: 20%;
    }
  }
`;

const Buttonnn = styled.button`
  width: 100%;
  height: 45px;
  font-size: 16px;
  padding: 10px;
  border: ${(props) =>
    props.errorBorder ? "1px solid #ff6961" : "1px solid #000"};
  background-color: transparent;
  border-radius: 8px;
  transition: border-bottom-color 0.3s;

  &[type="file"]::file-selector-button {
    border: none;
    background: #18365a;
    padding: 3px 7px;
    font-size: 13px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  &::file-selector-button:hover {
    background-color: #18365a;
  }
  @media (max-width: 1050px) {
    width: 100%;
    color: white;
    border-color: white;
    height: 60px;
    &::placeholder {
      @media (max-width: 1050px) {
        color: #18365a;
      }
    }
  }
`;
const IconContainer = styled.div`
  position: absolute;
  right: 10px; /* Adjust as needed */
  top: 16px;
  /* transform: translateY(-50%); */
  cursor: pointer;
  color: black;
  @media (max-width: 1050px) {
    color: white;
    top: 20px;
  }
`;
const Prénom = styled.label`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition: transform 0.3s, color 0.3s;
  transform: translateY(-100%) translateX(-10%) scale(0.75);
  color: #000;
  background-color: white;
  padding: 0px 12px;
  @media (max-width: 1050px) {
    color: white;
    background-color: #18365a;
  }
`;

// const test = {
//   username: null,
//   email: null,
//   user_role: "company",
//   phoneNumber: null,
//   accountOverview: [
//     {
//       __component: "section.company",
//       name: null,
//       activity: null,
//       category: null,
//       cinOwner: null,
//       ownerFirstName: null,
//       address: null,
//       region: null,
//       city: null,
//       postalCode: null,
//       kabis: null,
//       assurance_rc_pro: null,
//       numSiret: null,
//       logo: null,
//       kabis_picture: [],
//       assurance_rc_pro: [],
//       cin_recto_picture: null,
//       cin_verso_picture: null,
//       licence_de_transport_picture: null,
//       rib_picture: null,
//     },
//   ],
//   profile_picture: null,
//   validation: {
//     description: null,
//     validation_state: "waiting",
//   },
// };
