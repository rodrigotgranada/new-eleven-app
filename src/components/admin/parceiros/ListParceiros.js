import React from "react";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import Loading from "../../public/Loading/Loading";
import "../../../styles/admin/parceiros.scss";
import CardParceiro from "./CardParceiro";

const ListParceiros = () => {
  const {
    getDataOrderByTeste: getParceiros,
    data: parceiros,
    loading: carregaParceiros,
  } = useGetData();

  useEffect(() => {
    getParceiros("parceiros", "ordem");
    return () => {};
  }, []);
  return (
    <>
      {carregaParceiros && <Loading type={`spin`} width={"30px"} />}
      {parceiros && parceiros.length == 0 && <p>Nenhum parceiro cadastrado</p>}
      {parceiros && parceiros.length > 0 && (
        <>
          {parceiros.map((parceiro, index) => {
            return (
              <CardParceiro parceiro={parceiro} index={index} key={index} />
            );
          })}
        </>
      )}
    </>
  );
};

export default ListParceiros;
