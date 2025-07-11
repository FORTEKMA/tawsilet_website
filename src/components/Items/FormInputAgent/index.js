// Main entry for FormInputAgent decomposed version
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { message, Modal } from "antd";

// Steps
import BasicInfoStep from "./steps/BasicInfoStep";
import ContactInfoStep from "./steps/ContactInfoStep";
import CarInfoStep from "./steps/CarInfoStep";
import VehiclePicturesStep from "./steps/VehiclePicturesStep";
import VehicleValidationStep from "./steps/VehicleValidationStep";

// UI Components
import Stepper from "./components/Stepper";

// Helpers
import { createUploadProps, initialDocumentState } from "./helpers/uploadHelpers";

// Styles
import { AppContainer, FormContainer, Formulaire } from "./styles";

const FormInputAgent = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validatePasswordVisible, setValidatePasswordVisible] = useState(false);

  // Document state management
  const [pictures, setPictures] = useState(initialDocumentState);
  const [picturesErrors, setPicturesErrors] = useState(
    Object.keys(initialDocumentState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Step navigation
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // Submit handler
  const onSubmit = async (data) => {
    if (currentStep < 5) {
      nextStep();
      return;
    }

    // Validate required documents
    const requiredDocuments = [
      "profile_picture",
      "cin_recto_picture",
      "cin_verso_picture",
      "licence_front_picture",
      "licence_back_picture",
      "car_picture_front",
      "car_picture_back",
      "car_picture_left",
      "car_picture_right",
      "assurance_picture",
      "gray_card_picture_front",
      "gray_card_picture_back",
    ];
    const documentErrors = requiredDocuments.reduce((acc, field) => {
      acc[field] = !pictures[field];
      return acc;
    }, {});
    const dateErrors = {
      assurance_date: !pictures.assurance_date,
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
      // 1. Prepare car payload
      const carPayload = {
        mark: data.car_mark , // Car brand
        model: data.car_model, // Car model
        year: data.car_year, // Year of manufacture
        color: data.car_color, // Car color
        matriculation: data.car_matriculation, // License plate
        assuranceDate: pictures.assurance_date?.toISOString().split("T")[0], // Insurance expiration date
        assurancePictures: pictures.assurance_picture?.id, // ID of uploaded insurance image
        grayCardPictures: pictures.gray_card_picture_front?.id, // ID of uploaded gray card image (front)
        grayCardPictureBack: pictures.gray_card_picture_back?.id, // ID of uploaded gray card image (back)
        vehiculePictureface1: pictures.car_picture_front?.id, // ID of uploaded vehicle image (front)
        vehiculePictureface2: pictures.car_picture_back?.id, // ID of uploaded vehicle image (back)
        vehiculePictureface3: pictures.car_picture_left?.id, // ID of uploaded vehicle image (left)
        vehiculePictureface4: pictures.car_picture_right?.id, // ID of uploaded vehicle image (right)
      };

     

      // 2. Create car
      const carRes = await fetch(`${process.env.REACT_APP_BASE_URL}/vehicules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data:carPayload}),
      });
      const carResult = await carRes.json();
      if (!carRes.ok) throw new Error(carResult?.error?.message || "Car creation failed");

      const carId = carResult.data.id;

      // 3. Prepare user payload
      const userPayload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phoneNumber: "+"+data.phoneNumber,
        user_role: "driver",
        region: data.region,
        cinFront: pictures.cin_recto_picture?.id, // ID of uploaded CIN front image
        cinBack: pictures.cin_verso_picture?.id, // ID of uploaded CIN back image
        licenceFront: pictures.licence_front_picture?.id, // ID of uploaded license front image
        licenceBack: pictures.licence_back_picture?.id, // ID of uploaded license back image
        isFree: false,
        pro: true,
        vehicule: { id: carId },
        vehicules: [{ id: carId }],
      };

      // 4. Register user
      const userRes = await fetch(`${process.env.REACT_APP_DOMAIN_URL}/register/driver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });
      const userResult = await userRes.json();
      if (!userRes.ok) throw new Error(userResult?.error?.message || "User registration failed");

      message.success(t("registration_success_short"));
      setSuccessModalVisible(true);
      // window.location.replace(process.env.REACT_APP_DASH_URL);
    } catch (error) {
      message.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Stepper titles
  const steps = [
    { title: "Account Information" },
    { title: "Contact Information" },
    { title: "Car Information" },
    { title: "Vehicle Pictures" },
    { title: "Vehicle Validation" },
  ];

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            t={t}
            i18n={i18n}
            register={register}
            control={control}
            errors={errors}
            getValues={getValues}
            pictures={pictures}
            picturesErrors={picturesErrors}
            setPasswordVisible={setPasswordVisible}
            passwordVisible={passwordVisible}
            setValidatePasswordVisible={setValidatePasswordVisible}
            validatePasswordVisible={validatePasswordVisible}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setPictures={setPictures}
            setPicturesErrors={setPicturesErrors}
            createUploadProps={(field) => createUploadProps(field, setPictures, setPicturesErrors)}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            pictures={pictures}
            picturesErrors={picturesErrors}
            createUploadProps={(field) => createUploadProps(field, setPictures, setPicturesErrors)}
            prevStep={prevStep}
            setPicturesErrors={setPicturesErrors}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <CarInfoStep
            t={t}
            i18n={i18n}
            register={register}
            errors={errors}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <VehiclePicturesStep
            pictures={pictures}
            picturesErrors={picturesErrors}
            createUploadProps={(field) => createUploadProps(field, setPictures, setPicturesErrors)}
            prevStep={prevStep}
            setPicturesErrors={setPicturesErrors}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <VehicleValidationStep
            t={t}
            i18n={i18n}
            pictures={pictures}
            picturesErrors={picturesErrors}
            setPictures={setPictures}
            prevStep={prevStep}
            createUploadProps={(field) => createUploadProps(field, setPictures, setPicturesErrors)}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <AppContainer >
      <Stepper steps={steps} currentStep={currentStep} />
      <FormContainer>
        {/* Home icon and navigation can be added here if needed */}
        <Formulaire dir="auto" right={i18n.language === "ar-AR"} onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}
        </Formulaire>
        <Modal
          open={successModalVisible}
          onCancel={() => setSuccessModalVisible(false)}
          footer={null}
          centered
          closable={false}
        >
          <div style={{ textAlign: 'center' }}>
            <h2>{t("registration_success_title")}</h2>
            <p>{t("registration_success_message")}</p>
            <button
              style={{
                marginTop: 16,
                background: '#0c0c0c',
                color: '#fff',
                borderRadius: 6,
                padding: '8px 32px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                transition: 'background 0.2s',
              }}
              onClick={() => {
                setSuccessModalVisible(false);
                navigate("/");
              }}
            >
              {t("go_home")}
            </button>
          </div>
        </Modal>
      </FormContainer>
    </AppContainer>
  );
};

export default FormInputAgent;