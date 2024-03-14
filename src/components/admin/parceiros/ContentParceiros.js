import React from "react";
import { useState } from "react";
import { Col } from "reactstrap";
import AddParceiro from "../modal/AddParceiro";
import ListParceiros from "./ListParceiros";

const ContentParceiros = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Col lg="12">
        <section className="menu-parceiros">
          {ModalOpen && (
            <AddParceiro
              title={`Adicionar Parceiro`}
              isOpen={ModalOpen}
              setIsOpen={setModalOpen}
              // tipoQuadra={id}
            />
          )}
          <button
            className="btn btn-warning"
            onClick={(e) => setModalOpen(true)}
          >
            Adicionar Parceiro
          </button>
        </section>
        <Col lg="12">
          <section className="admin__menu p-0">
            <ListParceiros />
          </section>
        </Col>
      </Col>
    </>
  );
};

export default ContentParceiros;
