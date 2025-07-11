import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const statusSteps = [
  "Pending",
  "Go_to_pickup",
  "Arrived_at_pickup",
  "Picked_up",
  "Rate",
];

const getStatusConfig = (t) => ({
  Pending: {
    step: 0,
    title: t("ClientProfile.Commande.status.pending") || "Pending",
    description: t("ClientProfile.Commande.Message.pending") || "Order is pending and waiting to be processed.",
  },
  Go_to_pickup: {
    step: 1,
    title: t("ClientProfile.Commande.status.go_to_pickup") || "Go to Pickup",
    description: t("ClientProfile.Commande.Message.go_to_pickup") || "Driver is on the way to pickup location.",
  },
  Arrived_at_pickup: {
    step: 2,
    title: t("ClientProfile.Commande.status.arrived_at_pickup") || "Arrived at Pickup",
    description: t("ClientProfile.Commande.Message.arrived_at_pickup") || "Driver has arrived at the pickup location.",
  },
  Picked_up: {
    step: 3,
    title: t("ClientProfile.Commande.status.picked_up") || "Picked Up",
    description: t("ClientProfile.Commande.Message.picked_up") || "Order has been picked up.",
  },
  Completed: {
    step: 4,
    title: t("ClientProfile.Commande.status.completed") || "Completed",
    description: t("ClientProfile.Commande.Message.completed") || "Order is completed.",
  },
  Canceled_by_partner: {
    step: 0,
    title: t("ClientProfile.Commande.status.canceled_by_partner") || "Canceled by Partner",
    description: t("ClientProfile.Commande.Message.canceled_by_partner") || "Order was canceled by the partner.",
    isCanceled: true,
  },
  Canceled_by_client: {
    step: 0,
    title: t("ClientProfile.Commande.status.canceled_by_client") || "Canceled by Client",
    description: t("ClientProfile.Commande.Message.canceled_by_client") || "Order was canceled by the client.",
    isCanceled: true,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    padding: theme.spacing(3, 0),
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(24,54,90,0.08)",
    [theme.breakpoints.down(744)]: {
      padding: theme.spacing(2, 0),
      borderRadius: 10,
    },
  },
  stepper: {
    background: "transparent",
    padding: 0,
    [theme.breakpoints.down(744)]: {
      flexDirection: "column",
    },
  },
  stepLabel: {
    fontWeight: 700,
    fontSize: 18,
    color: "#18365a",
    [theme.breakpoints.down(744)]: {
      fontSize: 15,
    },
  },
  activeStep: {
    color: "#ff9800 !important",
    fontWeight: 700,
    '& .MuiStepIcon-root': {
      color: "#ff9800 !important",
      fontSize: 36,
    },
  },
  completedStep: {
    color: "#4caf50 !important",
    '& .MuiStepIcon-root': {
      color: "#4caf50 !important",
      fontSize: 32,
    },
  },
  inactiveStep: {
    color: "#bdbdbd !important",
    '& .MuiStepIcon-root': {
      color: "#bdbdbd !important",
      fontSize: 28,
    },
  },
  stepDescription: {
    marginTop: theme.spacing(1),
    color: "#666",
    textAlign: "center",
    fontSize: 16,
    [theme.breakpoints.down(744)]: {
      fontSize: 13,
    },
  },
  mobileStep: {
    display: "none",
    [theme.breakpoints.down(744)]: {
      display: "block",
      textAlign: "center",
      marginTop: theme.spacing(2),
    },
  },
  desktopStep: {
    display: "block",
    [theme.breakpoints.down(744)]: {
      display: "none",
    },
  },
}));

const OrderStatusStepper = ({ commandStatus, onRateClick, isRated }) => {
  console.log("isRated",isRated)
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const statusConfig = getStatusConfig(t);
  const statusInfo = statusConfig[commandStatus] || statusConfig.Go_to_pickup;
  // Update activeStep logic to mark all steps as completed if isRated is true
  const activeStep = isRated ? statusSteps.length : statusInfo.step;
  const isRTL = i18n.language === "ar-AR";
  const isCanceled = statusInfo.isCanceled;

  if (isCanceled) {
    // Custom stepper/message for canceled statuses
    return (
      <div className={classes.root} dir={isRTL ? "rtl" : "ltr"}>
        <Stepper activeStep={0} alternativeLabel className={classes.stepper}>
          <Step>
            <StepLabel
              StepIconProps={{ style: { color: "#f44336", fontSize: 36 } }}
              classes={{ label: classes.stepLabel, root: classes.activeStep }}
            >
              {statusInfo.title}
            </StepLabel>
          </Step>
        </Stepper>
        <Typography className={classes.stepDescription} style={{ color: "#f44336", fontWeight: 700 }}>
          {statusInfo.description}
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root} dir={isRTL ? "rtl" : "ltr"}>
      {/* Desktop Stepper */}
      <div className={classes.desktopStep}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {statusSteps.map((statusKey, idx) => {
            let labelClass = classes.inactiveStep;
            // Mark last step as completed if isRated is true
            if (isRated && idx === statusSteps.length - 1) {
              labelClass = classes.completedStep;
            } else if (idx < activeStep) {
              labelClass = classes.completedStep;
            } else if (idx === activeStep) {
              labelClass = classes.activeStep;
            }
            let isLast = idx === 4;
            return (
              <Step key={statusKey}>
                <StepLabel
                  classes={{ label: classes.stepLabel, root: labelClass }}
                  StepIconProps={{ style: { fontSize: 32, cursor: isLast && !isRated ? 'pointer' : 'default' } }}
                  onClick={isLast && !isRated ? onRateClick : undefined}
                  style={isLast && !isRated ? { cursor: 'pointer', color: '#d8b56c' } : {}}
                >
                  {isLast ? (isRated ? t("ClientProfile.Commande.status.completed") : t("ClientProfile.Commande.status.rate") || "Rate") : statusConfig[statusKey]?.title}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      {/* Mobile Stepper */}
      <div className={classes.mobileStep}>
        <Typography variant="h6" style={{ color: "#18365a", fontWeight: 700 }}>
          {statusInfo.title}
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {statusSteps.map((statusKey, idx) => {
            let iconColor = "#bdbdbd";
            // Mark last step as completed if isRated is true
            if (isRated && idx === statusSteps.length - 1) {
              iconColor = "#4caf50";
            } else if (idx < activeStep) {
              iconColor = "#4caf50";
            } else if (idx === activeStep) {
              iconColor = "#ff9800";
            }
            let isLast = idx === 4;
            return (
              <Step key={statusKey}>
                <StepLabel
                  StepIconProps={{ style: { color: iconColor, fontSize: 28, cursor: isLast && !isRated ? 'pointer' : 'default' } }}
                  onClick={isLast && !isRated ? onRateClick : undefined}
                  style={isLast && !isRated ? { cursor: 'pointer', color: '#d8b56c' } : {}}
                />
              </Step>
            );
          })}
        </Stepper>
        <Typography className={classes.stepDescription}>
          {statusInfo.description}
        </Typography>
        <Typography variant="caption" display="block" style={{ marginTop: 8, color: "#888" }}>
          {isRTL
            ? `الخطوة ${activeStep + 1} من ${statusSteps.length}`
            : `Step ${activeStep + 1} of ${statusSteps.length}`}
        </Typography>
      </div>
    </div>
  );
};

export default OrderStatusStepper;