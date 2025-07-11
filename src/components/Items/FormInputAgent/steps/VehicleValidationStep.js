import React from "react";
import UploadCard from "../components/UploadCard";
import { CardGrid, DISP, Container, Label } from "../styles";
import { Buttonn } from "../styles";
import ErrorMessage from "../../../Form/ErrorMessage";
import DatePicker from "react-datepicker";
import assurancePlaceholder from '../../../../assets/images/assurancePictures.png';
import grayCardFrontPlaceholder from '../../../../assets/images/grayCardPictures.jpeg';
import grayCardBackPlaceholder from '../../../../assets/images/grayCardPicturesBack.jpg';
import { Spin } from "antd";

const VehicleValidationStep = ({ t, i18n, pictures, picturesErrors, setPictures, prevStep, createUploadProps, loading = false }) => (
  <>
    <CardGrid>
      <UploadCard
        label="Attestation d'assurance"
        picture={pictures.assurance_picture}
        error={picturesErrors.assurance_picture}
        onUploadProps={createUploadProps("assurance_picture")}
        placeholderText="Appuyez pour ajouter une photo"
        placeholderImg={assurancePlaceholder}
      />
      <UploadCard
        label="Carte grise (recto)"
        picture={pictures.gray_card_picture_front}
        error={picturesErrors.gray_card_picture_front}
        onUploadProps={createUploadProps("gray_card_picture_front")}
        placeholderText="Appuyez pour ajouter une photo"
        placeholderImg={grayCardFrontPlaceholder}
      />
      <UploadCard
        label="Carte grise (verso)"
        picture={pictures.gray_card_picture_back}
        error={picturesErrors.gray_card_picture_back}
        onUploadProps={createUploadProps("gray_card_picture_back")}
        placeholderText="Appuyez pour ajouter une photo"
        placeholderImg={grayCardBackPlaceholder}
      />
    </CardGrid>
    <DISP>
      <Container>
        <DatePicker
          locale="fr"
          className="In"
          placeholderText={t("SINSCRIREpartenaire.FormInput.Date expiration assurance rc pro")}
          selected={pictures.assurance_date}
          onChange={(date) => setPictures({ ...pictures, assurance_date: date })}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
        {picturesErrors.assurance_date && (
          <ErrorMessage>
            {t("SINSCRIREpartenaire.FormInput.Obligatoire")}
          </ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>
          {t("SINSCRIREpartenaire.FormInput.Date expiration assurance rc pro")}
        </Label>
      </Container>
    </DISP>
    <div className="registerBtn" style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
      <button
        className="retourBtn"
        type="button"
        onClick={prevStep}
        style={{
          padding: '8px 24px',
          borderRadius: 6,
          border: '1px solid #d9d9d9',
          background: '#fff',
          color: '#333',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {t("SINSCRIREpartenaire.FormInput.Retour") || 'Retour'}
      </button>
      <Buttonn
        type="submit"
        style={{
          padding: '8px 32px',
          borderRadius: 6,
          background: '#0c0c0c',
          color: '#fff',
          fontWeight: 600,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 120,
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? <Spin size="small" style={{ color: '#fff' }} /> : t("SINSCRIREpartenaire.FormInput.Inscrire")}
      </Buttonn>
    </div>
  </>
);

export default VehicleValidationStep; 