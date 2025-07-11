import React, { useState } from "react";
// import backgroundImage from "./../../assets/images/block.png";
import StepperLayout, { Stepper } from "../../components/Navigation/Stepper";
import Step2 from "../DashClient/AddCommand/Step2";
import Step3 from "../DashClient/AddCommand/Step3";
import Step4 from "../DashClient/AddCommand/Step4";

import Step1 from "../DashClient/AddCommand/Step1";
import Step5 from "../DashClient/AddCommand/Step5";

import { useLocation } from "react-router";
const GetEstimate = ({ setLoading, setPing, ping }) => {
  const location = useLocation();
  // console.log(location.state);
  const preData = location.state?.data;
  const preStep = location.state?.step;
  const [step, setStep] = useState(preStep || 1);

  const [command, setCommand] = useState({
    data: {
      departDate: "",
      payType: null,

      totalPrice: null,
      distance: null,
      deparTime: "",
      SpecificNote: "",
      duration: "",
      pickUpAddress: {
        Address: "",
        coordonne: {
          latitude: null,
          longitude: null,
        },
      },
      dropOfAddress: {
        Address: "",
        coordonne: {
          latitude: null,
          longitude: null,
        },
      },
      items: [],
      client: null,
      TansportType: {
        Type: "",
        Quantity: 1,
      },
      dropAcces: {
        options: "Monter",
        floor: 0,
      },
      pickUpAcces: {
        options: "",
        floor: 0,
      },
    },
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };
  // console.log(command);
  return (
    <div>

      <StepperLayout step={step}>
        {/* <h1><button onClick={()=>setStep(2)}>next</button></h1> */}

        <Step1 setStep={setStep} command={command} setCommand={setCommand} />
        <Step2 setStep={setStep} command={command} setCommand={setCommand} />
        <Step3 setStep={setStep} command={command} setCommand={setCommand} />
        <Step4
          setStep={setStep}
          command={command}
          setCommand={setCommand}
          setLoading={setLoading}
          setPing={setPing}
          ping={ping}
        />
        <Step5 setStep={setStep} command={command} setCommand={setCommand} />
      </StepperLayout>
      {/* <EstimateStep1 /> */}
      {/* <Stepper /> */}
    </div>
  );
};
export default GetEstimate;
