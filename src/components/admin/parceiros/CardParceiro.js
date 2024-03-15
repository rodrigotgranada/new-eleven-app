import React, { useState } from "react";
import { Card } from "reactstrap";
import EditParceiro from "../modal/EditParceiro";

const CardParceiro = ({ parceiro, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <EditParceiro
          title="Editar Parceiro"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          parceiroX={parceiro}
        />
      )}

      <Card
        key={index}
        className={`card-parceiro`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          {parceiro.ordem} - {parceiro.nome}
        </p>
        <img alt={parceiro.nome} src={parceiro.foto} />
      </Card>
    </>
  );
};

export default CardParceiro;
