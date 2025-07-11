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
          placeholder={"Mark"}
        />
        {errors.car_mark && (
          <ErrorMessage>{errors.car_mark.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{"Mark"}</Label>
      </Container>
      <Container>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_model", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_model}
          placeholder={"Model"}
        />
        {errors.car_model && (
          <ErrorMessage>{errors.car_model.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{"Model"}</Label>
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
          placeholder={"Year"}
        />
        {errors.car_year && (
          <ErrorMessage>{errors.car_year.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{"Year"}</Label>
      </Container>
      <Container>
        <In
          right={i18n.language === "ar-AR"}
          type="text"
          {...register("car_color", {
            required: t("SINSCRIREpartenaire.validation.Required"),
          })}
          errorBorder={errors.car_color}
          placeholder={"Color"}
        />
        {errors.car_color && (
          <ErrorMessage>{errors.car_color.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{"Color"}</Label>
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
          placeholder={"Matriculation"}
        />
        {errors.car_matriculation && (
          <ErrorMessage>{errors.car_matriculation.message}</ErrorMessage>
        )}
        <Label right={i18n.language === "ar-AR"}>{"Matriculation"}</Label>
      </Container>
    </DISP>
    <div className="registerBtn">
      <button className="retourBtn" type="button" onClick={prevStep}>
        Retour
      </button>
      <Buttonn type="submit">{"Suivant"}</Buttonn>
    </div>
  </>
);

export default CarInfoStep; 