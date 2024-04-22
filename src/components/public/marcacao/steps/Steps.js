import React, { useContext, useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { GiConfirmed, GiTennisCourt } from "react-icons/gi";
import {
  MdOutlineCalendarMonth,
  MdOutlineSportsBaseball,
} from "react-icons/md";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import "../../../../styles/public/steps.scss";

const Steps = ({ currentStep, changeStep }) => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);

  useEffect(() => {
    let stepCon = { ...marcacao };
    stepCon.num = marcacao?.step;
    changeStep(stepCon.num);
  }, [marcacao]);

  return (
    <div className="steps">
      <div className="step step-active">
        <p>Data</p>
        <MdOutlineCalendarMonth />{" "}
      </div>
      <div className={`step ${marcacao?.step >= 1 ? "step-active" : ""}`}>
        <p>Esporte</p>
        <MdOutlineSportsBaseball />
      </div>
      <div className={`step ${marcacao?.step >= 2 ? "step-active" : ""}`}>
        <p>Horário</p>
        <AiOutlineClockCircle />
      </div>
      <div className={`step ${marcacao?.step >= 3 ? "step-active" : ""}`}>
        <p>Quadra</p>
        <GiTennisCourt />
      </div>
      <div className={`step ${marcacao?.step >= 4 ? "step-active" : ""}`}>
        <p>Jogadores</p>
        <FaUserCog />
      </div>
      <div className={`step ${marcacao?.step >= 5 ? "step-active" : ""}`}>
        <p>Confirmar</p>
        <GiConfirmed />
      </div>
    </div>
  );
};

export default Steps;
