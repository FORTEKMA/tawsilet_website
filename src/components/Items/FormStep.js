import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";

export const FormStep = ({
  step,
  control,
  errors,
  fields,
  phoneProps,
  dateProps,
}) => {
  const renderField = (field) => {
    switch (field.type) {
      case "phone":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field: { onChange } }) => (
              <PhoneInput
                enableSearch={true}
                preferredCountries={["tn", "ae", "fr"]}
                excludeCountries={["il"]}
                defaultMask={".. ... ..."}
                {...phoneProps}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        );

      case "date":
        return (
          <DatePicker
            {...dateProps}
            selected={dateProps?.selected}
            onChange={dateProps?.onChange}
          />
        );

      default:
        return (
          <Controller
            name={field.name}
            control={control}
            rules={field.rules}
            render={({ field }) => (
              <input
                {...field}
                type={field.type || "text"}
                placeholder={field.placeholder}
              />
            )}
          />
        );
    }
  };

  return (
    <div className={`form-step step-${step}`}>
      {fields.map((fieldConfig) => (
        <div key={fieldConfig.name} className="form-field">
          {renderField(fieldConfig)}
          {errors[fieldConfig.name] && (
            <span className="error">{errors[fieldConfig.name].message}</span>
          )}
          <label>{fieldConfig.label}</label>
        </div>
      ))}
    </div>
  );
};
