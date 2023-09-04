import { useContext, useEffect, useState } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";
import "../../../../styles/public/paginaQuadra.scss";

const Quadra = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { getData, data: quadras, loading } = useGetData();
  const [filteredQuadras, setFilteredQuadras] = useState();

  useEffect(() => {
    let quadra = { ...marcacao };
    quadra.step = 3;
    setMarcacao(quadra);

    getData("quadras");
  }, []);
  useEffect(() => {
    Object.keys(quadras).length > 0 && setFilteredQuadras(quadras);
  }, [quadras]);

  useEffect(() => {
    handleSearch(quadras);
  }, [quadras]);

  const handleSearch = (data) => {
    const result = data
      .map((item) => ({
        ...item,
        esportes: item.esportes.filter((child) => {
          return child.id.includes(marcacao.esporte);
        }),
      }))
      .filter((item) => item.esportes.length > 0);
    setFilteredQuadras(result);
  };

  const handleChange = (e, value) => {
    const valor = value.id;
    let quadraEscolhida = { ...marcacao };
    quadraEscolhida.quadra = valor;
    quadraEscolhida.step = quadraEscolhida.step + 1;
    setMarcacao(quadraEscolhida);
  };

  return (
    <>
      {loading && <p>Carregando...</p>}
      <div className="paginaQuadra">
        {filteredQuadras?.length > 0 &&
          filteredQuadras.map((quadra, index) => {
            return (
              <div
                key={index}
                className="paginaQuadraItem"
                onClick={(e) => handleChange(e, quadra)}
                value={quadra}
              >
                <p>{quadra?.name}</p>
                <img src={quadra?.foto} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Quadra;
