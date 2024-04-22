import React from "react";
import { useState } from "react";
import { Col } from "reactstrap";
import AddParceiro from "../modal/AddParceiro";
import ListParceiros from "./ListParceiros";
import "../../../styles/admin/parceiros.scss";

const ContentParceiros = () => {
  const [ModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Col lg="12">
        <section className="menu-parceiros">
          {ModalOpen && (
            <AddParceiro
              title={`Adicionar Evento`}
              isOpen={ModalOpen}
              setIsOpen={setModalOpen}
              // tipoQuadra={id}
            />
          )}
          <button
            className="btn btn-warning"
            onClick={(e) => setModalOpen(true)}
          >
            Adicionar Evento
          </button>
        </section>
        <Col lg="12">
          <section className="section-parceiros">
            <ListParceiros />
          </section>
        </Col>
      </Col>
    </>
  );
};

export default ContentParceiros;
