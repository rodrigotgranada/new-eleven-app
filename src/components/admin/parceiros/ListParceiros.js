import React from "react";
import useGetData from "../../../hooks/useGetData";
import { useEffect } from "react";
import Loading from "../../public/Loading/Loading";
import { Card } from "reactstrap";
import "../../../styles/admin/parceiros.scss";
import CardParceiro from "./CardParceiro";

const ListParceiros = () => {
  const {
    getDataOrderBy: getParceiros,
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
              // <Card key={index} className={`card-parceiro`}>
              //   <p>
              //     {parceiro.ordem} - {parceiro.nome}
              //   </p>
              //   <img alt={parceiro.nome} src={parceiro.foto} />
              // </Card>
            );
          })}
        </>
      )}
    </>
  );
};

export default ListParceiros;
