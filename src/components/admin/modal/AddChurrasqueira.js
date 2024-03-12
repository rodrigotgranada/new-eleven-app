import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import FileInputQuadra from "../quadrasMenu/FileInputQuadra";
import useGetData from "../../../hooks/useGetData";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const AddChurrasqueira = ({ title, isOpen, setIsOpen }) => {
  const [nomeChurras, setNomeChurras] = useState(null);
  const [numChurras, setNumChurras] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    getData: getChurrasqueiras,
    data: churrasqueiras,
    loading: carregaChurrasqueiras,
  } = useGetData();

  const {
    getData: getImagemPadrao,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  useEffect(() => {
    getChurrasqueiras("churrasqueiras");
    getImagemPadrao("fotoPadrao");
    return () => {};
  }, [isOpen]);

  // useEffect(() => {
  //   console.log(churrasqueiras);
  //   console.log(fotoPadrao);
  // }, [churrasqueiras, fotoPadrao]);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const AddNovaChurrasqueira = async (e) => {
    e.preventDefault();

    const numeroFormatado =
      numChurras.length === 1 ? `0${numChurras}` : numChurras;
    try {
      const docRef = collection(db, "churrasqueiras");

      await addDoc(docRef, {
        nome: nomeChurras,
        numero: numeroFormatado,
        foto: selectedImage ? selectedImage : fotoPadrao[0]?.quadraPadrao,
      }).then((e) => {
        resetForm();
        toast.success("Churrasqueira adicionada com Sucesso!");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setNomeChurras(null);
    setNumChurras(null);
    setSelectedImage(null);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
      className="responsive-modal"
    >
      <ModalHeader className="d-block justify-content-between w-100">
        <div className="d-flex justify-content-between w-100">
          {title}
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
        <Row>
          <Col lg="6">
            {/* <h4 className="mb-5">Adicionar Quadra {tiposQuadra.display}</h4> */}
            <Form onSubmit={AddNovaChurrasqueira}>
              <FormGroup className="form__group">
                <Label>Nome</Label>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={nomeChurras || ""}
                  onChange={(e) => setNomeChurras(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <Label>Número</Label>
                <Input
                  type="number"
                  placeholder="Número"
                  value={numChurras || ""}
                  onChange={(e) => setNumChurras(e.target.value)}
                  required
                />
              </FormGroup>
              <FileInputQuadra
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                numImage={1}
                rotulo={`Capa Quadra`}
                tamanho={true}
              />
              <button
                className="buy__btn btn "
                type="submit"
                //   onClick={addNovaQuadra}
              >
                Adicionar
              </button>
            </Form>
          </Col>
          <Col lg="6">
            <h4> Churrasqueiras:</h4>
            <div className="w-100 messagesArea">
              {churrasqueiras &&
                churrasqueiras.length > 0 &&
                churrasqueiras?.map((item, index) => (
                  <p className="messageItem" key={index}>
                    {item?.nome} - {item?.numero}
                  </p>
                ))}
            </div>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button
          type="button"
          onClick={() => {
            handleCLose();
          }}
        >
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddChurrasqueira;
