import { doc, updateDoc } from "firebase/firestore";
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
import DeleteQuadra from "./DeleteQuadra";

const EditQuadra = ({ isOpen, setIsOpen, editarQuadra, ...props }) => {
  const [estaQuadra, setEstaQuadra] = useState();
  const [novaQuadra, setNovaQuadra] = useState();
  const [numQuadra, setNumQuadra] = useState();
  const [tipoQuadra, setTipoQuadra] = useState();
  const [modalidade, setModalidade] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [modalDelete, setModalDelete] = useState(false);

  const {
    getData: getImagemPadrao,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    } else {
      if (editarQuadra) {
        setEstaQuadra(editarQuadra);
        getImagemPadrao("fotoPadrao");
      }
    }
  }, [isOpen]);

  const {
    getDataId: getItemId,
    data: quadra,
    loading: carregaQuadra,
  } = useGetData();

  const {
    getDataWhere: getModalidades,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  const {
    getDataWhereId: getMinhasModalidades,
    data: minhasModalidades,
    loading: carregaMinhasModalidades,
  } = useGetData();

  useEffect(() => {
    if (estaQuadra && Object.keys(estaQuadra).length > 0) {
      console.log(estaQuadra);
      getModalidades("modalidades", "type", "==", estaQuadra?.type);
      getMinhasModalidades("modalidades", "in", estaQuadra?.esportes);
      setNovaQuadra(estaQuadra?.name);
      setNumQuadra(estaQuadra?.numero);
      setModalidade(estaQuadra?.esportes);
      setTipoQuadra(estaQuadra?.type);
      setSelectedImage(estaQuadra?.foto);
    }
  }, [estaQuadra]);

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

  const resetForm = () => {
    setNovaQuadra("");
    setNumQuadra("");
    setModalidade("");
    setTipoQuadra("");
    setSelectedImage("");
    setEstaQuadra("");
  };
  const handleCLose = () => {
    resetForm();
    setIsOpen(false);
  };

  const EditarQuadra = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "quadras", estaQuadra?.id);
      await updateDoc(docRef, {
        name: novaQuadra,
        numero: numQuadra,
        type: tipoQuadra,
        foto: selectedImage ? selectedImage : fotoPadrao[0]?.quadraPadrao,
        esportes: modalidade,
      }).then((e) => {
        toast.success("Quadra editada com Sucesso!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const deleteQuadra = <DeleteQuadra quadra={quadra} />;

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={isOpen}
      className="responsive-modal"
    >
      {Object.keys(minhasModalidades).length > 0 &&
        Object.keys(estaQuadra).length > 0 && (
          <>
            <ModalHeader className="d-block justify-content-between w-100">
              <div className="d-flex justify-content-between w-100">
                Editar Quadra {estaQuadra?.name}
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
                <Col lg="12">
                  <Form onSubmit={EditarQuadra}>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="form__group">
                          <Label>Nome</Label>
                          <Input
                            type="text"
                            placeholder="Nome"
                            defaultValue={estaQuadra?.name}
                            onChange={(e) => setNovaQuadra(e.target.value)}
                            required
                          />
                        </FormGroup>
                        <FormGroup className="form__group">
                          <Label>Número</Label>
                          <Input
                            type="text"
                            placeholder="Número"
                            defaultValue={estaQuadra?.numero}
                            onChange={(e) => setNumQuadra(e.target.value)}
                            required
                          />
                        </FormGroup>
                        <FormGroup className="form__group">
                          <Label>Esportes</Label>
                          <Select
                            isMulti={
                              estaQuadra?.type === "OoAxvibwL5Q38cpDSaYh"
                                ? false
                                : true
                            }
                            options={modalidades}
                            getOptionLabel={(option) => option.display}
                            getOptionValue={(option) => option.id}
                            defaultValue={minhasModalidades}
                            onChange={(e) => handleUpdateContext(e)}
                            isSearchable
                            required
                            closeMenuOnSelect={true}
                            placeholder="Selecione uma opção"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FileInputQuadra
                          selectedImage={selectedImage}
                          setSelectedImage={setSelectedImage}
                          numImage={1}
                          rotulo={`Capa Quadra`}
                          tamanho={true}
                        />
                      </Col>
                    </Row>
                    <button className="btn btn-success " type="submit">
                      Salvar
                    </button>
                  </Form>
                </Col>
              </Row>
            </ModalBody>

            <ModalFooter>
              <Button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  handleCLose();
                }}
              >
                Fechar
              </Button>

              {/* {modalDelete && (
                <DeleteQuadra
                  isOpen={modalDelete}
                  setIsOpen={setModalDelete}
                  quadra={estaQuadra}
                />
              )}
              <Button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  setModalDelete(true);
                }}
              >
                Delete
              </Button> */}
            </ModalFooter>
          </>
        )}
    </Modal>
  );
};

export default EditQuadra;
