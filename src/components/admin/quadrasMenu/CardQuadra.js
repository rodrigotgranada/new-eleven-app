import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import useGetData from "../../../hooks/useGetData";
import "../../../styles/admin/cardQuadra.scss";
import EditQuadra from "../modal/EditQuadra";

const CardQuadra = ({ quadra }) => {
  const [ModalOpenEdit, setModalOpenEdit] = useState(false);
  const {
    getDataWhereId: getModalidade,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  useEffect(() => {
    getModalidade("modalidades", "in", quadra.esportes);
  }, [quadra]);

  return (
    <>
      {ModalOpenEdit && (
        <EditQuadra
          title="Edit Quadra"
          isOpen={ModalOpenEdit}
          setIsOpen={setModalOpenEdit}
          hasFooter={true}
          editarQuadra={quadra}
        />
      )}

      <Card
        className="card-main"
        onClick={() => {
          setModalOpenEdit(true);
        }}
      >
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
        />
      </Card>
    </>
  );
};

export default CardQuadra;
