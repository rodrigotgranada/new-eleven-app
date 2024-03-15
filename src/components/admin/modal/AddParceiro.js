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
import moment from "moment";

const AddParceiro = ({ title, isOpen, setIsOpen }) => {
  const [parceiro, setparceiro] = useState({
    capa: false,
    nome: "",
    foto: "",
    link: "",
    ordem: 0,
    status: false,
    createdAt: "",
    modifiedAt: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    getData: getImagemPadrao,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  useEffect(() => {
    getImagemPadrao("fotoPadrao");
    return () => {};
  }, [isOpen]);
  const handleCLose = () => {
    setIsOpen(false);
  };

  const AddNovoParceiro = async (e) => {
    e.preventDefault();

    const numeroFormatado =
      parceiro.ordem.length === 1 ? `0${parceiro.ordem}` : parceiro.ordem;
    try {
      const docRef = collection(db, "parceiros");

      await addDoc(docRef, {
        capa: parceiro.capa ? parceiro.capa : false,
        nome: parceiro.nome,
        foto: parceiro.foto ? parceiro.foto : fotoPadrao[0]?.quadraPadrao,
        link: montaLink(parceiro.link),
        ordem: parceiro.ordem ? numeroFormatado : 0,
        status: parceiro.status ? parceiro.status : false,
        createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm"),
        modifiedAt: "",
      }).then((e) => {
        resetForm();
        // setIsOpen(false);
        toast.success("Parceiro adicionado com Sucesso!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const montaLink = (url) => {
    let final = "";
    if (url.includes("https://")) {
      final = url.replace("https://", "");
    } else if (url.includes("http://")) {
      final = url.replace("http://", "");
    } else {
      final = url;
    }
    return final;
  };

  const handleChange = (e) => {
    const { value, name, checked } = e.target;
    const item = { ...parceiro };
    item[`${name}`] = e.cancelable ? checked : value;
    setparceiro(item);
  };

  useEffect(() => {
    const minhaImg = { ...parceiro };
    minhaImg.foto = selectedImage;
    setparceiro(minhaImg);

    return () => {};
  }, [selectedImage]);

  useEffect(() => {
    console.log("parceiro", parceiro);

    return () => {};
  }, [parceiro]);

  const resetForm = () => {
    setparceiro({
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
          <Col lg="6">
            {/* <h4 className="mb-5">Adicionar Quadra {tiposQuadra.display}</h4> */}
            <Form onSubmit={AddNovoParceiro}>
              <FormGroup className="form__group">
                <Label>Nome</Label>
                <Input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={parceiro.nome || ""}
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
                  value={parceiro.ordem || ""}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <Label>Site</Label>
                <Input
                  type="text"
                  name="link"
                  placeholder="Site"
                  value={parceiro.link || ""}
                  onChange={(e) => handleChange(e)}
                  // required
                />
              </FormGroup>
              <FormGroup check inline>
                <Input
                  type="checkbox"
                  name="capa"
                  checked={parceiro?.capa}
                  onChange={(e) => handleChange(e)}
                />
                <Label check>Capa</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  type="checkbox"
                  name="status"
                  checked={parceiro?.status}
                  onChange={(e) => handleChange(e)}
                />
                <Label check>Ativo</Label>
              </FormGroup>
              <FileInputQuadra
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                numImage={1}
                rotulo={`Logo`}
                tamanho={true}
              />
              <button
                className="buy__btn btn btn-success"
                type="submit"
                //   onClick={addNovaQuadra}
              >
                Adicionar
              </button>
            </Form>
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

export default AddParceiro;
