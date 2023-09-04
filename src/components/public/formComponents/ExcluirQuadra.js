import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteQuadra from "../../admin/modal/DeleteQuadra";

const ExcluirQuadra = (props) => {
  const [ModalOpenDelete, setModalOpenDelete] = useState(false);
  return (
    <>
      <DeleteQuadra
        title="Edit Quadra"
        isOpen={ModalOpenDelete}
        setIsOpen={setModalOpenDelete}
        quadra={props.quadra}
        id={props.id}
        closePrevious={props.handleClose}
      />
      <Button
        className="btn btn-danger"
        type="button"
        onClick={() => {
          setModalOpenDelete(true);
        }}
      >
        Excluir
      </Button>
    </>
  );
};

export default ExcluirQuadra;
