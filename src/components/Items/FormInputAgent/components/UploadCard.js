import React from "react";
import { CardContainer, LabelCard, CardImageWrapper, CardImage, Overlay, OverlayText } from "../styles";
import ErrorMessage from "../../../Form/ErrorMessage";
import { Upload } from "antd";

const UploadCard = ({
  label,
  picture,
  error,
  onUploadProps,
  placeholderText,
  placeholderImg
}) => (
  <CardContainer>
    <LabelCard>{label}</LabelCard>
    <Upload
      accept="image/*"
      showUploadList={false}
      {...onUploadProps}
    >
      <CardImageWrapper>
        {picture ? (
          <CardImage
            src={
              typeof picture === "object" && picture.url
                ? picture.url
                : picture instanceof File
                ? URL.createObjectURL(picture)
                : ""
            }
            alt={label}
          />
        ) : (
          <CardImage src={placeholderImg} alt={label} />
        )}
        <Overlay>
          <OverlayText>{placeholderText}</OverlayText>
        </Overlay>
      </CardImageWrapper>
    </Upload>
    {error && (
      <ErrorMessage>
        {placeholderText}
      </ErrorMessage>
    )}
  </CardContainer>
);

export default UploadCard; 