import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const UploadField = ({
  field,
  label,
  fileList,
  onUpload,
  onRemove,
  error,
  required
}) => {
  const props = {
    accept: 'image/png, image/jpeg',
    multiple: false,
    beforeUpload: (file) => {
      onUpload(file);
      return false;
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} upload failed`);
      }
    },
    onRemove: () => onRemove(),
    fileList: fileList ? [{ uid: 1, name: fileList.name }] : []
  };

  return (
    <div className="upload-field">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Télécharger</Button>
      </Upload>
      {error && <span className="error">Image obligatoire</span>}
      <label>{label}{required && '*'}</label>
    </div>
  );
};