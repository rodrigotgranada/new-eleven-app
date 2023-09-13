import { useContext, useEffect, useState } from "react";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";

import Loading from "../../Loading/Loading";
import ButtonsQuadra from "./ButtonsQuadra";

const Quadra = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  // const {
  //   getDataOrderBy2: getQuadras,
  //   data: quadras,
  //   loading: carregaQuadras,
  // } = useGetData();
  const {
    getDataWhereOrderByLimit: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();
  const {
    getDataWhere3,
    data: disponibilidadeHorario,
    loading: loadingDisponibilidadeHorario,
  } = useGetData();

  const [filteredQuadras, setFilteredQuadras] = useState();

  useEffect(() => {
    let quadra = { ...marcacao };
    quadra.step = 3;
    setMarcacao(quadra);

    // getQuadras("quadras", "esportes", "asc", "numero", "asc");
    getQuadras(
      "quadras",
      "esportes",
      "array-contains",
      marcacao.esporte,
      "numero",
      "asc"
    );
    getDataWhere3(
      "agenda",
      "dataDia",
      "==",
      marcacao.dataDia,
      "tipoQuadra",
      "==",
      marcacao.tipoQuadra,
      "dataHorario",
      "==",
      marcacao.dataHorario
    );
  }, []);

  useEffect(() => {
    console.log("disponibilidadeHorario", disponibilidadeHorario);
  }, [disponibilidadeHorario]);

  // useEffect(() => {
  //   Object.keys(quadras).length > 0 && handleSearch(marcacao.esporte);
  // }, [quadras]);

  // useEffect(() => {
  //   handleSearch(quadras);
  // }, [quadras]);

  // const handleSearch = (filter) => {
  //   const filtered = quadras.filter((child) => {
  //     if (child?.esportes?.includes(filter)) {
  //       return child;
  //     }
  //   });
  //   setFilteredQuadras(filtered);
  // };

  const handleChange = (e, value) => {
    const valor = value.id;
    let quadraEscolhida = { ...marcacao };
    quadraEscolhida.quadra = valor;
    quadraEscolhida.step = quadraEscolhida.step + 1;
    setMarcacao(quadraEscolhida);
  };

  return (
    <>
      {carregaQuadras && loadingDisponibilidadeHorario && (
        <Loading type={`spin`} width={"30px"} />
      )}
      <div className="paginaQuadra">
        {Object.keys(quadras).length > 0 &&
          quadras.map((quadra, index) => {
            let teste = false;
            disponibilidadeHorario
              .filter((quadraOcupada) => quadraOcupada["quadra"] === quadra.id)
              .map((quadra2) => {
                if (quadra2) {
                  teste = true;
                }
              });
            console.log("teste", teste);
            return (
              <ButtonsQuadra
                key={index}
                quadra={quadra}
                handleChange={handleChange}
                chave={index}
                reservada={teste}
              />
            );
          })}
      </div>
    </>
  );
};

export default Quadra;
