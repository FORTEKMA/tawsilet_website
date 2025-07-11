import React, { useState } from "react";
import { ProfilePicWrapper, ProfileCircle, UserIcon } from "../styles";
import ErrorMessage from "../../../Form/ErrorMessage";
import Upload from "antd/es/upload";

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #d8b56c',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

const ProfilePicUploader = ({ pictures, picturesErrors, createUploadProps, t, onChange }) => {
  const [loading, setLoading] = useState(false);

  // Custom upload props
  const uploadProps = createUploadProps(
    "profile_picture",
    (file) => {
      if (onChange) onChange(file);
    }
  );

  // Add onChange to manage loader
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    } else if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      setLoading(false);
    }
  };

  return (
    <ProfilePicWrapper>
      {/* Inject spinner keyframes only once */}
      <style>{spinnerKeyframes}</style>
      <Upload
        accept="image/*"
        showUploadList={false}
        {...uploadProps}
        onChange={handleChange}
      >
        <ProfileCircle style={{ cursor: 'pointer', position: 'relative' }}>
          {loading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
            }}>
              <div style={spinnerStyle}></div>
            </div>
          )}
          {pictures.profile_picture ? (
            <img
              src={typeof pictures.profile_picture === 'object' && pictures.profile_picture.url ? pictures.profile_picture.url : pictures.profile_picture instanceof File ? URL.createObjectURL(pictures.profile_picture) : ''}
              alt="profile"
              className="profile-img"
              style={{ opacity: loading ? 0.5 : 1 }}
            />
          ) : (
            <UserIcon viewBox="0 0 32 32">
              <circle cx="16" cy="12" r="6" fill="#111" />
              <rect x="7" y="22" width="18" height="7" rx="9" fill="#111" />
            </UserIcon>
          )}
        </ProfileCircle>
      </Upload>
      {picturesErrors.profile_picture && (
        <ErrorMessage>
          {t("SINSCRIREpartenaire.FormInput.Image obligatoire")}
        </ErrorMessage>
      )}
    </ProfilePicWrapper>
  );
};

export default ProfilePicUploader; 