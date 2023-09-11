import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import useGetData from "../../../hooks/useGetData";
import "../../../styles/admin/cardQuadra.scss";
import EditQuadra from "../modal/EditQuadra";

const CardQuadra = ({ quadra }) => {
  //   console.log(quadra);
  const [currentQuadra, setCurrentQuadra] = useState(null);
  const [ModalOpenEdit, setModalOpenEdit] = useState(false);
  const {
    getDataWhereId: getModalidade,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  useEffect(() => {
    // console.log(quadra.esportes);
    getModalidade("modalidades", "in", quadra.esportes);
  }, [quadra]);

  useEffect(() => {
    console.log("modalidades", modalidades);
  }, [modalidades]);

  return (
    <>
      {ModalOpenEdit && (
        <EditQuadra
          title="Edit Quadra"
          isOpen={ModalOpenEdit}
          setIsOpen={setModalOpenEdit}
          hasFooter={true}
          editarQuadra={quadra}
          // id={props.quadra?.id}
        />
      )}

      <Card
        className="card-main"
        onClick={() => {
          setModalOpenEdit(true);
        }}
      >
        {/* <div
        onClick={() => {
          setModalOpenEdit(true);
        }}
      > */}
        <p className="card-text-name">
          {quadra?.numero} - {quadra?.name}{" "}
        </p>
        <p className="card-text-esportes">
          {modalidades.map((esporte, index) => {
            return (
              <span key={index}>
                {esporte.display}
                {index + 1 == modalidades.length ? "" : " / "}
              </span>
            );
          })}
        </p>
        <img
          className="card-img"
          src={quadra?.foto ? quadra?.foto : null}
          alt={quadra?.name}
          id={quadra?.id}
          // height={"150rem"}
          // width={"250rem"}
        />
        {/* </div> */}
      </Card>
    </>
  );
};

export default CardQuadra;
