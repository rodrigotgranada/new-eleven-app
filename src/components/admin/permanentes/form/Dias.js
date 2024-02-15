import React from "react";
import ButtonsDias from "./ButtonsDias";

const Dias = ({ esporte }) => {
  const semana = [
    { value: "Segunda", display: "Segunda" },
    { value: "Terca", display: "Terça" },
    { value: "Quarta", display: "Quarta" },
    { value: "Quinta", display: "Quinta" },
    { value: "Sexta", display: "Sexta" },
    { value: "Sabado", display: "Sábado" },
    { value: "Domingo", display: "Domingo" },
  ];
  return (
    <>
      {semana.map((dia, index) => {
        return (
          <ButtonsDias
            key={index}
            dia={dia}
            index={index}
            tipoQuadra={esporte}
          />
        );
      })}
    </>
  );
};

export default Dias;
