import React from "react";
import UploadCard from "../components/UploadCard";
import { CardGrid } from "../styles";
import { Buttonn } from "../styles";
import cinFrontPlaceholder from '../../../../assets/images/cin_front_placeholder.jpg';
import cinBackPlaceholder from '../../../../assets/images/cin_back_placeholder.jpg';
import licenceFrontPlaceholder from '../../../../assets/images/licence_front_placeholder.jpeg';
import licenceBackPlaceholder from '../../../../assets/images/licence_back_placeholder.jpeg';
import ErrorMessage from '../../../Form/ErrorMessage';

const REQUIRED_FIELDS = [
  "cin_recto_picture",
  "cin_verso_picture",
  "licence_front_picture",
  "licence_back_picture",
];

const ContactInfoStep = ({ t, pictures, picturesErrors, createUploadProps, prevStep, setPicturesErrors, nextStep }) => {
  const [localError, setLocalError] = React.useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    // Validate all required images
    const errors = {};
    let hasError = false;
    REQUIRED_FIELDS.forEach((field) => {
      if (!pictures[field]) {
        errors[field] = true;
        hasError = true;
      } else {
        errors[field] = false;
      }
    });
    setPicturesErrors((prev) => ({ ...prev, ...errors }));
    setLocalError(hasError);
    if (!hasError && nextStep) {
      nextStep();
    }
  };

  return (
    <>
      <CardGrid>
        <UploadCard
          label={t("FormInputAgent.contactInfo.cinFront")}
          picture={pictures.cin_recto_picture}
          error={picturesErrors.cin_recto_picture}
          onUploadProps={createUploadProps("cin_recto_picture")}
          placeholderText={t("FormInputAgent.contactInfo.uploadPhoto")}
          placeholderImg={cinFrontPlaceholder}
          style={{ width: 220, height: 170 }}
        />
        <UploadCard
          label={t("FormInputAgent.contactInfo.cinBack")}
          picture={pictures.cin_verso_picture}
          error={picturesErrors.cin_verso_picture}
          onUploadProps={createUploadProps("cin_verso_picture")}
          placeholderText={t("FormInputAgent.contactInfo.uploadPhoto")}
          placeholderImg={cinBackPlaceholder}
          style={{ width: 220, height: 170 }}
        />
        <UploadCard
          label={t("FormInputAgent.contactInfo.licenseFront")}
          picture={pictures.licence_front_picture}
          error={picturesErrors.licence_front_picture}
          onUploadProps={createUploadProps("licence_front_picture")}
          placeholderText={t("FormInputAgent.contactInfo.uploadPhoto")}
          placeholderImg={licenceFrontPlaceholder}
          style={{ width: 220, height: 170 }}
        />
        <UploadCard
          label={t("FormInputAgent.contactInfo.licenseBack")}
          picture={pictures.licence_back_picture}
          error={picturesErrors.licence_back_picture}
          onUploadProps={createUploadProps("licence_back_picture")}
          placeholderText={t("FormInputAgent.contactInfo.uploadPhoto")}
          placeholderImg={licenceBackPlaceholder}
          style={{ width: 220, height: 170 }}
        />
      </CardGrid>
      {localError && (
        <ErrorMessage>{t("FormInputAgent.messages.uploadAllRequiredImages")}</ErrorMessage>
      )}
      <div className="registerBtn">
        <button className="retourBtn" type="button" onClick={prevStep}>
          {t("FormInputAgent.buttons.back")}
        </button>
        <Buttonn type="button" onClick={handleNext}>{t("FormInputAgent.buttons.next")}</Buttonn>
      </div>
    </>
  );
};

export default ContactInfoStep; 