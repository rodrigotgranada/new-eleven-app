import { useContext, useEffect, useState } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";
import "../../../../styles/public/paginaQuadra.scss";
import Loading from "../../Loading/Loading";

const Quadra = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const {
    getDataOrderBy2: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();
  const [filteredQuadras, setFilteredQuadras] = useState();

  useEffect(() => {
    let quadra = { ...marcacao };
    quadra.step = 3;
    setMarcacao(quadra);

    getQuadras("quadras", "esportes", "asc", "numero", "asc");
  }, []);
  useEffect(() => {
    Object.keys(quadras).length > 0 && handleSearch(marcacao.esporte);
  }, [quadras]);

  // useEffect(() => {
  //   handleSearch(quadras);
  // }, [quadras]);

  const handleSearch = (filter) => {
    const filtered = quadras.filter((child) => {
      if (child?.esportes?.includes(filter)) {
        return child;
      }
    });
    setFilteredQuadras(filtered);
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
      {carregaQuadras && <Loading type={`spin`} width={"30px"} />}
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
