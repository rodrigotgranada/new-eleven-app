import { useContext, useEffect } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";
import "../../../../styles/public/paginaModalidade.scss";
import Loading from "../../Loading/Loading";
import CardModalidade from "./CardModalidade";

const Modalidade = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { getData, data: modalidades, loading } = useGetData();

  useEffect(() => {
    let modadelidade = { ...marcacao };
    modadelidade.step = 1;
    setMarcacao(modadelidade);
  }, []);

  useEffect(() => {
    getData("modalidades");
  }, []);

  const handleChange = (value) => {
    const valor = value.id;
    const tipoQuadra = value.type;
    let modadelidade = { ...marcacao };
    modadelidade.esporte = valor;
    modadelidade.tipoQuadra = tipoQuadra;
    modadelidade.step = modadelidade.step + 1;
    setMarcacao(modadelidade);
  };

  return (
    <>
      {loading && <Loading type={`spin`} width={"30px"} />}
      <div className="paginaModalidade">
        {modalidades &&
          modalidades.map((modalidade, index) => {
            return (
              <CardModalidade
                key={index}
                modalidade={modalidade}
                handleChange={handleChange}
              />
              // <button
              //   key={index}
              //   onClick={(e) => handleChange(e, modalidade)}
              //   value={modalidade}
              // >
              //   {modalidade.display}
              // </button>
            );
          })}
      </div>
    </>
  );
};

export default Modalidade;
