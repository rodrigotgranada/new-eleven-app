import React, { useContext, useState } from "react";
import ChurrasqueiraContext from "../../../contexts/ChurrasqueiraContext";
import AddChurrasqueira from "../modal/AddChurrasqueira";
import { Col } from "reactstrap";
import ListChurrasqueiras from "./ListChurrasqueiras";

const Content = () => {
  const { churrasqueiraDate, setChurrasqueiraDate } =
    useContext(ChurrasqueiraContext);
  const [ModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Col lg="12">
        <section className="menu-churras">
          {ModalOpen && (
            <AddChurrasqueira
              title={`Adicionar churrasqueira`}
              isOpen={ModalOpen}
              setIsOpen={setModalOpen}
              // tipoQuadra={id}
            />
          )}
          <button
            className="btn btn-warning"
            onClick={(e) => setModalOpen(true)}
          >
            Adicionar Churrasqueira
          </button>
        </section>
      </Col>
      <Col lg="12">
        <section className="admin__menu p-0">
          <ListChurrasqueiras />
        </section>
      </Col>
    </>
  );
};

export default Content;
