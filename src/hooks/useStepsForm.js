import { useEffect, useState } from "react";

const useStepsForm = (steps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    console.log("currentStep", currentStep);
  }, [currentStep]);

  // useEffect(() => {
  //   console.log("steps.length", steps.length);
  // }, []);

  const changeStep = (i, e) => {
    if (e) e.preventDefault();
    if (i < 0 || i >= steps.length) return;
    setCurrentStep(i);
  };

  return {
    currentStep,
    currentComponent: steps[currentStep],
    changeStep,
    isFirstStep: currentStep === 0 ? true : false,
    isLastStep: currentStep + 1 === steps.length ? true : false,
  };
};

export default useStepsForm;
