import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const getStatusConfig = (t) => ({
  Pending: {
    step: 0,
    title: t("ClientProfile.Commande.status.pending"),
    description: t("ClientProfile.Commande.Message.pending"),
  },
  Canceled_by_client: {
    step: 0,
    title: t("ClientProfile.Commande.status.canceled_by_client"),
    description: t("ClientProfile.Commande.Message.canceled_by_client"),
    isError: true
  },
  Dispatched_to_partner: {
    step: 1,
    title: t("ClientProfile.Commande.status.dispatched_to_partner"),
    description: t("ClientProfile.Commande.Message.dispatched_to_partner"),
  },
  Canceled_by_partner: {
    step: 1,
    title: t("ClientProfile.Commande.status.canceled_by_partner"),
    description: t("ClientProfile.Commande.Message.canceled_by_partner"),
    isError: true
  },
  Assigned_to_driver: {
    step: 2,
    title: t("ClientProfile.Commande.status.assigned_to_driver"),
    description: t("ClientProfile.Commande.Message.assigned_to_driver"),
  },
  Driver_on_route_to_pickup: {
    step: 3,
    title: t("ClientProfile.Commande.status.driver_on_route_to_pickup"),
    description: t("ClientProfile.Commande.Message.driver_on_route_to_pickup"),
  },
  Arrived_at_pickup: {
    step: 4,
    title: t("ClientProfile.Commande.status.arrived_at_pickup"),
    description: t("ClientProfile.Commande.Message.arrived_at_pickup"),
  },
  Picked_up: {
    step: 5,
    title: t("ClientProfile.Commande.status.picked_up"),
    description: t("ClientProfile.Commande.Message.picked_up"),
  },
  Failed_pickup: {
    step: 5,
    title: t("ClientProfile.Commande.status.failed_pickup"),
    // description: t("ClientProfile.Commande.Message.failed_pickup"),
    isError: true
  },
  On_route_to_delivery: {
    step: 6,
    title: t("ClientProfile.Commande.status.on_route_to_delivery"),
    description: t("ClientProfile.Commande.Message.on_route_to_delivery"),
  },
  Arrived_at_delivery: {
    step: 7,
    title: t("ClientProfile.Commande.status.arrived_at_delivery"),
    description: t("ClientProfile.Commande.Message.arrived_at_delivery"),
  },
  Delivered: {
    step: 8,
    title: t("ClientProfile.Commande.status.delivered"),
    description: t("ClientProfile.Commande.Message.delivered"),
  },
  Failed_delivery: {
    step: 8,
    title: t("ClientProfile.Commande.status.failed_delivery"),
    description: t("ClientProfile.Commande.Message.failed_delivery"),
    isError: true
  },
  Completed: {
    step: 9,
    title: t("ClientProfile.Commande.status.completed"),
    description: t("ClientProfile.Commande.Message.completed"),
  },
});

export const statusSteps = [
  "Pending",
  "Dispatched_to_partner",
  "Assigned_to_driver",
  "Driver_on_route_to_pickup",
  "Arrived_at_pickup",
  "Picked_up",
  "On_route_to_delivery",
  "Arrived_at_delivery",
  "Delivered",
  "Completed",
];

const errorStatuses = [
  "Canceled_by_client",
  "Canceled_by_partner",
  "Failed_pickup",
  "Failed_delivery"
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
    padding: theme.spacing(3, 0),
    [theme.breakpoints.down(1592)]: {
      width: "90%",
    },
  },
  fullStepper: {
    display: "block",
    [theme.breakpoints.down(1592)]: {
      display: "none",
    },
  },
  mobileStep: {
    display: "none",
    [theme.breakpoints.down(1592)]: {
      display: "block",
      textAlign: "center",
    },
  },
  activeStep: {
    color: "#18365a",
    fontWeight: "bold",
    "& .MuiStepIcon-root": {
      marginLeft: "7px",
      color: "#18365a",
    },
    "& .MuiStepIcon-text": {
      fill: theme.palette.common.white,
    },
    "& .MuiStepContent-root": { 
      borderLeftColor: theme.palette.common.white,
    },
  },
  completedStep: {
    color: "#ffc9a0",
    "& .MuiStepIcon-root": {
      marginLeft: "7px",
      color: "#ffc9a0",
    },
  },
  inactiveStep: {
    color: theme.palette.grey[500],
    "& .MuiStepIcon-root": {
      marginLeft: "7px",
      color: theme.palette.grey[300],
    },
  },
  errorStep: {
    color: theme.palette.error.main,
    "& .MuiStepIcon-root": {
      marginLeft: "7px",
      color: theme.palette.error.main,
    },
  },
  errorText: {
    color: theme.palette.error.main,
  },
  stepDescription: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  mobileStepLabel: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#18365a",
  },
  mobileStepDescription: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  rtlStepper: {
    direction: "rtl",
  },
}));

const OrderStatusStepper = ({ commandStatus }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const statusConfig = getStatusConfig(t);
  const statusInfo = statusConfig[commandStatus] || statusConfig.Pending;
  const activeStep = statusInfo.step;
  const isRTL = i18n.language === "ar-AR";
  const isErrorStatus = errorStatuses.includes(commandStatus);

  const getErrorStepPosition = () => {
    switch(commandStatus) {
      case "Canceled_by_client":
        return 0;
      case "Canceled_by_partner":
        return 1; 
      case "Failed_pickup":
        return 5; 
      case "Failed_delivery":
        return 8; 
      default:
        return -1;
    }
  };

  const errorStepPosition = getErrorStepPosition();

  return (
    <div className={classes.root} dir={isRTL ? "rtl" : "ltr"}>
      {/* Full stepper - shown on large screens */}
      <div className={`${classes.fullStepper} ${isRTL ? classes.rtlStepper : ""}`}>
        <Stepper
          activeStep={isErrorStatus ? errorStepPosition : activeStep}
          orientation="horizontal"
          className={isRTL ? classes.rtlStepper : ""}
        >
          {statusSteps.map((statusKey, index) => {
            const status = statusConfig[statusKey];
            const labelProps = {};
            let stepContent = null;

            if (isErrorStatus && index === errorStepPosition) {
              labelProps.className = classes.errorStep;
              labelProps.optional = (
                <Typography variant="caption" className={classes.errorText}>
                  {statusInfo.description}
                </Typography>
              );
              stepContent = (
                <StepContent style={{borderLeftColor:"transparent"}}>
                  <Typography className={`${classes.stepDescription} ${classes.errorText}`}>
                    {/* {statusInfo.description} */}
                  </Typography>
                </StepContent>
              );
            } else if (index < activeStep) {
              labelProps.className = classes.completedStep;
            } else if (index === activeStep) {
              labelProps.className = classes.activeStep;
              stepContent = (
                <StepContent style={{borderLeftColor:"transparent"}}>
                  <Typography className={classes.stepDescription}>
                    {statusInfo.description}
                  </Typography>
                </StepContent>
              );
            } else {
              labelProps.className = classes.inactiveStep;
            }

            return (
              <Step key={statusKey} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                <StepLabel style={{paddingLeft: 10, textAlign: "center", display: "flex", flexDirection: "column", gap:8}} {...labelProps}>
                  {isRTL ? getArabicLabel(
                    isErrorStatus && index === errorStepPosition 
                      ? statusInfo.title 
                      : status.title
                  ) : (
                    isErrorStatus && index === errorStepPosition 
                      ? statusInfo.title 
                      : status.title
                  )}
                </StepLabel>
                {stepContent}
              </Step>
            );
          })}
        </Stepper>
      </div>

      {/* Mobile view - shown only on small screens */}
      <div className={classes.mobileStep}>
        <Typography 
          variant="h6" 
          className={`${classes.mobileStepLabel} ${isErrorStatus ? classes.errorText : ""}`}
        >
          {isRTL ? getArabicLabel(statusInfo.title) : statusInfo.title}
        </Typography>
        <Typography 
          className={`${classes.mobileStepDescription} ${isErrorStatus ? classes.errorText : ""}`}
        >
          {statusInfo.description}
        </Typography>
        {!isErrorStatus && (
          <Typography variant="caption" display="block">
            {isRTL
              ? `الخطوة ${activeStep + 1} من ${statusSteps.length}`
              : `Step ${activeStep + 1} of ${statusSteps.length}`}
          </Typography>
        )}
      </div>
    </div>
  );
};

const getArabicLabel = (label) => {
  const arabicLabels = {
    "Order Received": "تم استلام الطلب",
    Processing: "قيد المعالجة",
    Dispatched: "تم الشحن",
    "In Transit": "قيد التوصيل",
    Delivered: "تم التسليم",
  };
  return arabicLabels[label] || label;
};

export default OrderStatusStepper;