import React from "react";
import { DISP, Container, In, Label } from "../styles";
import ErrorMessage from "../../../Form/ErrorMessage";
import { Buttonn } from "../styles";

const CarInfoStep = ({ t, i18n, register, errors, prevStep }) => (
  <>
    <DISP>
      <Container>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_mark", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_mark}
          placeholder={t("FormInputAgent.carInfo.mark")}
        />
        {errors.car_mark && (
          <ErrorMessage>{errors.car_mark.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{t("FormInputAgent.carInfo.mark")}</Label>
      </Container>
      <Container>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_model", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_model}
          placeholder={t("FormInputAgent.carInfo.model")}
        />
        {errors.car_model && (
          <ErrorMessage>{errors.car_model.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{t("FormInputAgent.carInfo.model")}</Label>
      </Container>
    </DISP>
    <DISP>
      <Container>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_year", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_year}
          placeholder={t("FormInputAgent.carInfo.year")}
        />
        {errors.car_year && (
          <ErrorMessage>{errors.car_year.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{t("FormInputAgent.carInfo.year")}</Label>
      </Container>
      <Container>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_color", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_color}
          placeholder={t("FormInputAgent.carInfo.color")}
        />
        {errors.car_color && (
          <ErrorMessage>{errors.car_color.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{t("FormInputAgent.carInfo.color")}</Label>
      </Container>
    </DISP>
    <DISP>
      <Container full={true}>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_matriculation", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_matriculation}
          placeholder={t("FormInputAgent.carInfo.matriculation")}
        />
        {errors.car_matriculation && (
          <ErrorMessage>{errors.car_matriculation.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{t("FormInputAgent.carInfo.matriculation")}</Label>
      </Container>
    </DISP>
    <div className="registerBtn">
      <button className="retourBtn" type="button" onClick={prevStep}>
        {t("FormInputAgent.buttons.back")}
      </button>
      <Buttonn type="submit">{t("FormInputAgent.buttons.next")}</Buttonn>
    </div>
  </>
);

export default CarInfoStep; 