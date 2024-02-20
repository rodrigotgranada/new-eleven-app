import React, { useEffect } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";

const ConfirmExcluirPermanente = ({ data, isOpen, setIsOpen }) => {
  const { getDataId: getName, data: name, loading: loadingName } = useGetData();
  const { deletePermanente } = useGetData();

  useEffect(() => {
    getName("users", data.nome);
    return () => {};
  }, []);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    // console.log("data", data.id);
    const deleted = await deletePermanente(data.id);
    // console.log("deleted", deleted);
  };

  if (loadingName) return <Loading type={`spin`} width={"30px"} />;
  if (name)
    return (
      <>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          isOpen={isOpen}
          className="responsive-modal"
        >
          <ModalHeader className="d-block justify-content-between w-100">
            <div className="d-flex justify-content-between w-100">
              {`Excluir Permanente de ${name?.displayName}`}
              <div>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handleCLose();
                  }}
                >
                  x
                </span>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <p>
              {" "}
              Deseja excluir permanente de{" "}
              {`${name?.displayName} ${name?.sobrenome} (${name.telefone}) `} ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                handleConfirm();
              }}
            >
              Excluir
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                handleCLose();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
};

export default ConfirmExcluirPermanente;
