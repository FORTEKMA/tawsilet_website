import axios from "axios";
import { message } from "antd";

export const initialDocumentState = {
  profile_picture: null,
  cin_recto_picture: null,
  cin_verso_picture: null,
  licence_front_picture: null,
  licence_back_picture: null,
  car_picture_front: null,
  car_picture_back: null,
  car_picture_left: null,
  car_picture_right: null,
  assurance_picture: null,
  gray_card_picture_front: null,
  gray_card_picture_back: null,
  assurance_date: null,
};

export const handleFileUpload = async (file, fieldName, setPictures, setPicturesErrors) => {
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

export const createUploadProps = (fieldName, setPictures, setPicturesErrors, onFileChange) => ({
  name: "file",
  multiple: false,
  beforeUpload: (file) => {
    handleFileUpload(file, fieldName, setPictures, setPicturesErrors);
    if (onFileChange) onFileChange(file);
    return false;
  },
  onRemove: () => {
    setPictures((prev) => ({ ...prev, [fieldName]: null }));
    setPicturesErrors((prev) => ({ ...prev, [fieldName]: true }));
  },
  showUploadList: false,
}); 