import React, { useEffect, useState } from "react";
import useGetData from "../../../hooks/useGetData";

const CardQuadra = ({ quadra, setModalOpenEdit }) => {
  //   console.log(quadra);
  const [currentQuadra, setCurrentQuadra] = useState(null);
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
    <div
      onClick={() => {
        setModalOpenEdit(true);
      }}
    >
      <p>
        {quadra?.numero} - {quadra?.name} -{" "}
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
        src={quadra?.foto ? quadra?.foto : null}
        alt={quadra?.name}
        id={quadra?.id}
        height={"150rem"}
        width={"250rem"}
      />
    </div>
  );
};

export default CardQuadra;
