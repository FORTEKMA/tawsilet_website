import { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFileUpload } from "../../hooks/useFileUpload";
import { UploadField } from "./UploadField";
import { FormStep } from "./FormStep";
import homeIcon from "../../assets/icons/homeicon.svg";

import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import styled from "styled-components";
import { useNavigate } from "react-router";

registerLocale("fr", fr);

const FORM_CONFIG = {
  organization: [
    // Step 1 Fields
    {
      name: "name",
      type: "text",
      label: "Nom de l'entreprise",
      rules: { required: "Nom de l'entreprise est requis" },
    },
    {
      name: "nameOwner",
      type: "text",
      label: "Nom du propriétaire",
      rules: { required: "Nom du propriétaire est requis" },
    },
    {
      name: "phoneNumber",
      type: "phone",
      label: "Numéro de téléphone",
      rules: {
        required: "Numéro de téléphone est requis",
        minLength: { value: 7, message: "Numéro invalide" },
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      rules: {
        required: "Email est requis",
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Email invalide",
        },
      },
    },
    {
      name: "password",
      type: "password",
      label: "Mot de passe",
      rules: {
        required: "Mot de passe est requis",
        pattern: {
          value:
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-|]{8,}$/,
          message: "8+ caractères avec lettre et chiffre",
        },
      },
    },
    {
      name: "confirm_password",
      type: "password",
      label: "Confirmer le mot de passe",
      rules: {
        validate: (value) =>
          value === watch("password") ||
          "Les mots de passe ne correspondent pas",
      },
    },

    // Step 2 Fields
    {
      name: "address",
      type: "text",
      label: "Adresse",
      step: 2,
      rules: { required: "Adresse est requise" },
    },
    {
      name: "postalCode",
      type: "text",
      label: "Code postal",
      step: 2,
      rules: { required: "Code postal est requis" },
    },
    {
      name: "city",
      type: "text",
      label: "Ville",
      step: 2,
      rules: { required: "Ville est requise" },
    },
    {
      name: "region",
      type: "text",
      label: "Région",
      step: 2,
      rules: { required: "Région est requise" },
    },
    {
      name: "assurance_rc_pro_date",
      type: "date",
      label: "Date expiration assurance rc pro",
      step: 2,
      rules: { required: "Date d'expiration est requise" },
    },
    {
      name: "licence_de_transport_date",
      type: "date",
      label: "Date expiration licence de transport",
      step: 2,
      rules: { required: "Date d'expiration est requise" },
    },
  ],

  individual: [
    // Step 1 Fields
    {
      name: "name",
      type: "text",
      label: "Nom",
      rules: { required: "Nom est requis" },
    },
    {
      name: "nameOwner",
      type: "text",
      label: "Prénom",
      rules: { required: "Prénom est requis" },
    },
    // ... same common fields as organization

    // Step 2 Fields
    {
      name: "address",
      type: "text",
      label: "Adresse",
      step: 2,
      rules: { required: "Adresse est requise" },
    },
    // ... same address fields as organization
  ],
};

const UPLOAD_FIELDS = {
  organization: [
    { field: "cin_recto_picture", label: "Pièce d'identité recto" },
    { field: "cin_verso_picture", label: "Pièce d'identité Verso" },
    { field: "kabis_picture", label: "Extrait du Registre de Commerce" },
    {
      field: "assurance_rc_pro_picture",
      label: "Attestation d'assurance RC Pro",
    },
    { field: "urssaf", label: "Attestation CNSS" },
    { field: "attestation_fiscale", label: "Attestation fiscale" },
    { field: "licence_de_transport_picture", label: "Licence de transport" },
    { field: "rib_picture", label: "RIB Société" },
  ],

  individual: [
    { field: "cin_recto_picture", label: "Pièce d'identité recto" },
    { field: "cin_verso_picture", label: "Pièce d'identité Verso" },
    { field: "assurance_rc_pro_picture", label: "Assurance RC Pro" },
    { field: "urssaf", label: "Attestation CNSS" },
    { field: "attestation_fiscale", label: "Attestation fiscale personnelle" },
    {
      field: "licence_de_transport_picture",
      label: "Carte professionnelle de transport",
    },
    { field: "rib_picture", label: "RIB" },
  ],
};

const FormInputAgentFuture = ({ setLoading }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formType, setFormType] = useState("organization");
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validatePasswordVisible, setValidatePasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const { pictures, errors: uploadErrors, handleUpload } = useFileUpload();

  // Form type handlers
  const switchToOrganization = () => setFormType("organization");
  const switchToIndividual = () => setFormType("individual");

  // Password visibility toggle
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setValidatePasswordVisible(!validatePasswordVisible);

  const onSubmit = async (data) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    const formData = {
      ...data,
      user_role: formType,
      documents: pictures,
      validation: { validation_state: "waiting" },
    };

    try {
      setLoading(true);
      // Your submission logic here
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    return FORM_CONFIG[formType]
      .filter((field) => field.step === step)
      .map((field) => {
        if (field.type === "phone") {
          return (
            <Container key={field.name} phoneborder={errors[field.name]}>
              <Controller
                name={field.name}
                control={control}
                rules={field.rules}
                render={({ field: { onChange } }) => (
                  <PhoneInput
                    country="tn"
                    enableSearch={true}
                    preferredCountries={["tn", "ae", "fr"]}
                    excludeCountries={["il"]}
                    defaultMask={".. ... ..."}
                    inputStyle={{
                      width: "100%",
                      textAlign: "left",
                      direction: "ltr",
                      height: 45,
                      paddingLeft: 55,
                      borderColor: errors[field.name] ? "red" : "#000",
                    }}
                    onChange={onChange}
                  />
                )}
              />
              {errors[field.name] && (
                <ErrorMessage>{field.rules.required}</ErrorMessage>
              )}
              <Label right={i18n.language === "ar-AR"}>{field.label}</Label>
            </Container>
          );
        }

        return (
          <Container key={field.name}>
            <In
              {...register(field.name, field.rules)}
              type={
                field.type === "password"
                  ? passwordVisible
                    ? "text"
                    : "password"
                  : field.type
              }
              errorBorder={errors[field.name]}
              placeholder={field.label}
            />
            {field.type === "password" && (
              <IconContainer onClick={togglePasswordVisibility}>
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </IconContainer>
            )}
            {errors[field.name] && (
              <ErrorMessage>{errors[field.name].message}</ErrorMessage>
            )}
            <Label right={i18n.language === "ar-AR"}>{field.label}</Label>
          </Container>
        );
      });
  };

  return (
    <AppContainer>
      <FormSwitcher>
        <SwitchButton
          active={formType === "organization"}
          onClick={switchToOrganization}
          disabled={step !== 1}
        >
          {t("SINSCRIREpartenaire.FormInput.organisation")}
        </SwitchButton>
        <SwitchButton
          active={formType === "individual"}
          onClick={switchToIndividual}
          disabled={step !== 1}
        >
          {t("SINSCRIREpartenaire.FormInput.indiv")}
        </SwitchButton>
      </FormSwitcher>

      <FormContainer>
        <HomeIcon src={homeIcon} onClick={() => navigate("/")} alt="homeicon" />

        <Formulaire onSubmit={handleSubmit(onSubmit)}>
          <DISP>{renderFormFields()}</DISP>

          {step === 2 && (
            <>
              <DISP>
                {UPLOAD_FIELDS[formType]?.map((upload) => (
                  <Container key={upload?.field}>
                    <Upload
                      fileList={
                        pictures[upload?.field]
                          ? [{ uid: 1, name: pictures[upload?.field].name }]
                          : []
                      }
                      beforeUpload={(file) => handleUpload(upload?.field)(file)}
                      onRemove={() => handleUpload(upload?.field)(null)}
                    >
                      <Button icon={<UploadOutlined />}>Télécharger</Button>
                    </Upload>
                    {uploadErrors[upload.field] && (
                      <ErrorMessage>Image obligatoire</ErrorMessage>
                    )}
                    <Label right={i18n.language === "ar-AR"}>
                      {upload.label}
                    </Label>
                  </Container>
                ))}
              </DISP>

              <DISP>
                <Container>
                  <DatePicker
                    selected={pictures.assurance_rc_pro_date}
                    onChange={(date) =>
                      handleUpload("assurance_rc_pro_date")(date)
                    }
                    minDate={new Date()}
                    className="In"
                  />
                  <Label>Date expiration assurance rc pro</Label>
                </Container>
                {/* Add other date pickers similarly */}
              </DISP>
            </>
          )}

          <div className="registerBtn">
            {step === 2 && (
              <button type="button" onClick={() => setStep(1)}>
                Retour
              </button>
            )}
            <Buttonn type="submit">
              {step === 1
                ? "Suivant"
                : t("SINSCRIREpartenaire.FormInput.Inscrire")}
            </Buttonn>
          </div>
        </Formulaire>
      </FormContainer>
    </AppContainer>
  );
};

export default FormInputAgentFuture;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
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
  /* display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  @media (max-width: 1050px) {
    margin-top: 5%;
    width: 95%;
  } */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
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
    @media (max-width: 1050px) {
      height: 60px !important;
    }
    &::placeholder {
      font-size: 12px;
    }
  }

  .ant-upload-wrapper {
    width: 100%;
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
    color: #18365a;
    background-color: white;
    border: none;
    height: 60px;
    width: 100%;
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
//       nameOwner: null,
//       address: null,
//       region: null,
//       city: null,
//       postalCode: null,
//       kabis: null,
//       assurance_rc_pro: null,
//       numSiret: null,
//       logo: null,
//       kabis_picture: [],
//       assurance_rc_pro_picture: [],
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
