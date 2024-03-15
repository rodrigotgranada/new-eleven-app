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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";
import useGetData from "../../../hooks/useGetData";

const EditChurrasqueira = ({ title, isOpen, setIsOpen, churrasqueiraX }) => {
  const [churrasqueira, setChurrasqueira] = useState(churrasqueiraX);
  const [selectedImage, setSelectedImage] = useState(churrasqueiraX?.foto);
  const [modalDelete, setModalDelete] = useState(false);

  const {
    getData: getImagemPadrao,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  useEffect(() => {
    // getParceiros("parceiros");
    getImagemPadrao("fotoPadrao");
    return () => {};
  }, [isOpen]);

  useEffect(() => {
    if (!churrasqueira.foto) {
      setSelectedImage(fotoPadrao[0]?.quadraPadrao);
    }

    return () => {};
  }, [fotoPadrao]);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const EditarChurras = async (e) => {
    e.preventDefault();
    const numeroFormatado =
      churrasqueira.numero.length === 1
        ? `0${churrasqueira.numero}`
        : churrasqueira.numero;
    try {
      const docRef = doc(db, "churrasqueiras", churrasqueira?.id);
      await updateDoc(docRef, {
        numero: churrasqueira.numero ? numeroFormatado : 0,
        nome: churrasqueira.nome,
        foto: churrasqueira.foto
          ? churrasqueira.foto
          : fotoPadrao[0]?.quadraPadrao,
      }).then((e) => {
        toast.success("Churrasqueira editada com Sucesso!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const handleChange = (e) => {
    const { value, name, checked } = e.target;
    const item = { ...churrasqueira };
    item[`${name}`] = e.cancelable ? checked : value;
    setChurrasqueira(item);
  };

  useEffect(() => {
    const minhaImg = { ...churrasqueira };
    minhaImg.foto = selectedImage;
    setChurrasqueira(minhaImg);

    return () => {};
  }, [selectedImage]);

  useEffect(() => {
    console.log("churrasqueira", churrasqueira);

    return () => {};
  }, [churrasqueira]);

  const resetForm = () => {
    setChurrasqueira({
      capa: false,
      nome: "",
      foto: "",
      link: "",
      ordem: 0,
      status: false,
      createdAt: "",
      modifiedAt: "",
    });
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
          <Col lg="12">
            {/* <h4 className="mb-5">Adicionar Quadra {tiposQuadra.display}</h4> */}
            <Form onSubmit={EditarChurras}>
              <FormGroup className="form__group">
                <Label>Nome</Label>
                <Input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={churrasqueira.nome || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <Label>Ordem</Label>
                <Input
                  type="number"
                  placeholder="Número"
                  name="ordem"
                  value={churrasqueira.numero || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormGroup>
              <FileInputQuadra
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                numImage={1}
                rotulo={`Logo`}
                tamanho={true}
              />
              <button
                className="buy__btn btn btn-primary"
                type="submit"
                //   onClick={addNovaQuadra}
              >
                Salvar
              </button>
            </Form>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        {/* {modalDelete && (
          <DeleteParceiro
            isOpen={modalDelete}
            setIsOpen={setModalDelete}
            oldIsOpen={isOpen}
            oldSetIsOpen={setIsOpen}
            parceiro={parceiro}
          />
        )}
        <Button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            setModalDelete(!modalDelete);
          }}
        >
          Excluir
        </Button> */}
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
export default EditChurrasqueira;
