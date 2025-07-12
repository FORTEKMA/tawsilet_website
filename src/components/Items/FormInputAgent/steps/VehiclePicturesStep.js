import React, { useState } from "react";
import UploadCard from "../components/UploadCard";
import { CardGrid } from "../styles";
import { Buttonn } from "../styles";
import ErrorMessage from '../../../Form/ErrorMessage';
import carFrontPlaceholder from '../../../../assets/images/front.png';
import carBackPlaceholder from '../../../../assets/images/back.png';
import carLeftPlaceholder from '../../../../assets/images/left.png';
import carRightPlaceholder from '../../../../assets/images/right.png';

const REQUIRED_FIELDS = [
  "car_picture_front",
  "car_picture_back",
  "car_picture_left",
  "car_picture_right",
];

const VehiclePicturesStep = ({ t, pictures, picturesErrors, createUploadProps, prevStep, setPicturesErrors, nextStep }) => {
  const [localError, setLocalError] = useState(false);

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
    if (setPicturesErrors) setPicturesErrors((prev) => ({ ...prev, ...errors }));
    setLocalError(hasError);
    if (!hasError && nextStep) {
      nextStep();
    }
  };

  return (
    <>
      <CardGrid>
        <UploadCard
          label={t("FormInputAgent.vehiclePictures.frontPhoto")}
          picture={pictures.car_picture_front}
          error={picturesErrors.car_picture_front}
          onUploadProps={createUploadProps("car_picture_front")}
          placeholderText={t("FormInputAgent.vehiclePictures.uploadPhoto")}
          placeholderImg={carFrontPlaceholder}
        />
        <UploadCard
          label={t("FormInputAgent.vehiclePictures.backPhoto")}
          picture={pictures.car_picture_back}
          error={picturesErrors.car_picture_back}
          onUploadProps={createUploadProps("car_picture_back")}
          placeholderText={t("FormInputAgent.vehiclePictures.uploadPhoto")}
          placeholderImg={carBackPlaceholder}
        />
        <UploadCard
          label={t("FormInputAgent.vehiclePictures.leftPhoto")}
          picture={pictures.car_picture_left}
          error={picturesErrors.car_picture_left}
          onUploadProps={createUploadProps("car_picture_left")}
          placeholderText={t("FormInputAgent.vehiclePictures.uploadPhoto")}
          placeholderImg={carLeftPlaceholder}
        />
        <UploadCard
          label={t("FormInputAgent.vehiclePictures.rightPhoto")}
          picture={pictures.car_picture_right}
          error={picturesErrors.car_picture_right}
          onUploadProps={createUploadProps("car_picture_right")}
          placeholderText={t("FormInputAgent.vehiclePictures.uploadPhoto")}
          placeholderImg={carRightPlaceholder}
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

export default VehiclePicturesStep; 