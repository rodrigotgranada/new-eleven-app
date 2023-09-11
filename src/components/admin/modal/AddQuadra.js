import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
import { db } from "../../../firebase";
import useGetData from "../../../hooks/useGetData";
import FileInputQuadra from "../quadrasMenu/FileInputQuadra";

const AddQuadra = ({ title, isOpen, setIsOpen, tipoQuadra, ...props }) => {
  const {
    getData: getImagemPadrao,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  const {
    getDataWhere: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();
  const {
    getDataWhere: getModalidades,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  const {
    getDataId: getTiposQuadra,
    data: tiposQuadra,
    loading: carregaTiposQuadra,
  } = useGetData();

  useEffect(() => {
    if (isOpen) {
      getTiposQuadra("tiposQuadra", tipoQuadra);
      getQuadras("quadras", "type", "==", tipoQuadra);
      getModalidades("modalidades", "type", "==", tipoQuadra);
      getImagemPadrao("fotoPadrao");
    }
  }, [isOpen]);

  // useEffect(() => {
  //   console.log(quadras);
  // }, [quadras]);

  // useEffect(() => {
  //   console.log("tipoQuadra", tipoQuadra);
  //   console.log("modalidade", modalidades);
  // }, [modalidades]);

  const [novaQuadra, setNovaQuadra] = useState(null);
  const [numQuadra, setNumQuadra] = useState(null);
  const [modalidade, setModalidade] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const resetForm = () => {
    setNovaQuadra(null);
    setNumQuadra(null);
    setModalidade([]);
    setSelectedImage(null);
  };

  const addNovaQuadra = async (e) => {
    e.preventDefault();
    try {
      const docRef = collection(db, "quadras");
      await addDoc(docRef, {
        name: novaQuadra,
        numero: numQuadra,
        type: tiposQuadra ? tiposQuadra[0].id : "",
        foto: selectedImage ? selectedImage : fotoPadrao[0]?.quadraPadrao,
        esportes: modalidade,
      }).then((e) => {
        resetForm();
        toast.success("Quadra adicionada com Sucesso!");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateContext = (e) => {
    let body = [];
    if (e) {
      if (Array.isArray(e)) {
        e.map((item) => {
          body.push(item.id);
        });
      } else {
        body.push(e.id);
      }
    }
    setModalidade(body);
  };

  const handleCLose = () => {
    setIsOpen(false);
    resetForm();
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
      {console.log("carregaTiposQuadra", carregaTiposQuadra)}
      {carregaTiposQuadra && <p>Carregando...</p>}
      {console.log("tiposQuadra[0]", tiposQuadra)}
      {!carregaTiposQuadra && tiposQuadra && (
        <ModalBody>
          <Row>
            <Col lg="6">
              <h4 className="mb-5">Adicionar Quadra {tiposQuadra.display}</h4>
              <Form onSubmit={addNovaQuadra}>
                <FormGroup className="form__group">
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    placeholder="Nome"
                    value={novaQuadra || ""}
                    onChange={(e) => setNovaQuadra(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Número</Label>
                  <Input
                    type="text"
                    placeholder="Número"
                    value={numQuadra || ""}
                    onChange={(e) => setNumQuadra(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <Label>Esportes</Label>
                  <Select
                    isMulti={
                      tiposQuadra.id != "8m6tNatSE2W0gLwtNDmr" ? false : true
                    }
                    options={modalidades}
                    getOptionLabel={(option) => option.display}
                    getOptionValue={(option) => option.id}
                    value={modalidade}
                    // onChange={(item) => setEstado(item?.uf)}
                    onChange={(e, item) => {
                      return handleUpdateContext(e);
                    }}
                    isSearchable
                    required
                    closeMenuOnSelect={true}
                    placeholder="Selecione uma opção"
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
              <h4> Quadras {tiposQuadra.display}:</h4>
              <div className="w-100 messagesArea">
                {/* {console.log(`quadras ${tipoQuadra}`, quadras)} */}
                {quadras &&
                  quadras?.map((item, index) => (
                    <p className="messageItem" key={index}>
                      {item?.name} - {item?.numero}
                    </p>
                  ))}
              </div>
            </Col>
          </Row>
        </ModalBody>
      )}

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

export default AddQuadra;
