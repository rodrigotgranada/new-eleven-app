import React, { forwardRef, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
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
import DeleteParceiro from "./DeleteParceiro";

const EditParceiro = ({ title, isOpen, setIsOpen, parceiroX }) => {
  const [parceiro, setparceiro] = useState(parceiroX);
  const [selectedImage, setSelectedImage] = useState(parceiroX?.foto);
  const [selectedDate, setSelectedDate] = useState(new Date(moment(parceiroX?.dataInicio)));
  const [modalDelete, setModalDelete] = useState(false);

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

  const EditarQuadra = async (e) => {
    e.preventDefault();
    const numeroFormatado =
      parceiro.ordem.length === 1 ? `0${parceiro.ordem}` : parceiro.ordem;
    try {
      const docRef = doc(db, "parceiros", parceiro?.id);
      await updateDoc(docRef, {
        capa: parceiro.capa ? parceiro.capa : false,
        nome: parceiro.nome,
        foto: parceiro.foto ? parceiro.foto : fotoPadrao[0]?.quadraPadrao,
        link: montaLink(parceiro.link),
        dataInicio: parceiro.dataInicio,
        ordem: parceiro.ordem ? numeroFormatado : 0,
        status: parceiro.status ? parceiro.status : false,
        createdAt: parceiro.createdAt,
        modifiedAt: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      }).then((e) => {
        toast.success("Parceiro editado com Sucesso!", {
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
    const minhaData = { ...parceiro };
    minhaData.dataInicio = moment(selectedDate).format("YYYY-MM-DD");
    setparceiro(minhaData);

    return () => {};
  }, [selectedDate]);


  const resetForm = () => {
    setparceiro({
      capa: false,
      nome: "",
      foto: "",
      link: "",
      dataInicio: "",
      ordem: 0,
      status: false,
      createdAt: "",
      modifiedAt: "",
    });
    setSelectedImage(null);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
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
            <Form onSubmit={EditarQuadra}>
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
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                customInput={<ExampleCustomInput />}
                dateFormat="dd/MM/yyyy"
                locale="ptBR"
                // inline
                showDisabledMonthNavigation
                />
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
        {modalDelete && (
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
        </Button>
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

export default EditParceiro;
