import { useContext, useEffect } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";
import "../../../../styles/public/paginaHorarios.scss";
import ButtonsHorario from "./ButtonsHorario";

const Horario = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { getData, getDataOrderBy, data: horarios, loading } = useGetData();

  useEffect(() => {
    let horario = { ...marcacao };
    horario.step = 2;
    setMarcacao(horario);
  }, []);

  useEffect(() => {
    getDataOrderBy("horarios", "value");
  }, []);

  const handleChange = (e, value) => {
    const valor = value.id;
    let horario = { ...marcacao };
    horario.dataHorario = valor;
    horario.step = horario.step + 1;
    setMarcacao(horario);
  };

  return (
    <>
      {loading && <p>Carregando...</p>}
      <div className="paginaHorario">
        {horarios &&
          marcacao.esporte &&
          marcacao.dataDia &&
          horarios.map((horario, index) => {
            return (
              <ButtonsHorario
                key={index}
                dia={marcacao?.dataDia}
                esporte={marcacao?.esporte}
                horario={horario}
                handleChange={handleChange}
                chave={index}
              />
              // <button
              //   key={index}
              //   onClick={(e) => handleChange(e, horario)}
              //   value={horario}
              // >
              //   {`${horario.value}:00`}
              // </button>
            );
          })}
      </div>
    </>
  );
};

export default Horario;
